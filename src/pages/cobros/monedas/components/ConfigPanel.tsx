
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useCurrencyStore, updateManualRate, updateApiConfig } from '@/features/currency/store';
import { fetchExchangeRate } from '@/features/currency/api';

const ConfigPanel: React.FC = () => {
  const { manualRate, apiRate, lastUpdate, apiConfig } = useCurrencyStore();
  
  const handleManualRateChange = (rate: number) => {
    updateManualRate(rate);
  };
  
  const handleApiConfigChange = (field: keyof typeof apiConfig, value: string | number) => {
    updateApiConfig({ [field]: value });
  };
  
  const testApiConnection = async () => {
    if (!apiConfig.key || apiConfig.provider === 'manual') return;
    
    const result = await fetchExchangeRate(apiConfig.key, apiConfig.provider);
    if (result.success) {
      alert('Conexión exitosa! Tasa actualizada.');
    } else {
      alert(`Error: ${result.error}`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>Configura las tasas de cambio y la API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tasa Manual</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="manual-rate">Tasa USD a VEF</Label>
              <span className="font-mono">{manualRate.toFixed(2)}</span>
            </div>
            <div className="flex space-x-2">
              <Slider
                id="manual-rate"
                min={1}
                max={100}
                step={0.25}
                value={[manualRate]}
                onValueChange={(values) => handleManualRateChange(values[0])}
              />
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={manualRate}
                onChange={(e) => handleManualRateChange(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Configuración de API</h3>
          <div className="space-y-2">
            <Label htmlFor="api-provider">Proveedor</Label>
            <Select
              value={apiConfig.provider}
              onValueChange={(value: 'manual' | 'exchangerate' | 'openexchange') => handleApiConfigChange('provider', value)}
            >
              <SelectTrigger id="api-provider">
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual (sin API)</SelectItem>
                <SelectItem value="exchangerate">ExchangeRate API</SelectItem>
                <SelectItem value="openexchange">Open Exchange Rates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {apiConfig.provider !== 'manual' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="text" 
                  value={apiConfig.key}
                  onChange={(e) => handleApiConfigChange('key', e.target.value)}
                  placeholder="Ingresa tu API key"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="update-interval">Intervalo de actualización</Label>
                  <span className="text-muted-foreground">
                    {apiConfig.updateInterval / 60000} minutos
                  </span>
                </div>
                <Slider
                  id="update-interval"
                  min={5}
                  max={120}
                  step={5}
                  value={[apiConfig.updateInterval / 60000]}
                  onValueChange={(values) => 
                    handleApiConfigChange('updateInterval', values[0] * 60000)
                  }
                />
              </div>
              
              <Button onClick={testApiConnection}>Probar Conexión</Button>
              
              {apiRate !== null && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Última tasa desde API: <span className="font-medium">{apiRate.toFixed(2)}</span>
                  </p>
                  {lastUpdate && (
                    <p className="text-sm text-muted-foreground">
                      Actualizado: {new Date(lastUpdate).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
