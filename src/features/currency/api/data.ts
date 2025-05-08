
import { Currency, CurrencyCode } from '../types';

// Network simulation delay in milliseconds
export const NETWORK_DELAY = 500;

/**
 * Default currencies available in the system
 */
export const DEFAULT_CURRENCIES: Currency[] = [
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
 * Base exchange rates (USD as reference currency)
 */
export const BASE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  COP: 4150.0,
  VES: 91.50,
  PEN: 3.85,
  MXN: 17.25,
  CLP: 945.50,
  ARS: 850.25
};
