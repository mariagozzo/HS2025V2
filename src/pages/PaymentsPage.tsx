
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CrudLayout from '@/components/common/crud/CrudLayout';
import { Payment } from '@/types/database';
import { fromTable } from '@/integrations/supabase/client';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteDialog from '@/components/common/crud/ConfirmDeleteDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

const PaymentsPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);
  
  const { data: payments = [], refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await fromTable<Payment>('payments')
        .select('*')
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: policies = [] } = useQuery({
    queryKey: ['policies-for-payments'],
    queryFn: async () => {
      const { data, error } = await fromTable('policies')
        .select('id, policy_number');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const deletePaymentMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await fromTable('payments')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Pago eliminado",
        description: "El pago ha sido eliminado exitosamente",
      });
      setDeleteDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el pago: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (payment: Payment) => {
    setPaymentToDelete(payment);
    setDeleteDialogOpen(true);
  };
  
  const getPolicyNumber = (policyId: string | null) => {
    if (!policyId) return 'N/A';
    const policy = policies.find(p => p.id === policyId);
    return policy ? policy.policy_number : 'N/A';
  };
  
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'receipt_number',
      header: 'N° Recibo',
    },
    {
      id: 'policy',
      header: 'Póliza',
      cell: ({ row }) => getPolicyNumber(row.original.policy_id),
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      cell: ({ row }) => {
        const amount = row.original.amount;
        return `$${amount.toLocaleString('es-CO')}`;
      }
    },
    {
      accessorKey: 'payment_date',
      header: 'Fecha de pago',
      cell: ({ row }) => {
        const date = row.original.payment_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'due_date',
      header: 'Fecha de vencimiento',
      cell: ({ row }) => {
        const date = row.original.due_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => {
        const status = row.original.status;
        if (!status) return '-';
        
        let variant: "default" | "secondary" | "destructive" | "outline" = "default";
        
        switch (status.toLowerCase()) {
          case 'pagado':
            variant = "default";
            break;
          case 'vencido':
            variant = "destructive";
            break;
          case 'pendiente':
            variant = "secondary";
            break;
          default:
            variant = "outline";
        }
        
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      accessorKey: 'payment_method',
      header: 'Método de pago',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* TODO: Implement edit payment */}}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(payment)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <CrudLayout
      title="Pagos"
      subtitle="Gestione todos los pagos de las pólizas"
      breadcrumbs={[{ text: 'Pagos' }]}
      actions={
        <Button onClick={() => {/* TODO: Implement create payment */}}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pago
        </Button>
      }
    >
      <DataTable 
        columns={columns} 
        data={payments} 
        searchKey="receipt_number" 
        searchPlaceholder="Buscar por número de recibo..."
      />
      
      {paymentToDelete && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Confirmar Eliminación"
          description="¿Está seguro que desea eliminar el pago"
          itemIdentifier={paymentToDelete.receipt_number || 'seleccionado'}
          isDeleting={deletePaymentMutation.isPending}
          onDelete={() => deletePaymentMutation.mutate(paymentToDelete.id)}
        />
      )}
    </CrudLayout>
  );
};

export default PaymentsPage;
