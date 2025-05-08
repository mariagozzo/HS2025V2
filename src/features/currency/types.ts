/**
 * Tipos de moneda soportados en el sistema
 * @since 2025-05-08
 * @author mariagozzo
 */
export type CurrencyCode = 
  | 'USD'  // Dólar Estadounidense
  | 'EUR'  // Euro
  | 'COP'  // Peso Colombiano
  | 'VES'  // Bolívar Digital
  | 'PEN'  // Sol Peruano
  | 'MXN'  // Peso Mexicano
  | 'CLP'  // Peso Chileno
  | 'ARS'; // Peso Argentino

/**
 * Proveedores de tasas de cambio disponibles
 */
export type ExchangeRateProviderName = 
  | 'manual'      // Tasas ingresadas manualmente
  | 'bancentralve'// Banco Central de Venezuela
  | 'apilayer';   // API Layer Exchange Rates

/**
 * Información básica de una moneda
 */
export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  active: boolean;
  decimalPlaces?: number; // Número de decimales para formateo
}

/**
 * Tasa de cambio entre dos monedas
 */
export interface ConversionRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  timestamp: number; // Unix timestamp
  source: ExchangeRateProviderName | 'calculated';
}

/**
 * Resultado de una conversión de moneda
 */
export interface ConversionResult {
  amount: number;
  convertedAmount: number;
  rate: number;
  from: CurrencyCode;
  to: CurrencyCode;
  timestamp: number; // Unix timestamp
  formattedAmount?: string; // Monto formateado según la moneda
  formattedConvertedAmount?: string; // Monto convertido formateado
  provider: ExchangeRateProviderName; // Proveedor usado para la conversión
}

/**
 * Entrada en el historial de conversiones
 */
export interface HistoryEntry {
  id: string; // UUID para identificación única
  date: Date;
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  amount?: number;
  convertedAmount?: number;
  source: ExchangeRateProviderName | 'calculated';
  userId?: string; // ID del usuario que realizó la conversión
}

/**
 * Configuración para proveedores de tasas de cambio
 */
export interface ExchangeRateProvider {
  name: ExchangeRateProviderName;
  apiKey?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  updateInterval: number;
  baseCurrency: CurrencyCode; // Moneda base para las conversiones
  isActive: boolean; // Indica si el proveedor está activo
}

/**
 * Estado global del sistema de monedas
 */
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
  config: {
    defaultCurrency: CurrencyCode;
    updateInterval: number; // en milisegundos
    maxHistoryEntries: number;
    displayFormat: 'symbol' | 'code' | 'both';
    autoUpdate: boolean;
  };
}

/**
 * Códigos de error específicos para operaciones de moneda
 */
export type CurrencyErrorCode = 
  | 'INVALID_AMOUNT'
  | 'INVALID_RATE'
  | 'PROVIDER_ERROR'
  | 'CONVERSION_ERROR'
  | 'NETWORK_ERROR'
  | 'CONFIG_ERROR';

/**
 * Error personalizado para operaciones de moneda
 */
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

/**
 * Opciones de formato para montos
 */
export interface CurrencyFormatOptions {
  locale?: string;
  style?: 'currency' | 'decimal';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Estado de sincronización con API externa
 */
export interface SyncState {
  lastSync: Date | null;
  nextSync: Date | null;
  status: 'idle' | 'syncing' | 'error';
  error?: string;
  provider: ExchangeRateProviderName;
}

/**
 * Constantes del sistema
 */
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

/**
 * Tipo para eventos del sistema de monedas
 */
export type CurrencyEvent = 
  | { type: 'RATE_UPDATED'; payload: ConversionRate }
  | { type: 'CONVERSION_COMPLETED'; payload: ConversionResult }
  | { type: 'PROVIDER_CHANGED'; payload: ExchangeRateProviderName }
  | { type: 'ERROR_OCCURRED'; payload: CurrencyError };