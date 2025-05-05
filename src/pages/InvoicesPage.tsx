
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CrudLayout from '@/components/common/crud/CrudLayout';
import { fromTable } from '@/integrations/supabase/client';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteDialog from '@/components/common/crud/ConfirmDeleteDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

// Tipo local para las facturas (no existe en types/database.ts)
interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string | null;
  issue_date: string | null;
  due_date: string | null;
  amount: number;
  status: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const InvoicesPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);
  
  const { data: invoices = [], refetch } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await fromTable<Invoice>('invoices')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: clients = [] } = useQuery({
    queryKey: ['clients-for-invoices'],
    queryFn: async () => {
      const { data, error } = await fromTable('clients')
        .select('id, first_name, last_name');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const deleteInvoiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await fromTable('invoices')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Factura eliminada",
        description: "La factura ha sido eliminada exitosamente",
      });
      setDeleteDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la factura: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (invoice: Invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };
  
  const getClientName = (clientId: string | null) => {
    if (!clientId) return 'N/A';
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'N/A';
  };
  
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'invoice_number',
      header: 'N° Factura',
    },
    {
      id: 'client',
      header: 'Cliente',
      cell: ({ row }) => getClientName(row.original.client_id),
    },
    {
      accessorKey: 'issue_date',
      header: 'Fecha emisión',
      cell: ({ row }) => {
        const date = row.original.issue_date;
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
      header: 'Fecha vencimiento',
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
      accessorKey: 'amount',
      header: 'Monto',
      cell: ({ row }) => {
        const amount = row.original.amount;
        return `$${amount.toLocaleString('es-CO')}`;
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
          case 'pagada':
            variant = "default";
            break;
          case 'vencida':
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
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const invoice = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* TODO: Implement edit invoice */}}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(invoice)}
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
      title="Facturas"
      subtitle="Gestione todas las facturas del sistema"
      breadcrumbs={[{ text: 'Facturas' }]}
      actions={
        <Button onClick={() => {/* TODO: Implement create invoice */}}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      }
    >
      <DataTable 
        columns={columns} 
        data={invoices} 
        searchKey="invoice_number" 
        searchPlaceholder="Buscar por número de factura..."
      />
      
      {invoiceToDelete && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Confirmar Eliminación"
          description="¿Está seguro que desea eliminar la factura"
          itemIdentifier={invoiceToDelete.invoice_number}
          isDeleting={deleteInvoiceMutation.isPending}
          onDelete={() => deleteInvoiceMutation.mutate(invoiceToDelete.id)}
        />
      )}
    </CrudLayout>
  );
};

export default InvoicesPage;
