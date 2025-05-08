
import React from 'react';
import PageLayout from '@/components/common/PageLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromPayments } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/utils';

const PaymentsPage = () => {
  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await fromPayments()
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
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'policy_id',
      header: 'ID de Póliza',
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
    {
      accessorKey: 'payment_date',
      header: 'Fecha de Pago',
    },
    {
      accessorKey: 'due_date',
      header: 'Fecha de Vencimiento',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      accessorKey: 'payment_method',
      header: 'Método de Pago',
    },
    {
      accessorKey: 'receipt_number',
      header: 'Número de Recibo',
    },
    {
      accessorKey: 'created_at',
      header: 'Fecha de Creación',
    },
    {
      accessorKey: 'updated_at',
      header: 'Fecha de Actualización',
    },
  ];

  return (
    <PageLayout title="Pagos">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pagos</h1>
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Pago
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <DataTable 
            columns={columns} 
            data={payments || []} 
            searchKey="receipt_number"
            searchPlaceholder="Buscar por recibo..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentsPage;
