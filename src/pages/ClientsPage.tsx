
import React from 'react';
import PageLayout from '@/components/common/PageLayout';
import ClientsList from '@/components/admin/clients/ClientsList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromClients } from '@/integrations/supabase/client';

const ClientsPage = () => {
  const { data: clients, isLoading, error, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await fromClients()
        .select('*')
        .order('last_name', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });

  return (
    <PageLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Cliente
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <ClientsList 
            clients={clients || []} 
            isLoading={isLoading} 
            error={error} 
            onDelete={refetch}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ClientsPage;
