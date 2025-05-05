
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Client } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { fromTable } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import ConfirmDeleteDialog from '@/components/common/crud/ConfirmDeleteDialog';
import { format } from 'date-fns';

interface ClientsListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: () => void;
}

const ClientsList = ({ clients, onEdit, onDelete }: ClientsListProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  
  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await fromTable('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado exitosamente",
      });
      setDeleteDialogOpen(false);
      onDelete();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el cliente: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'identification_number',
      header: 'Identificación',
    },
    {
      accessorKey: 'first_name',
      header: 'Nombre',
    },
    {
      accessorKey: 'last_name',
      header: 'Apellido',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'birthdate',
      header: 'Fecha de nacimiento',
      cell: ({ row }) => {
        const birthdate = row.original.birthdate;
        if (!birthdate) return '-';
        try {
          return format(new Date(birthdate), 'dd/MM/yyyy');
        } catch {
          return birthdate;
        }
      }
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(client)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(client)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={clients} 
        searchKey="last_name" 
        searchPlaceholder="Buscar por apellido..."
      />
      
      {clientToDelete && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Confirmar Eliminación"
          description="¿Está seguro que desea eliminar el cliente"
          itemIdentifier={`${clientToDelete.first_name} ${clientToDelete.last_name}`}
          isDeleting={deleteClientMutation.isPending}
          onDelete={() => deleteClientMutation.mutate(clientToDelete.id)}
        />
      )}
    </div>
  );
};

export default ClientsList;
