
import { CurrencyCode, Currency, CurrencyError } from '../types';
import { NETWORK_DELAY, DEFAULT_CURRENCIES, BASE_RATES } from './data';
import { getCachedRate, setCachedRate } from './cache';

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

    // Check cache first
    const cachedRate = getCachedRate(from, to);
    if (cachedRate !== null) {
      return cachedRate;
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

    // Store in cache
    setCachedRate(from, to, rate);

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
