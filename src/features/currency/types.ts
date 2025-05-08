
export type CurrencyCode = string;

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  active: boolean;
}

export interface ConversionRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
}

export interface ConversionResult {
  amount: number;
  convertedAmount: number;
  rate: number;
  from: CurrencyCode;
  to: CurrencyCode;
}

export interface HistoryEntry {
  date: Date;
  rate: number;
  source: "manual" | "api"; // Fixing the source type to be a union of specific strings
}

export interface CurrencyState {
  currencies: Currency[];
  baseCurrency: CurrencyCode | null;
  conversionRates: ConversionRate[];
  selectedFromCurrency: CurrencyCode | null;
  selectedToCurrency: CurrencyCode | null;
  amount: number;
  convertedAmount: number | null;
  conversionResult: ConversionResult | null;
  isLoading: boolean;
  error: string | null;
  history: HistoryEntry[];
}
