
import { create } from 'zustand';
import { CurrencyState, CurrencyCode, ConversionResult } from './types';
import { fetchCurrencies, fetchConversionRate, ApiConfig } from './api';

interface ExtendedCurrencyState extends CurrencyState {
  // API configuration
  apiConfig: ApiConfig;
  manualRate: number;
  apiRate: number | null;
  lastUpdate: Date | null;
  
  // Action creators
  fetchCurrencies: () => Promise<void>;
  setBaseCurrency: (code: CurrencyCode) => void;
  setSelectedCurrencies: (from: CurrencyCode, to: CurrencyCode) => void;
  setAmount: (amount: number) => void;
  convertCurrency: () => Promise<ConversionResult | null>;
  reset: () => void;
  addToHistory: (rate: number, source: "manual" | "api") => void;
  updateManualRate: (rate: number) => void;
  updateApiConfig: (config: Partial<ApiConfig>) => void;
}

const initialState: ExtendedCurrencyState = {
  currencies: [],
  baseCurrency: null,
  conversionRates: [],
  selectedFromCurrency: null,
  selectedToCurrency: null,
  amount: 0,
  convertedAmount: null,
  conversionResult: null,
  isLoading: false,
  error: null,
  history: [],
  
  // New properties
  apiConfig: {
    provider: 'manual',
    key: '',
    updateInterval: 60000 // 1 minute
  },
  manualRate: 36.75,
  apiRate: null,
  lastUpdate: null,
  
  // Action creators (will be implemented by create)
  fetchCurrencies: async () => {},
  setBaseCurrency: () => {},
  setSelectedCurrencies: () => {},
  setAmount: () => {},
  convertCurrency: async () => null,
  reset: () => {},
  addToHistory: () => {},
  updateManualRate: () => {},
  updateApiConfig: () => {},
};

export const useCurrencyStore = create<ExtendedCurrencyState>((set, get) => ({
  ...initialState,

  // Actions
  fetchCurrencies: async () => {
    set({ isLoading: true, error: null });
    try {
      const currencies = await fetchCurrencies();
      set({ currencies, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setBaseCurrency: (code: CurrencyCode) => set({ baseCurrency: code }),

  setSelectedCurrencies: (from: CurrencyCode, to: CurrencyCode) => {
    set({ selectedFromCurrency: from, selectedToCurrency: to });
  },

  setAmount: (amount: number) => set({ amount }),

  addToHistory: (rate: number, source: "manual" | "api") => {
    set((state) => ({
      history: [...state.history, { date: new Date(), rate, source }]
    }));
  },

  convertCurrency: async () => {
    const { amount, selectedFromCurrency, selectedToCurrency } = get();

    if (!selectedFromCurrency || !selectedToCurrency || amount <= 0) {
      set({ error: 'Invalid conversion parameters' });
      return null;
    }

    set({ isLoading: true, error: null });

    try {
      const rate = await fetchConversionRate(selectedFromCurrency, selectedToCurrency);
      const convertedAmount = amount * rate;
      
      const result: ConversionResult = {
        amount,
        convertedAmount,
        rate,
        from: selectedFromCurrency,
        to: selectedToCurrency
      };

      set({
        convertedAmount,
        conversionResult: result,
        isLoading: false
      });

      // Add to history
      get().addToHistory(rate, "api");

      return result;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return null;
    }
  },

  // New actions
  updateManualRate: (rate: number) => {
    set({ 
      manualRate: rate,
      lastUpdate: new Date()
    });
    // Add to history
    get().addToHistory(rate, "manual");
  },

  updateApiConfig: (config: Partial<ApiConfig>) => {
    set((state) => ({
      apiConfig: { ...state.apiConfig, ...config }
    }));
  },

  reset: () => set(initialState)
}));

// Export helper functions to use in components
export const updateManualRate = (rate: number) => useCurrencyStore.getState().updateManualRate(rate);
export const updateApiConfig = (config: Partial<ApiConfig>) => useCurrencyStore.getState().updateApiConfig(config);
