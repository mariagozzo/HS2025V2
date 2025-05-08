import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Policy } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fromTable } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/admin/policies/DeleteConfirmDialog';
import PolicyDetailsDialog from '@/components/admin/policies/PolicyDetailsDialog';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface PoliciesListProps {
  policies: Policy[];
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (policy: Policy) => void;
  refetch?: () => void;
  onDelete?: () => void;
}

const PoliciesList = ({ 
  policies, 
  isLoading, 
  error, 
  onEdit, 
  refetch = () => {}, 
  onDelete = () => {} 
}: PoliciesListProps) => {
  const [viewingPolicy, setViewingPolicy] = useState<Policy | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<Policy | null>(null);
  
  const { data: clients = [] } = useQuery({
    queryKey: ['clients-for-policies'],
    queryFn: async () => {
      const { data, error } = await fromTable('clients')
        .select('id, first_name, last_name');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: insuranceCompanies = [] } = useQuery({
    queryKey: ['insurance-companies'],
    queryFn: async () => {
      const { data, error } = await fromTable('insurance_companies')
        .select('id, name');
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleViewDetails = (policy: Policy) => {
    setViewingPolicy(policy);
    setDetailsOpen(true);
  };

  const handleDeleteClick = (policy: Policy) => {
    setPolicyToDelete(policy);
    setDeleteDialogOpen(true);
  };

  const getClientName = (clientId: string | null) => {
    if (!clientId) return 'N/A';
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'N/A';
  };
  
  const getInsuranceName = (insuranceId: string | null) => {
    if (!insuranceId) return 'N/A';
    const company = insuranceCompanies.find(c => c.id === insuranceId);
    return company ? company.name : 'N/A';
  };

  const columns: ColumnDef<Policy>[] = [
    {
      accessorKey: 'policy_number',
      header: 'N° Póliza',
    },
    {
      id: 'client',
      header: 'Cliente',
      cell: ({ row }) => getClientName(row.original.client_id),
    },
    {
      id: 'insurance',
      header: 'Aseguradora',
      cell: ({ row }) => getInsuranceName(row.original.insurance_company_id),
    },
    {
      accessorKey: 'start_date',
      header: 'Fecha inicio',
      cell: ({ row }) => {
        const date = row.original.start_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'end_date',
      header: 'Fecha fin',
      cell: ({ row }) => {
        const date = row.original.end_date;
        if (!date) return '-';
        try {
          return format(new Date(date), 'dd/MM/yyyy');
        } catch {
          return date;
        }
      }
    },
    {
      accessorKey: 'premium_value',
      header: 'Prima',
      cell: ({ row }) => {
        const value = row.original.premium_value;
        if (value === null || value === undefined) return '-';
        return `$${value.toLocaleString('es-CO')}`;
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
          case 'activa':
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
        const policy = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewDetails(policy)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(policy)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(policy)}
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
        data={policies} 
        searchKey="policy_number" 
        searchPlaceholder="Buscar por número de póliza..."
      />
      
      {viewingPolicy && (
        <PolicyDetailsDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          policy={viewingPolicy}
        />
      )}
      
      {policyToDelete && (
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          policy={policyToDelete}
          onSuccess={() => {
            onDelete();
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default PoliciesList;
