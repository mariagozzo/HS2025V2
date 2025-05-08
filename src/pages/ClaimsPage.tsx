import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/common/PageLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromClaims } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const ClaimsPage = () => {
  const { data: claims, isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const { data, error } = await fromClaims()
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });

  const columns = [
    {
      accessorKey: 'claim_number',
      header: 'Número de Siniestro',
    },
    {
      accessorKey: 'policy_id',
      header: 'ID de Póliza',
    },
    {
      accessorKey: 'claim_date',
      header: 'Fecha de Siniestro',
      cell: ({ row }) => row.original.claim_date ? format(new Date(row.original.claim_date), 'dd/MM/yyyy') : 'N/A',
    },
    {
      accessorKey: 'notification_date',
      header: 'Fecha de Notificación',
      cell: ({ row }) => row.original.notification_date ? format(new Date(row.original.notification_date), 'dd/MM/yyyy') : 'N/A',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      accessorKey: 'settlement_amount',
      header: 'Monto de Liquidación',
    },
    {
      accessorKey: 'settlement_date',
      header: 'Fecha de Liquidación',
      cell: ({ row }) => row.original.settlement_date ? format(new Date(row.original.settlement_date), 'dd/MM/yyyy') : 'N/A',
    },
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>Siniestros | HubSeguros</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Siniestros</h1>
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Siniestro
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <DataTable 
            columns={columns} 
            data={claims || []} 
            searchKey="claim_number"
            searchPlaceholder="Buscar por número..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ClaimsPage;
