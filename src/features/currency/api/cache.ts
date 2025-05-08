
import { CurrencyCode } from '../types';

// Cache duration in milliseconds
export const CACHE_DURATION = 300000; // 5 minutes

// Interface for cache entries
export interface CacheEntry {
  rate: number;
  timestamp: number;
}

// Cache for exchange rates
export const ratesCache = new Map<string, CacheEntry>();

/**
 * Gets a cached rate if available and not expired
 */
export function getCachedRate(from: CurrencyCode, to: CurrencyCode): number | null {
  const cacheKey = `${from}-${to}`;
  const cached = ratesCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rate;
  }
  
  return null;
}

/**
 * Sets a rate in the cache
 */
export function setCachedRate(from: CurrencyCode, to: CurrencyCode, rate: number): void {
  const cacheKey = `${from}-${to}`;
  ratesCache.set(cacheKey, {
    rate,
    timestamp: Date.now()
  });
}
