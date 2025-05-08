
import { ConversionRate, Currency, CurrencyCode } from './types';

// Mock data for currencies
const mockCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', active: true },
  { code: 'EUR', name: 'Euro', symbol: '€', active: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', active: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', active: true },
  { code: 'VEF', name: 'Venezuelan Bolívar', symbol: 'Bs.', active: true }
];

// Mock rates between currencies
const mockRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.92, GBP: 0.78, JPY: 149.8, VEF: 36.75 },
  EUR: { USD: 1.09, GBP: 0.85, JPY: 163.1, VEF: 39.95 },
  GBP: { USD: 1.28, EUR: 1.18, JPY: 192.1, VEF: 47.0 },
  JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0052, VEF: 0.25 },
  VEF: { USD: 0.027, EUR: 0.025, GBP: 0.021, JPY: 4.0 }
};

// API interface
export interface ApiConfig {
  provider: 'manual' | 'exchangerate' | 'openexchange';
  key: string;
  updateInterval: number;
}

// Fetch all available currencies
export async function fetchCurrencies(): Promise<Currency[]> {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockCurrencies), 500);
  });
}

// Fetch conversion rate between two currencies
export async function fetchConversionRate(from: CurrencyCode, to: CurrencyCode): Promise<number> {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!mockRates[from] || !mockRates[from][to]) {
        if (from === to) {
          resolve(1); // Same currency conversion rate is always 1
        } else {
          reject(new Error(`No conversion rate available for ${from} to ${to}`));
        }
      } else {
        resolve(mockRates[from][to]);
      }
    }, 500);
  });
}

// Fetch exchange rate from external API
export async function fetchExchangeRate(apiKey: string, provider: string): Promise<{
  success: boolean;
  rate?: number;
  error?: string;
}> {
  try {
    // This is a placeholder. In a real implementation, you would call an actual API
    // Example: return fetch(`https://api.${provider}.com/latest?base=USD&symbols=VEF&access_key=${apiKey}`)
    
    // For now, let's simulate an API response
    const mockResponse = {
      success: true,
      rate: 36.75,
    };
    
    return mockResponse;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return {
      success: false,
      error: 'Failed to fetch exchange rate',
    };
  }
}

// Setup auto update for exchange rates
export function setupAutoUpdate(config: {
  provider: string;
  key: string;
  updateInterval: number;
}): () => void {
  if (!config.key || config.provider === 'manual') {
    return () => {}; // No cleanup needed
  }
  
  // Set up interval to update the exchange rate
  const intervalId = setInterval(
    () => fetchExchangeRate(config.key, config.provider),
    config.updateInterval
  );
  
  // Return cleanup function
  return () => clearInterval(intervalId);
}
