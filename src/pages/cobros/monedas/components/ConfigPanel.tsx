
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
  const { provider, lastUpdate } = useCurrencyStore();
  
  const handleManualRateChange = (rate: number) => {
    updateManualRate(rate);
  };
  
  const handleApiConfigChange = (field: keyof typeof provider, value: string | number | 'manual' | 'bancentralve' | 'apilayer') => {
    updateApiConfig({ [field]: value });
  };
  
  const testApiConnection = async () => {
    if (provider.name === 'manual' || !provider.isActive) return;
    
    try {
      const result = await fetchExchangeRate(provider);
      if (result.success) {
        alert('Conexión exitosa! Tasa actualizada.');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
              <Label htmlFor="manual-rate">Tasa USD a VES</Label>
              <span className="font-mono">{provider.name === 'manual' ? '36.75' : '36.75'}</span>
            </div>
            <div className="flex space-x-2">
              <Slider
                id="manual-rate"
                min={1}
                max={100}
                step={0.25}
                value={[provider.name === 'manual' ? 36.75 : 36.75]}
                onValueChange={(values) => handleManualRateChange(values[0])}
              />
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={provider.name === 'manual' ? 36.75 : 36.75}
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
              value={provider.name}
              onValueChange={(value: 'manual' | 'bancentralve' | 'apilayer') => 
                handleApiConfigChange('name', value)
              }
            >
              <SelectTrigger id="api-provider">
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual (sin API)</SelectItem>
                <SelectItem value="bancentralve">Banco Central de Venezuela</SelectItem>
                <SelectItem value="apilayer">API Layer Exchange Rates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {provider.name !== 'manual' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="text" 
                  value={provider.apiKey || ''}
                  onChange={(e) => handleApiConfigChange('apiKey', e.target.value)}
                  placeholder="Ingresa tu API key"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="update-interval">Intervalo de actualización</Label>
                  <span className="text-muted-foreground">
                    {provider.updateInterval / 60000} minutos
                  </span>
                </div>
                <Slider
                  id="update-interval"
                  min={5}
                  max={120}
                  step={5}
                  value={[provider.updateInterval / 60000]}
                  onValueChange={(values) => 
                    handleApiConfigChange('updateInterval', values[0] * 60000)
                  }
                />
              </div>
              
              <Button onClick={testApiConnection}>Probar Conexión</Button>
              
              {lastUpdate && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Última actualización: <span className="font-medium">{new Date(lastUpdate).toLocaleString()}</span>
                  </p>
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
