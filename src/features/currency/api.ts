import { 
  ConversionRate, 
  Currency, 
  CurrencyCode,
  ExchangeRateProvider,
  CurrencyError,
  CurrencyErrorCode,
  CURRENCY_CONSTANTS
} from './types';

// Constantes y configuración
const CACHE_DURATION = 300000; // 5 minutos en ms
const NETWORK_DELAY = 500; // Simulación de latencia en ms

/**
 * Monedas disponibles en el sistema
 */
const DEFAULT_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', active: true, decimalPlaces: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', active: true, decimalPlaces: 2 },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$', active: true, decimalPlaces: 0 },
  { code: 'VES', name: 'Bolívar Digital', symbol: 'Bs.', active: true, decimalPlaces: 2 },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/.', active: true, decimalPlaces: 2 },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', active: true, decimalPlaces: 2 },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', active: true, decimalPlaces: 0 },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', active: true, decimalPlaces: 2 }
];

/**
 * Tasas de cambio base (USD como moneda base)
 */
const BASE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  COP: 4150.0,
  VES: 91.50,
  PEN: 3.85,
  MXN: 17.25,
  CLP: 945.50,
  ARS: 850.25
};

/**
 * Tipo para respuesta de API de tasas
 */
interface ExchangeRateResponse {
  success: boolean;
  rate?: number;
  error?: string;
  timestamp?: number;
  provider: string;
}

// Cache mejorado con tipo
interface CacheEntry {
  rate: number;
  timestamp: number;
}

/**
 * Cache para tasas de cambio
 */
const ratesCache = new Map<string, CacheEntry>();

/**
 * Obtiene todas las monedas disponibles
 */
export async function fetchCurrencies(): Promise<Currency[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));
    return DEFAULT_CURRENCIES;
  } catch (error) {
    throw new CurrencyError(
      'No se pudieron cargar las monedas',
      'NETWORK_ERROR',
      { error }
    );
  }
}

/**
 * Calcula la tasa de cambio entre dos monedas
 */
export async function fetchConversionRate(
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> {
  try {
    if (from === to) return 1;

    const cacheKey = `${from}-${to}`;
    const cached = ratesCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.rate;
    }

    const fromRate = BASE_RATES[from];
    const toRate = BASE_RATES[to];

    if (!fromRate || !toRate) {
      throw new CurrencyError(
        `Tasa no disponible para ${from} a ${to}`,
        'CONVERSION_ERROR',
        { from, to }
      );
    }

    const rate = toRate / fromRate;

    ratesCache.set(cacheKey, {
      rate,
      timestamp: Date.now()
    });

    return rate;
  } catch (error) {
    if (error instanceof CurrencyError) throw error;
    
    throw new CurrencyError(
      'Error al obtener tasa de cambio',
      'NETWORK_ERROR',
      { from, to, error }
    );
  }
}

/**
 * Obtiene tasas desde API externa
 */
export async function fetchExchangeRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  if (!provider.isActive) {
    throw new CurrencyError(
      'Proveedor inactivo',
      'PROVIDER_ERROR',
      { provider: provider.name }
    );
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
          rate: BASE_RATES.VES,
          timestamp: Date.now(),
          provider: 'manual'
        };
      default:
        throw new CurrencyError(
          'Proveedor no soportado',
          'CONFIG_ERROR',
          { provider: provider.name }
        );
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      provider: provider.name
    };
  }
}

/**
 * Obtiene tasa del BCV
 */
async function fetchBCVRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  // Implementación real aquí
  return {
    success: true,
    rate: 36.75,
    timestamp: Date.now(),
    provider: 'bancentralve'
  };
}

/**
 * Obtiene tasa de ApiLayer
 */
async function fetchApiLayerRate(
  provider: ExchangeRateProvider
): Promise<ExchangeRateResponse> {
  if (!provider.apiKey) {
    throw new CurrencyError(
      'API Key requerida',
      'CONFIG_ERROR'
    );
  }

  // Implementación real aquí
  return {
    success: true,
    rate: 36.75,
    timestamp: Date.now(),
    provider: 'apilayer'
  };
}

/**
 * Configura actualización automática
 */
export function setupAutoUpdate(
  provider: ExchangeRateProvider
): () => void {
  if (!provider.isActive || provider.name === 'manual') {
    return () => {};
  }

  let isUpdating = false;

  const updateRates = async () => {
    if (isUpdating) return;
    
    try {
      isUpdating = true;
      const result = await fetchExchangeRate(provider);
      
      if (result.success && result.rate) {
        const cacheKey = `${provider.baseCurrency}-VES`;
        ratesCache.set(cacheKey, {
          rate: result.rate,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error en actualización automática:', error);
    } finally {
      isUpdating = false;
    }
  };

  const intervalId = setInterval(
    updateRates,
    Math.max(
      provider.updateInterval,
      CURRENCY_CONSTANTS.DEFAULT_UPDATE_INTERVAL
    )
  );

  updateRates();

  return () => {
    clearInterval(intervalId);
    isUpdating = false;
  };
}