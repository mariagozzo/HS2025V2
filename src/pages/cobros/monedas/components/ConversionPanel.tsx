
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import { ConversionRequest, ConversionResult } from '@/features/currency/types';
import { convertCurrency } from '@/features/currency/store';
import { formatCurrency } from '@/lib/utils';

const ConversionPanel: React.FC = () => {
  const [formData, setFormData] = useState<ConversionRequest>({
    amount: 100,
    from: 'USD',
    to: 'VEF',
    useApi: false,
  });
  
  const [result, setResult] = useState<ConversionResult | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conversionResult = convertCurrency(formData);
    setResult(conversionResult);
  };
  
  const handleChange = (field: keyof ConversionRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const swapCurrencies = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversión de Moneda</CardTitle>
        <CardDescription>Convierte entre USD y VEF usando tasas manuales o desde API</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from">De</Label>
              <Select
                value={formData.from}
                onValueChange={(value) => handleChange('from', value as 'USD' | 'VEF')}
              >
                <SelectTrigger id="from">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                  <SelectItem value="VEF">VEF - Bolívar Venezolano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end justify-center">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={swapCurrencies}
                className="mb-2"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to">A</Label>
              <Select
                value={formData.to}
                onValueChange={(value) => handleChange('to', value as 'USD' | 'VEF')}
              >
                <SelectTrigger id="to">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                  <SelectItem value="VEF">VEF - Bolívar Venezolano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="api-mode"
                  checked={formData.useApi}
                  onCheckedChange={(checked) => handleChange('useApi', checked)}
                />
                <Label htmlFor="api-mode">Usar API</Label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full">Convertir</Button>
        </form>
        
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Resultado:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">De:</p>
                <p className="text-lg font-medium">{formatCurrency(result.input, result.from)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">A:</p>
                <p className="text-lg font-medium">{formatCurrency(result.output, result.to)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa:</p>
                <p>1 USD = {result.rate.toFixed(2)} VEF</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fuente:</p>
                <p>{result.source === 'api' ? 'API' : 'Manual'}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversionPanel;
