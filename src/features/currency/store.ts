
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrencyState, ConversionRequest, ConversionResult } from './types';

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      manualRate: 36.5, // Default rate USD to VEF
      apiRate: null,
      lastUpdate: null,
      apiConfig: {
        key: '',
        provider: 'manual',
        updateInterval: 3600000, // 1 hour in milliseconds
      },
      history: [],
    }),
    {
      name: 'currency-store',
    }
  )
);

export const convertCurrency = (request: ConversionRequest): ConversionResult => {
  const { amount, from, to, useApi = false } = request;
  const { manualRate, apiRate } = useCurrencyStore.getState();
  
  // Determine which rate to use
  const rate = useApi && apiRate ? apiRate : manualRate;
  
  let output: number;
  
  if (from === to) {
    output = amount;
  } else if (from === 'USD' && to === 'VEF') {
    output = amount * rate;
  } else {
    output = amount / rate;
  }
  
  // Update history with the correctly typed source
  useCurrencyStore.setState((state) => ({
    history: [
      ...state.history,
      {
        date: new Date(),
        rate,
        source: (useApi && apiRate ? 'api' : 'manual') as 'api' | 'manual',
      },
    ].slice(-50), // Keep only last 50 entries
  }));
  
  return {
    input: amount,
    output,
    rate,
    timestamp: new Date(),
    source: useApi && apiRate ? 'api' : 'manual',
    from,
    to,
  };
};

export const updateManualRate = (rate: number) => {
  useCurrencyStore.setState({
    manualRate: rate,
    lastUpdate: new Date(),
  });
};

export const updateApiConfig = (config: Partial<CurrencyState['apiConfig']>) => {
  useCurrencyStore.setState((state) => ({
    apiConfig: {
      ...state.apiConfig,
      ...config,
    },
  }));
};
