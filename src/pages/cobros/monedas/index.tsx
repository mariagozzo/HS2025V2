
import React, { useEffect } from 'react';
import PageLayout from '@/components/common/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConversionPanel from './components/ConversionPanel';
import ConfigPanel from './components/ConfigPanel';
import HistoryPanel from './components/HistoryPanel';
import { useCurrencyStore } from '@/features/currency/store';

const CurrencyPage = () => {
  const { provider, fetchCurrencies } = useCurrencyStore();

  // Fetch currencies when the component mounts
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  // We no longer need to setup auto-update here as it's handled in the store
  
  return (
    <PageLayout title="Gestión de Monedas">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Monedas</h1>
        </div>
        
        <Tabs defaultValue="conversion" className="space-y-6">
          <TabsList>
            <TabsTrigger value="conversion">Conversión</TabsTrigger>
            <TabsTrigger value="configuration">Configuración</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversion">
            <ConversionPanel />
          </TabsContent>
          
          <TabsContent value="configuration">
            <ConfigPanel />
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryPanel />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CurrencyPage;
