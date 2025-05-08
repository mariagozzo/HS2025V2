
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  CurrencyState, 
  CurrencyCode, 
  ConversionResult, 
  Currency, 
  CURRENCY_CONSTANTS,
  CurrencyError,
  HistoryEntry,
  ExchangeRateProvider,
  CurrencyErrorCode,
  CurrencyEvent
} from './types';
import { 
  fetchCurrencies, 
  fetchConversionRate, 
  setupAutoUpdate 
} from './api';

// Selectores dedicados para mejor reutilización
const currencySelectors = {
  provider: (state: CurrencyState) => state.provider,
  currencies: (state: CurrencyState) => state.currencies,
  selectedCurrencies: (state: CurrencyState) => ({
    from: state.selectedFromCurrency,
    to: state.selectedToCurrency
  }),
  conversionState: (state: CurrencyState) => ({
    amount: state.amount,
    result: state.conversionResult,
    isLoading: state.isLoading,
    error: state.error
  }),
  config: (state: CurrencyState) => state.config,
  history: (state: CurrencyState) => state.history.slice(-state.config.maxHistoryEntries)
};

// Tipos para el store
interface ExtendedCurrencyState extends CurrencyState {
  // Acciones de configuración
  fetchCurrencies: () => Promise<void>;
  setBaseCurrency: (code: CurrencyCode) => void;
  setSelectedCurrencies: (from: CurrencyCode, to: CurrencyCode) => void;
  setAmount: (amount: number) => void;
  
  // Acciones de conversión
  convertCurrency: () => Promise<ConversionResult | null>;
  updateManualRate: (rate: number) => void;
  updateProvider: (config: Partial<ExchangeRateProvider>) => void;
  
  // Utilidades
  formatAmount: (amount: number, currency: CurrencyCode) => string;
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'date'>) => void;
  reset: () => void;
}

// Generador de IDs para el historial
const generateHistoryId = (): string => 
  `hst_${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

// Estado inicial
const initialState: Omit<ExtendedCurrencyState, 
  | 'fetchCurrencies' 
  | 'setBaseCurrency' 
  | 'setSelectedCurrencies' 
  | 'setAmount' 
  | 'convertCurrency' 
  | 'updateManualRate'
  | 'updateProvider'
  | 'formatAmount'
  | 'addToHistory'
  | 'reset'
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
  
  // Proveedor activo
  provider: {
    name: 'manual',
    updateInterval: CURRENCY_CONSTANTS.DEFAULT_UPDATE_INTERVAL,
    baseCurrency: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    isActive: true
  }
};

// Store principal
export const useCurrencyStore = create<ExtendedCurrencyState>()(
  persist(
    (set, get) => {
      let cleanup: (() => void) | null = null;

      // Configurar actualización automática
      if (typeof window !== 'undefined') {
        // Fix: Only setup auto-update if window is defined and after the store is initialized
        // We'll initialize this later in a useEffect hook
      }

      // Utilidad de formateo
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
            set({ error: message, isLoading: false });
          }
        },

        setBaseCurrency: (code: CurrencyCode) => {
          const { provider } = get();
          set({ 
            baseCurrency: code,
            provider: { ...provider, baseCurrency: code }
          });
          
          if (provider.name !== 'manual' && provider.isActive) {
            get().updateProvider({ baseCurrency: code });
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
            throw new CurrencyError(
              'El monto debe ser mayor o igual a 0',
              'INVALID_AMOUNT'
            );
          }
          if (amount > CURRENCY_CONSTANTS.MAX_AMOUNT) {
            throw new CurrencyError(
              'El monto excede el límite permitido',
              'INVALID_AMOUNT'
            );
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
              'CONVERSION_ERROR',
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
              formattedAmount: formatAmount(amount, selectedFromCurrency),
              formattedConvertedAmount: formatAmount(convertedAmount, selectedToCurrency),
              provider: provider.name
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
              source: provider.name,
              userId: 'mariagozzo'
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

          const { selectedFromCurrency, selectedToCurrency, amount } = get();
          
          set((state) => ({ 
            provider: {
              ...state.provider,
              name: 'manual',
              isActive: true
            },
            lastUpdate: new Date(),
            error: null
          }));

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
          if (cleanup) {
            cleanup();
          }

          set((state) => ({
            provider: { ...state.provider, ...config },
            error: null
          }));
          
          const newConfig = { ...get().provider, ...config };
          if (typeof window !== 'undefined') {
            cleanup = setupAutoUpdate(newConfig);
          }
        },

        reset: () => {
          if (cleanup) {
            cleanup();
          }

          set(initialState);

          if (typeof window !== 'undefined') {
            cleanup = setupAutoUpdate(initialState.provider);
          }
        }
      };
    },
    {
      name: 'currency-store',
      partialize: (state) => ({
        baseCurrency: state.baseCurrency,
        provider: state.provider,
        config: state.config,
        history: state.history.slice(-10)
      }),
      // Fix: Adding an onRehydrateStorage handler to safely setup auto-update after hydration
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          const cleanup = setupAutoUpdate(state.provider);
          // Save the cleanup function to be called later
          if (state.reset) {
            const originalReset = state.reset;
            state.reset = () => {
              cleanup();
              originalReset();
            };
          }
        }
      }
    }
  )
);

// Exportar selectores
export const {
  provider,
  currencies,
  selectedCurrencies,
  conversionState,
  config,
  history
} = currencySelectors;

// Helpers exportados
export const updateManualRate = (rate: number) => 
  useCurrencyStore.getState().updateManualRate(rate);

// Add the missing export here
export const updateProvider = (config: Partial<ExchangeRateProvider>) => 
  useCurrencyStore.getState().updateProvider(config);

// Export the utility function needed by ConfigPanel
export const updateApiConfig = (config: Partial<ExchangeRateProvider>) =>
  useCurrencyStore.getState().updateProvider(config);

// Fix: Move the cleanup listener setup to a function that's called after hydration
// instead of during store creation
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    const state = useCurrencyStore.getState();
    if (state) {
      state.reset();
    }
  });
}
