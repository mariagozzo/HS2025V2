
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from '@tanstack/react-query';
import { fromTable } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Policy } from '@/types/database';
import { PolicyFormValues, policySchema } from '@/types/forms';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PolicyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: Policy | null;
  onSuccess?: () => void;
}

const PolicyFormDialog = ({
  open,
  onOpenChange,
  policy,
  onSuccess
}: PolicyFormDialogProps) => {
  const isEditMode = !!policy;
  
  const { data: clients = [] } = useQuery({
    queryKey: ['clients-for-form'],
    queryFn: async () => {
      const { data, error } = await fromTable('clients')
        .select('id, first_name, last_name')
        .order('last_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: insuranceCompanies = [] } = useQuery({
    queryKey: ['insurance-companies-for-form'],
    queryFn: async () => {
      const { data, error } = await fromTable('insurance_companies')
        .select('id, name')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: branches = [] } = useQuery({
    queryKey: ['insurance-branches-for-form'],
    queryFn: async () => {
      const { data, error } = await fromTable('insurance_branches')
        .select('id, name')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const { data: sellers = [] } = useQuery({
    queryKey: ['sellers-for-form'],
    queryFn: async () => {
      const { data, error } = await fromTable('sellers')
        .select('id, name')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: policy ? {
      policy_number: policy.policy_number,
      client_id: policy.client_id || '',
      insurance_company_id: policy.insurance_company_id || '',
      insurance_branch_id: policy.insurance_branch_id || '',
      seller_id: policy.seller_id || '',
      start_date: policy.start_date || '',
      end_date: policy.end_date || '',
      premium_value: policy.premium_value || 0,
      status: policy.status || '',
      status_reason_id: policy.status_reason_id || '',
      is_renewal: policy.is_renewal || false,
      parent_policy_id: policy.parent_policy_id || '',
      is_collective: policy.is_collective || false,
    } : {
      policy_number: '',
      client_id: '',
      insurance_company_id: '',
      insurance_branch_id: '',
      seller_id: '',
      start_date: '',
      end_date: '',
      premium_value: 0,
      status: 'Activa',
      status_reason_id: '',
      is_renewal: false,
      parent_policy_id: '',
      is_collective: false,
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (values: PolicyFormValues) => {
      if (isEditMode && policy) {
        const { error } = await fromTable('policies')
          .update(values)
          .eq('id', policy.id);
          
        if (error) throw error;
        return { ...policy, ...values };
      } else {
        const { data, error } = await fromTable('policies')
          .insert(values)
          .select();
          
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      toast({
        title: isEditMode ? "Póliza actualizada" : "Póliza creada",
        description: isEditMode 
          ? "La póliza ha sido actualizada exitosamente" 
          : "La póliza ha sido creada exitosamente",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al ${isEditMode ? 'actualizar' : 'crear'} la póliza: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: PolicyFormValues) => {
    // Convertir el valor de prima a número
    const processedValues = {
      ...values,
      premium_value: values.premium_value ? Number(values.premium_value) : null,
    };
    mutation.mutate(processedValues as any);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Póliza' : 'Nueva Póliza'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="policy_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Póliza</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.first_name} {client.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="insurance_company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aseguradora</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una aseguradora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {insuranceCompanies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="insurance_branch_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ramo</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un ramo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="premium_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Prima</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="seller_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendedor</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un vendedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sellers.map((seller) => (
                          <SelectItem key={seller.id} value={seller.id}>
                            {seller.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Activa">Activa</SelectItem>
                      <SelectItem value="Vencida">Vencida</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="is_renewal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Es Renovación</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_collective"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Es Colectiva</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyFormDialog;
