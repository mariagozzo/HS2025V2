# Currency Module Documentation

## Overview
The Currency module provides a robust system for handling currency conversions, exchange rates, and related functionality within the application.

## Features
- Multi-currency support with 8 base currencies
- Real-time exchange rate updates
- Multiple provider support (Manual, BCV, APILayer)
- Caching system for optimal performance
- Type-safe implementation
- Error handling with specific error types
- Automatic rate updates
- Conversion history tracking

## Structure
```
src/features/currency/
├── api.ts         # API and provider implementations
├── store.ts       # State management and selectors
├── types.ts       # TypeScript types and interfaces
└── README.md      # This documentation
```

## Quick Start

```typescript
// Initialize the store
import { initializeCurrencyStore } from './store';
const store = initializeCurrencyStore();

// Basic conversion
const result = await store.convert({
  from: 'USD',
  to: 'EUR',
  amount: 100
});

// Configure provider
store.setProvider({
  name: 'apilayer',
  apiKey: 'your-api-key',
  isActive: true,
  updateInterval: 300000,
  baseCurrency: 'USD'
});
```

## API Reference

### Store Functions
- `convert`: Convert between currencies
- `setProvider`: Configure exchange rate provider
- `updateRates`: Manually trigger rate update
- `getHistory`: Get conversion history
- `clearHistory`: Clear conversion history

### Selectors
- `selectCurrentRate`: Get current exchange rate
- `selectAvailableCurrencies`: Get list of available currencies
- `selectConversionHistory`: Get conversion history
- `selectProviderStatus`: Get current provider status

### Error Handling
```typescript
try {
  await store.convert({
    from: 'USD',
    to: 'EUR',
    amount: 100
  });
} catch (error) {
  if (error instanceof CurrencyError) {
    console.error(`Error ${error.code}: ${error.message}`);
  }
}
```

## Configuration

### Provider Configuration
```typescript
interface ExchangeRateProvider {
  name: ExchangeRateProviderName;
  apiKey?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  updateInterval: number;
  baseCurrency: CurrencyCode;
  isActive: boolean;
}
```

### Format Options
```typescript
interface CurrencyFormatOptions {
  locale?: string;
  style?: 'currency' | 'decimal';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}
```

## Constants

```typescript
const CURRENCY_CONSTANTS = {
  MAX_HISTORY_ENTRIES: 50,
  DEFAULT_UPDATE_INTERVAL: 300000, // 5 minutes
  DEFAULT_CURRENCY: 'USD',
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 999999999.99,
  DEFAULT_DECIMAL_PLACES: 2
};
```

## Best Practices

1. **Error Handling**
   - Always wrap currency operations in try/catch blocks
   - Use specific error types for better error handling
   - Check provider status before operations

2. **Rate Updates**
   - Use automatic updates when possible
   - Configure appropriate update intervals
   - Handle network errors gracefully

3. **Performance**
   - Utilize the built-in caching system
   - Batch updates when possible
   - Monitor memory usage with large history sets

## Migration Guide

### From v1.x to v2.x
- Provider configuration now requires `isActive` flag
- New error types added
- Improved type safety
- Breaking: Changed event structure

## Contributing

1. Follow TypeScript best practices
2. Add tests for new features
3. Update documentation
4. Use conventional commits

## License
MIT License - See LICENSE file for details