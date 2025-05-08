import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/common/PageLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromInvoices } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/utils';

const InvoicesPage = () => {
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await fromInvoices()
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
      accessorKey: 'invoice_number',
      header: 'Número de Factura',
    },
    {
      accessorKey: 'client_id',
      header: 'Cliente',
    },
    {
      accessorKey: 'issue_date',
      header: 'Fecha de Emisión',
    },
    {
      accessorKey: 'due_date',
      header: 'Fecha de Vencimiento',
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
    },
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>Facturas | HubSeguros</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Facturas</h1>
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700">
            <Plus className="h-4 w-4 mr-2" /> Nueva Factura
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <DataTable 
            columns={columns} 
            data={invoices || []} 
            searchKey="invoice_number"
            searchPlaceholder="Buscar por número..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default InvoicesPage;
