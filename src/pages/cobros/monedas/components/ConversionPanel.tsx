
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { useCurrencyStore } from '@/features/currency/store';
import { CurrencyCode } from '@/features/currency/types';

const ConversionPanel = () => {
  const {
    currencies,
    selectedFromCurrency,
    selectedToCurrency,
    amount,
    conversionResult,
    isLoading,
    error,
    setSelectedCurrencies,
    setAmount,
    convertCurrency
  } = useCurrencyStore();
  
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode | null>(selectedFromCurrency);
  const [toCurrency, setToCurrency] = useState<CurrencyCode | null>(selectedToCurrency);
  const [conversionAmount, setConversionAmount] = useState<number>(amount || 0);
  
  const handleFromCurrencyChange = (value: string) => {
    // Cast the string value to CurrencyCode type since we know it's valid
    const currencyCode = value as CurrencyCode;
    setFromCurrency(currencyCode);
    if (toCurrency) {
      setSelectedCurrencies(currencyCode, toCurrency);
    }
  };
  
  const handleToCurrencyChange = (value: string) => {
    // Cast the string value to CurrencyCode type since we know it's valid
    const currencyCode = value as CurrencyCode;
    setToCurrency(currencyCode);
    if (fromCurrency) {
      setSelectedCurrencies(fromCurrency, currencyCode);
    }
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setConversionAmount(isNaN(newAmount) ? 0 : newAmount);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };
  
  const handleSwapCurrencies = () => {
    if (fromCurrency && toCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setSelectedCurrencies(toCurrency, fromCurrency);
    }
  };
  
  const handleConvert = async () => {
    await convertCurrency();
  };
  
  const getSymbolForCurrency = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversor de Monedas</CardTitle>
        <CardDescription>
          Convierte entre diferentes monedas usando tasas de cambio actualizadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad</Label>
            <Input
              id="amount"
              type="number"
              value={conversionAmount || ''}
              onChange={handleAmountChange}
              min={0}
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-currency">De</Label>
            <Select value={fromCurrency || ''} onValueChange={handleFromCurrencyChange}>
              <SelectTrigger id="from-currency">
                <SelectValue placeholder="Seleccionar moneda" />
              </SelectTrigger>
              <SelectContent>
                {currencies.filter(c => c.active).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwapCurrencies}>
              <ArrowRightLeft className="h-4 w-4" />
              <span className="sr-only">Invertir monedas</span>
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-currency">A</Label>
            <Select value={toCurrency || ''} onValueChange={handleToCurrencyChange}>
              <SelectTrigger id="to-currency">
                <SelectValue placeholder="Seleccionar moneda" />
              </SelectTrigger>
              <SelectContent>
                {currencies.filter(c => c.active).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Resultado</Label>
            <div className="h-10 px-3 py-2 border rounded-md flex items-center bg-gray-50">
              {conversionResult ? (
                <span>
                  {conversionResult.convertedAmount.toFixed(2)} {getSymbolForCurrency(conversionResult.to)}
                </span>
              ) : (
                <span className="text-gray-400">--</span>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm font-medium text-destructive">{error}</div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConvert} disabled={isLoading || !fromCurrency || !toCurrency || conversionAmount <= 0}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Convirtiendo...
            </>
          ) : 'Convertir'}
        </Button>
        {conversionResult && (
          <div className="ml-auto text-sm text-muted-foreground">
            1 {conversionResult.from} = {conversionResult.rate.toFixed(4)} {conversionResult.to}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ConversionPanel;
