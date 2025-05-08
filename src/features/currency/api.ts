import { ConversionRate, Currency, CurrencyCode } from './types';

// Monedas disponibles en el sistema
const mockCurrencies: Currency[] = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', active: true },
  { code: 'EUR', name: 'Euro', symbol: '€', active: true },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$', active: true },
  { code: 'VES', name: 'Bolívar Digital', symbol: 'Bs.', active: true },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/.', active: true },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', active: true },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', active: true },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', active: true }
];

// Tasas de cambio entre monedas (datos de ejemplo)
const mockRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.92,
    COP: 4150.0,
    VES: 91.50,
    PEN: 3.85,
    MXN: 17.25,
    CLP: 945.50,
    ARS: 850.25
  },
  EUR: {
    USD: 1.09,
    COP: 4520.0,
    VES: 91.50,
    PEN: 4.19,
    MXN: 18.80,
    CLP: 1030.0,
    ARS: 926.77
  },
  // Añadir más tasas según sea necesario
};

// Interfaz para la configuración de la API
export interface CurrencyApiConfig {
  provider: 'manual' | 'bancentralve' | 'apilayer';
  apiKey?: string;
  updateInterval: number; // en milisegundos
  baseCurrency: CurrencyCode;
}

/**
 * Obtiene todas las monedas disponibles en el sistema
 * @returns Promise<Currency[]> Lista de monedas disponibles
 */
export async function fetchCurrencies(): Promise<Currency[]> {
  try {
    // En producción, esto sería una llamada a la API real
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCurrencies), 500);
    });
  } catch (error) {
    console.error('Error al obtener las monedas:', error);
    throw new Error('No se pudieron cargar las monedas');
  }
}

/**
 * Obtiene la tasa de cambio entre dos monedas
 * @param from Moneda de origen
 * @param to Moneda de destino
 * @returns Promise<number> Tasa de cambio
 */
export async function fetchConversionRate(
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Si las monedas son iguales, la tasa es 1
        if (from === to) {
          resolve(1);
          return;
        }

        // Verificar si existe la tasa directa
        if (mockRates[from]?.[to]) {
          resolve(mockRates[from][to]);
          return;
        }

        // Verificar si existe la tasa inversa
        if (mockRates[to]?.[from]) {
          resolve(1 / mockRates[to][from]);
          return;
        }

        // Si no hay tasa disponible, intentar conversión a través de USD
        if (mockRates['USD'][from] && mockRates['USD'][to]) {
          const throughUSD = mockRates['USD'][to] / mockRates['USD'][from];
          resolve(throughUSD);
          return;
        }

        reject(new Error(`No hay tasa de conversión disponible para ${from} a ${to}`));
      }, 500);
    });
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error);
    throw error;
  }
}

/**
 * Obtiene la tasa de cambio desde una API externa
 * @param config Configuración de la API
 * @returns Promise con el resultado de la operación
 */
export async function fetchExchangeRate(config: CurrencyApiConfig): Promise<{
  success: boolean;
  rate?: number;
  error?: string;
  timestamp?: number;
}> {
  try {
    // Aquí iría la implementación real según el proveedor
    switch (config.provider) {
      case 'bancentralve':
        // Implementar llamada a API del BCV
        return {
          success: true,
          rate: 36.75,
          timestamp: Date.now()
        };

      case 'apilayer':
        if (!config.apiKey) {
          throw new Error('Se requiere apiKey para usar apilayer');
        }
        // Implementar llamada a API de apilayer
        return {
          success: true,
          rate: 36.75,
          timestamp: Date.now()
        };

      case 'manual':
        return {
          success: true,
          rate: mockRates.USD.VES,
          timestamp: Date.now()
        };

      default:
        throw new Error('Proveedor de tasas de cambio no soportado');
    }
  } catch (error) {
    console.error('Error al obtener tasa de cambio:', error);
    return {
      success: false,
      error: 'No se pudo obtener la tasa de cambio'
    };
  }
}

/**
 * Configura la actualización automática de tasas de cambio
 * @param config Configuración para la actualización
 * @returns Función para limpiar el intervalo
 */
export function setupAutoUpdate(config: CurrencyApiConfig): () => void {
  if (config.provider === 'manual' || !config.updateInterval) {
    return () => {}; // No se necesita limpieza
  }

  const updateRates = async () => {
    try {
      const result = await fetchExchangeRate(config);
      if (result.success && result.rate) {
        // Aquí se implementaría la actualización de las tasas en el estado global
        console.log('Tasas actualizadas:', result.rate);
      }
    } catch (error) {
      console.error('Error en la actualización automática:', error);
    }
  };

  // Configurar el intervalo de actualización
  const intervalId = setInterval(updateRates, config.updateInterval);

  // Primera actualización inmediata
  updateRates();

  // Retornar función de limpieza
  return () => clearInterval(intervalId);
}