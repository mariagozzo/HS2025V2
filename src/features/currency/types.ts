/**
 * Tipos de moneda soportados en el sistema
 * @since 2025-05-08
 * @author mariagozzo
 */

// Tipos Base
export type CurrencyCode = 
  | 'USD'  // Dólar Estadounidense
  | 'EUR'  // Euro
  | 'COP'  // Peso Colombiano
  | 'VES'  // Bolívar Digital
  | 'PEN'  // Sol Peruano
  | 'MXN'  // Peso Mexicano
  | 'CLP'  // Peso Chileno
  | 'ARS'; // Peso Argentino

export type ExchangeRateProviderName = 
  | 'manual'      // Tasas ingresadas manualmente
  | 'bancentralve'// Banco Central de Venezuela
  | 'apilayer';   // API Layer Exchange Rates

export type DisplayFormat = 'symbol' | 'code' | 'both';
export type SyncStatus = 'idle' | 'syncing' | 'error';

// Interfaces Base
export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  active: boolean;
  decimalPlaces?: number;
}

export interface ConversionRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  timestamp: number;
  source: ExchangeRateProviderName | 'calculated';
}

// Interfaces de Resultados
export interface ConversionResult {
  amount: number;
  convertedAmount: number;
  rate: number;
  from: CurrencyCode;
  to: CurrencyCode;
  timestamp: number;
  formattedAmount?: string;
  formattedConvertedAmount?: string;
  provider: ExchangeRateProviderName;
}

export interface HistoryEntry {
  id: string;
  date: Date;
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  amount?: number;
  convertedAmount?: number;
  source: ExchangeRateProviderName | 'calculated';
  userId?: string;
}

// Interfaces de Configuración
export interface ExchangeRateProvider {
  name: ExchangeRateProviderName;
  apiKey?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  updateInterval: number;
  baseCurrency: CurrencyCode;
  isActive: boolean;
}

export interface CurrencyConfig {
  defaultCurrency: CurrencyCode;
  updateInterval: number;
  maxHistoryEntries: number;
  displayFormat: DisplayFormat;
  autoUpdate: boolean;
}

// Estado Principal
export interface CurrencyState {
  // Datos base
  currencies: Currency[];
  baseCurrency: CurrencyCode;
  conversionRates: ConversionRate[];
  
  // Selección actual
  selectedFromCurrency: CurrencyCode | null;
  selectedToCurrency: CurrencyCode | null;
  amount: number;
  
  // Resultados
  convertedAmount: number | null;
  conversionResult: ConversionResult | null;
  
  // Estado de UI
  isLoading: boolean;
  error: string | null;
  
  // Historial y tracking
  history: HistoryEntry[];
  lastUpdate: Date | null;
  
  // Configuración y providers
  provider: ExchangeRateProvider;
  config: CurrencyConfig;
}

// Manejo de Errores
export type CurrencyErrorCode = 
  | 'INVALID_AMOUNT'
  | 'INVALID_RATE'
  | 'PROVIDER_ERROR'
  | 'CONVERSION_ERROR'
  | 'NETWORK_ERROR'
  | 'CONFIG_ERROR';

export class CurrencyError extends Error {
  constructor(
    message: string,
    public code: CurrencyErrorCode,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CurrencyError';
  }
}

// Interfaces de Formato
export interface CurrencyFormatOptions {
  locale?: string;
  style?: 'currency' | 'decimal';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

// Estado de Sincronización
export interface SyncState {
  lastSync: Date | null;
  nextSync: Date | null;
  status: SyncStatus;
  error?: string;
  provider: ExchangeRateProviderName;
}

// Eventos del Sistema
export type CurrencyEvent = 
  | { type: 'RATE_UPDATED'; payload: ConversionRate }
  | { type: 'CONVERSION_COMPLETED'; payload: ConversionResult }
  | { type: 'PROVIDER_CHANGED'; payload: ExchangeRateProviderName }
  | { type: 'ERROR_OCCURRED'; payload: CurrencyError };

// Constantes
export const CURRENCY_CONSTANTS = {
  MAX_HISTORY_ENTRIES: 50,
  DEFAULT_UPDATE_INTERVAL: 300000, // 5 minutos
  DEFAULT_CURRENCY: 'USD' as CurrencyCode,
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 999999999.99,
  DEFAULT_DECIMAL_PLACES: 2,
  PROVIDERS: {
    MANUAL: 'manual' as ExchangeRateProviderName,
    BCV: 'bancentralve' as ExchangeRateProviderName,
    APILAYER: 'apilayer' as ExchangeRateProviderName
  }
} as const;