
import { useCurrencyStore } from './store';

interface ApiResponse {
  success: boolean;
  rate?: number;
  error?: string;
}

export async function fetchExchangeRate(apiKey: string, provider: string): Promise<ApiResponse> {
  try {
    // This is a placeholder. In a real implementation, you would call an actual API
    // Example: return fetch(`https://api.${provider}.com/latest?base=USD&symbols=VEF&access_key=${apiKey}`)
    
    // For now, let's simulate an API response
    const mockResponse = {
      success: true,
      rate: 36.75,
    };
    
    // Update the store with the new rate
    if (mockResponse.success && mockResponse.rate) {
      useCurrencyStore.setState({
        apiRate: mockResponse.rate,
        lastUpdate: new Date(),
      });
    }
    
    return mockResponse;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return {
      success: false,
      error: 'Failed to fetch exchange rate',
    };
  }
}

export function setupAutoUpdate(): () => void {
  const { apiConfig } = useCurrencyStore.getState();
  
  if (!apiConfig.key || apiConfig.provider === 'manual') {
    return () => {}; // No cleanup needed
  }
  
  // Set up interval to update the exchange rate
  const intervalId = setInterval(
    () => fetchExchangeRate(apiConfig.key, apiConfig.provider),
    apiConfig.updateInterval
  );
  
  // Return cleanup function
  return () => clearInterval(intervalId);
}
