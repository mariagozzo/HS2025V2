import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { fromPolicies } from '@/integrations/supabase/client';
import { Policy } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface PolicyDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: Policy;
}

const PolicyDetailsDialog = ({
  open,
  onOpenChange,
  policy,
}: PolicyDetailsDialogProps) => {
  // Fetch policy with related data
  const { data: policyDetails, isLoading } = useQuery({
    queryKey: ['policyDetail', policy.id],
    queryFn: async () => {
      const { data, error } = await fromPolicies()
        .select(`
          *,
          clients(id, first_name, last_name, email, phone, address),
          insurance_companies(id, name),
          insurance_branches(id, name)
        `)
        .eq('id', policy.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: open
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de Póliza</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : policyDetails ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Número de Póliza</p>
                <p className="text-base">{policyDetails.policy_number || '-'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Estado</p>
                <p className="text-base">{policyDetails.status || '-'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Fecha Inicio</p>
                <p className="text-base">{formatDate(policyDetails.start_date)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Fecha Fin</p>
                <p className="text-base">{formatDate(policyDetails.end_date)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Prima</p>
                <p className="text-base">{formatCurrency(policyDetails.premium_value)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Es Renovación</p>
                <p className="text-base">{policyDetails.is_renewal ? 'Sí' : 'No'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">Datos del Cliente</h4>
              {policyDetails.clients ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                    <p className="text-base">{`${policyDetails.clients.first_name || ''} ${policyDetails.clients.last_name || ''}`}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-base">{policyDetails.clients.email || '-'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <p className="text-base">{policyDetails.clients.phone || '-'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                    <p className="text-base">{policyDetails.clients.address || '-'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No hay información del cliente</p>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">Datos del Seguro</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Aseguradora</p>
                  <p className="text-base">{policyDetails.insurance_companies?.name || '-'}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Ramo</p>
                  <p className="text-base">{policyDetails.insurance_branches?.name || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-500">No se encontraron detalles de la póliza</p>
          </div>
        )}
        
        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDetailsDialog;
