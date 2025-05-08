
import { ExchangeRateProvider, CURRENCY_CONSTANTS } from '../types';
import { setCachedRate } from './cache';
import { fetchExchangeRate } from './providers';
export { fetchCurrencies, fetchConversionRate } from './core';
export { fetchExchangeRate } from './providers';

/**
 * Configura actualización automática de tasas
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
        setCachedRate(provider.baseCurrency, 'VES', result.rate);
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
