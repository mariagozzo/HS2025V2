
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CrudLayout from '@/components/common/crud/CrudLayout';
import { Claim } from '@/types/database';
import { fromTable } from '@/integrations/supabase/client';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteDialog from '@/components/common/crud/ConfirmDeleteDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

const ClaimsPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [claimToDelete, setClaimToDelete] = useState<Claim | null>(null);
  
  const { data: claims = [], refetch } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const { data, error } = await fromTable<Claim>('claims')
        .select('*')
        .order('claim_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: policies = [] } = useQuery({
    queryKey: ['policies-for-claims'],
    queryFn: async () => {
      const { data, error } = await fromTable('policies')
        .select('id, policy_number');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const deleteClaimMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await fromTable('claims')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Siniestro eliminado",
        description: "El siniestro ha sido eliminado exitosamente",
      });
      setDeleteDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el siniestro: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (claim: Claim) => {
    setClaimToDelete(claim);
    setDeleteDialogOpen(true);
  };
  
  const getPolicyNumber = (policyId: string | null) => {
    if (!policyId) return 'N/A';
    const policy = policies.find(p => p.id === policyId);
    return policy ? policy.policy_number : 'N/A';
  };
  
  const columns: ColumnDef<Claim>[] = [
    {
      accessorKey: 'claim_number',
      header: 'N° Siniestro',
    },
    {
      id: 'policy',
      header: 'Póliza',
      cell: ({ row }) => getPolicyNumber(row.original.policy_id),
    },
    {
      accessorKey: 'claim_date',
      header: 'Fecha siniestro',
      cell: ({ row }) => {
        const date = row.original.claim_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'notification_date',
      header: 'Fecha notificación',
      cell: ({ row }) => {
        const date = row.original.notification_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'settlement_amount',
      header: 'Monto liquidación',
      cell: ({ row }) => {
        const amount = row.original.settlement_amount;
        if (amount === null || amount === undefined) return '-';
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
          case 'liquidado':
            variant = "default";
            break;
          case 'rechazado':
            variant = "destructive";
            break;
          case 'en proceso':
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
        const claim = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* TODO: Implement edit claim */}}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(claim)}
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
      title="Siniestros"
      subtitle="Gestione todos los siniestros de las pólizas"
      breadcrumbs={[{ text: 'Siniestros' }]}
      actions={
        <Button onClick={() => {/* TODO: Implement create claim */}}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Siniestro
        </Button>
      }
    >
      <DataTable 
        columns={columns} 
        data={claims} 
        searchKey="claim_number" 
        searchPlaceholder="Buscar por número de siniestro..."
      />
      
      {claimToDelete && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Confirmar Eliminación"
          description="¿Está seguro que desea eliminar el siniestro"
          itemIdentifier={claimToDelete.claim_number || 'seleccionado'}
          isDeleting={deleteClaimMutation.isPending}
          onDelete={() => deleteClaimMutation.mutate(claimToDelete.id)}
        />
      )}
    </CrudLayout>
  );
};

export default ClaimsPage;
