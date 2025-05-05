
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CrudLayout from '@/components/common/crud/CrudLayout';
import ClientsList from '@/components/admin/clients/ClientsList';
import ClientFormDialog from '@/components/admin/clients/ClientFormDialog';
import { Client } from '@/types/database';
import { fromTable } from '@/integrations/supabase/client';

const ClientsPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  const { data: clients, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await fromTable<Client>('clients')
        .select('*')
        .order('last_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };
  
  const handleFormClose = () => {
    setFormOpen(false);
    setEditingClient(null);
  };
  
  const handleFormSuccess = () => {
    refetch();
    handleFormClose();
  };

  return (
    <CrudLayout
      title="Clientes"
      subtitle="Gestione todos los clientes de su agencia"
      breadcrumbs={[{ text: 'Clientes' }]}
      actions={
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      }
    >
      <ClientsList 
        clients={clients || []} 
        onEdit={handleEditClient} 
        onDelete={() => refetch()}
      />
      
      <ClientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        client={editingClient}
        onSuccess={handleFormSuccess}
      />
    </CrudLayout>
  );
};

export default ClientsPage;
