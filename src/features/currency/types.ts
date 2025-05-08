
export interface CurrencyState {
  manualRate: number;
  apiRate: number | null;
  lastUpdate: Date | null;
  apiConfig: {
    key: string;
    provider: string;
    updateInterval: number;
  };
  history: Array<{
    date: Date;
    rate: number;
    source: 'manual' | 'api';
  }>;
}

export interface ConversionRequest {
  amount: number;
  from: 'USD' | 'VEF';
  to: 'USD' | 'VEF';
  useApi?: boolean;
}

export interface ConversionResult {
  input: number;
  output: number;
  rate: number;
  timestamp: Date;
  source: 'manual' | 'api';
  from: 'USD' | 'VEF';
  to: 'USD' | 'VEF';
}
