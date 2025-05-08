
import { create } from 'zustand';
import { CurrencyState, CurrencyCode, ConversionResult } from './types';
import { fetchCurrencies, fetchConversionRate } from './api';

const initialState: CurrencyState = {
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
  history: []
};

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
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
      return;
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

  reset: () => set(initialState)
}));
