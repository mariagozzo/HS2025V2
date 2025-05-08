
import { create } from 'zustand';
import { 
  CurrencyState, 
  CurrencyCode, 
  ConversionResult, 
  Currency, 
  CURRENCY_CONSTANTS,
  CurrencyError,
  HistoryEntry,
  ExchangeRateProvider
} from './types';
import { 
  fetchCurrencies, 
  fetchConversionRate, 
  setupAutoUpdate,
  CurrencyApiConfig
} from './api';

interface ExtendedCurrencyState extends CurrencyState {
  // Configuración adicional
  provider: ExchangeRateProvider;
  manualRate: number;
  apiRate: number | null;
  apiConfig: CurrencyApiConfig; // Add apiConfig to match what ConfigPanel expects
  
  // Acciones
  fetchCurrencies: () => Promise<void>;
  setBaseCurrency: (code: CurrencyCode) => void;
  setSelectedCurrencies: (from: CurrencyCode, to: CurrencyCode) => void;
  setAmount: (amount: number) => void;
  convertCurrency: () => Promise<ConversionResult | null>;
  reset: () => void;
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'date'>) => void;
  updateManualRate: (rate: number) => void;
  updateProvider: (config: Partial<ExchangeRateProvider>) => void;
  updateApiConfig: (config: Partial<CurrencyApiConfig>) => void; // Add updateApiConfig action
  formatAmount: (amount: number, currency: CurrencyCode) => string;
}

const generateHistoryId = (): string => 
  'hst_' + Date.now().toString(36) + Math.random().toString(36).substring(2);

const initialState: Omit<ExtendedCurrencyState, 
  | 'fetchCurrencies' 
  | 'setBaseCurrency' 
  | 'setSelectedCurrencies' 
  | 'setAmount' 
  | 'convertCurrency' 
  | 'reset' 
  | 'addToHistory' 
  | 'updateManualRate' 
  | 'updateProvider'
  | 'updateApiConfig'
  | 'formatAmount'
> = {
  // Datos base
  currencies: [],
  baseCurrency: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
  conversionRates: [],
  selectedFromCurrency: null,
  selectedToCurrency: null,
  amount: 0,
  convertedAmount: null,
  conversionResult: null,
  isLoading: false,
  error: null,
  history: [],
  lastUpdate: null,
  
  // Configuración
  config: {
    defaultCurrency: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    updateInterval: CURRENCY_CONSTANTS.DEFAULT_UPDATE_INTERVAL,
    maxHistoryEntries: CURRENCY_CONSTANTS.MAX_HISTORY_ENTRIES,
    displayFormat: 'symbol',
    autoUpdate: true
  },
  
  // Proveedor de tasas
  provider: {
    name: 'manual',
    updateInterval: CURRENCY_CONSTANTS.DEFAULT_UPDATE_INTERVAL
  },
  manualRate: 91.50,
  apiRate: null,
  
  // API config
  apiConfig: {
    provider: 'manual',
    updateInterval: CURRENCY_CONSTANTS.DEFAULT_UPDATE_INTERVAL,
    baseCurrency: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    key: ''
  }
};

export const useCurrencyStore = create<ExtendedCurrencyState>((set, get) => {
  let cleanup: (() => void) | null = null;

  // Configurar actualización automática
  if (typeof window !== 'undefined') {
    cleanup = setupAutoUpdate({
      provider: initialState.apiConfig.provider,
      updateInterval: initialState.config.updateInterval,
      baseCurrency: initialState.apiConfig.baseCurrency,
      key: initialState.apiConfig.key
    });
  }

  const formatAmount = (amount: number, currencyCode: CurrencyCode): string => {
    const currency = get().currencies.find(c => c.code === currencyCode);
    if (!currency) return amount.toString();

    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currency.decimalPlaces ?? CURRENCY_CONSTANTS.DEFAULT_DECIMAL_PLACES
    }).format(amount);
  };

  return {
    ...initialState,
    formatAmount,

    fetchCurrencies: async () => {
      set({ isLoading: true, error: null });
      try {
        const currencies = await fetchCurrencies();
        set({ currencies, isLoading: false });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al cargar monedas';
        set({ 
          error: message, 
          isLoading: false 
        });
      }
    },

    setBaseCurrency: (code: CurrencyCode) => {
      set({ baseCurrency: code });
      const { provider } = get();
      if (provider.name !== 'manual') {
        get().updateProvider({ name: provider.name });
      }
    },

    setSelectedCurrencies: (from: CurrencyCode, to: CurrencyCode) => {
      if (from === to) {
        set({ error: 'Las monedas de origen y destino deben ser diferentes' });
        return;
      }
      
      set({ 
        selectedFromCurrency: from, 
        selectedToCurrency: to,
        convertedAmount: null,
        conversionResult: null,
        error: null
      });
    },

    setAmount: (amount: number) => {
      if (amount < CURRENCY_CONSTANTS.MIN_AMOUNT) {
        set({ error: 'El monto debe ser mayor o igual a 0' });
        return;
      }
      if (amount > CURRENCY_CONSTANTS.MAX_AMOUNT) {
        set({ error: 'El monto excede el límite permitido' });
        return;
      }
      set({ amount, error: null });
    },

    convertCurrency: async () => {
      const { 
        amount, 
        selectedFromCurrency, 
        selectedToCurrency,
        provider 
      } = get();

      if (!selectedFromCurrency || !selectedToCurrency || amount < 0) {
        throw new CurrencyError(
          'Parámetros de conversión inválidos',
          'INVALID_PARAMS',
          { amount, from: selectedFromCurrency, to: selectedToCurrency }
        );
      }

      set({ isLoading: true, error: null });

      try {
        const rate = await fetchConversionRate(selectedFromCurrency, selectedToCurrency);
        const convertedAmount = Number((amount * rate).toFixed(2));
        
        const result: ConversionResult = {
          amount,
          convertedAmount,
          rate,
          from: selectedFromCurrency,
          to: selectedToCurrency,
          timestamp: Date.now(),
          formattedAmount: get().formatAmount(amount, selectedFromCurrency),
          formattedConvertedAmount: get().formatAmount(convertedAmount, selectedToCurrency)
        };

        set({
          convertedAmount,
          conversionResult: result,
          isLoading: false,
          lastUpdate: new Date()
        });

        get().addToHistory({
          rate,
          from: selectedFromCurrency,
          to: selectedToCurrency,
          amount,
          convertedAmount,
          source: provider.name === 'manual' ? 'manual' : 'api',
          userId: 'mariagozzo' // Current user
        });

        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error en la conversión';
        set({ error: message, isLoading: false });
        return null;
      }
    },

    addToHistory: (entry: Omit<HistoryEntry, 'id' | 'date'>) => {
      const newEntry: HistoryEntry = {
        ...entry,
        id: generateHistoryId(),
        date: new Date()
      };

      set((state) => ({
        history: [
          ...state.history,
          newEntry
        ].slice(-state.config.maxHistoryEntries)
      }));
    },

    updateManualRate: (rate: number) => {
      if (rate <= 0) {
        throw new CurrencyError(
          'La tasa debe ser mayor que 0',
          'INVALID_RATE',
          { rate }
        );
      }

      set({ 
        manualRate: rate,
        lastUpdate: new Date(),
        error: null
      });

      const { selectedFromCurrency, selectedToCurrency, amount } = get();
      if (selectedFromCurrency && selectedToCurrency) {
        get().addToHistory({
          rate,
          from: selectedFromCurrency,
          to: selectedToCurrency,
          amount: amount || 0,
          convertedAmount: amount ? amount * rate : 0,
          source: 'manual',
          userId: 'mariagozzo'
        });
      }
    },

    updateProvider: (config: Partial<ExchangeRateProvider>) => {
      set((state) => ({
        provider: { ...state.provider, ...config },
        error: null
      }));

      if (cleanup) {
        cleanup();
      }
      
      const newConfig = { ...get().provider, ...config };
      cleanup = setupAutoUpdate({
        provider: 'manual',
        updateInterval: newConfig.updateInterval,
        baseCurrency: get().baseCurrency || CURRENCY_CONSTANTS.DEFAULT_CURRENCY
      });
    },
    
    updateApiConfig: (config: Partial<CurrencyApiConfig>) => {
      set((state) => ({
        apiConfig: { ...state.apiConfig, ...config },
        error: null
      }));
      
      if (cleanup) {
        cleanup();
      }
      
      const newConfig = { ...get().apiConfig, ...config };
      cleanup = setupAutoUpdate(newConfig);
      
      // Actualizar el último acceso
      set({ lastUpdate: new Date() });
    },

    reset: () => {
      if (cleanup) {
        cleanup();
      }

      set(initialState);

      cleanup = setupAutoUpdate({
        provider: initialState.apiConfig.provider,
        updateInterval: initialState.config.updateInterval,
        baseCurrency: initialState.apiConfig.baseCurrency,
        key: initialState.apiConfig.key
      });
    }
  };
});

// Exportar helpers
export const updateManualRate = (rate: number) => 
  useCurrencyStore.getState().updateManualRate(rate);

export const updateProvider = (config: Partial<ExchangeRateProvider>) => 
  useCurrencyStore.getState().updateProvider(config);

// Export the missing updateApiConfig helper function
export const updateApiConfig = (config: Partial<CurrencyApiConfig>) => 
  useCurrencyStore.getState().updateApiConfig(config);

// Cleanup en desmontaje
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useCurrencyStore.getState().reset();
  });
}
