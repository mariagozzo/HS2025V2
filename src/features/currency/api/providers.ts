
import { ExchangeRateProvider } from '../types';

// Response type for exchange rate API calls
export interface ExchangeRateResponse {
  success: boolean;
  rate?: number;
  error?: string;
  timestamp?: number;
  provider: string;
}

/**
 * Fetches rates from the Banco Central de Venezuela API
 */
export async function fetchBCVRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  // Implementation for BCV API
  // This is a mock implementation as in the original code
  return {
    success: true,
    rate: 90.50,
    timestamp: Date.now(),
    provider: 'bancentralve'
  };
}

/**
 * Fetches rates from the ApiLayer service
 */
export async function fetchApiLayerRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  if (!provider.apiKey) {
    return {
      success: false,
      error: 'API Key requerida',
      provider: 'apilayer'
    };
  }

  // Implementation for ApiLayer API
  // This is a mock implementation as in the original code
  return {
    success: true,
    rate: 90.50,
    timestamp: Date.now(),
    provider: 'apilayer'
  };
}

/**
 * Fetches exchange rates from different providers based on configuration
 */
export async function fetchExchangeRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  if (!provider.isActive) {
    return {
      success: false,
      error: 'Proveedor inactivo',
      provider: provider.name
    };
  }

  try {
    switch (provider.name) {
      case 'bancentralve':
        return await fetchBCVRate(provider);
      case 'apilayer':
        return await fetchApiLayerRate(provider);
      case 'manual':
        return {
          success: true,
          rate: 91.50, // Using the value from BASE_RATES.VES
          timestamp: Date.now(),
          provider: 'manual'
        };
      default:
        return {
          success: false,
          error: 'Proveedor no soportado',
          provider: provider.name
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      provider: provider.name
    };
  }
}
