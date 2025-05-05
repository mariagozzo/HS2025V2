
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Policy } from '@/types/database';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  policy_number: z.string().min(1, "Número de póliza es requerido"),
  client_id: z.string().optional(),
  insurance_company_id: z.string().optional(),
  insurance_branch_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  premium_value: z.coerce.number().optional(),
  status: z.string().optional(),
});

type PolicyFormValues = z.infer<typeof formSchema>;

interface PolicyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy?: Policy;
  onSuccess?: () => void;
}

const PolicyFormDialog = ({
  open,
  onOpenChange,
  policy,
  onSuccess
}: PolicyFormDialogProps) => {
  const isEditing = !!policy;
  
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policy_number: "",
      client_id: "",
      insurance_company_id: "",
      insurance_branch_id: "",
      start_date: "",
      end_date: "",
      premium_value: 0,
      status: "En trámite",
    }
  });

  // Fetch clients for dropdown
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from('clients') as any)
        .select('id, first_name, last_name')
        .order('last_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: open
  });

  // Fetch insurance companies for dropdown
  const { data: insuranceCompanies } = useQuery({
    queryKey: ['insuranceCompanies'],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from('insurance_companies') as any)
        .select('id, name')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: open
  });

  // Fetch insurance branches for dropdown
  const { data: insuranceBranches } = useQuery({
    queryKey: ['insuranceBranches'],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from('insurance_branches') as any)
        .select('id, name')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: open
  });

  // Create or update policy
  const mutation = useMutation({
    mutationFn: async (values: PolicyFormValues) => {
      let result;
      
      if (isEditing && policy) {
        // Update existing policy
        const { data, error } = await (supabase
          .from('policies') as any)
          .update(values)
          .eq('id', policy.id)
          .select();
          
        if (error) throw error;
        result = data;
      } else {
        // Create new policy
        const { data, error } = await (supabase
          .from('policies') as any)
          .insert([values])
          .select();
          
        if (error) throw error;
        result = data;
      }
      
      return result;
    },
    onSuccess: () => {
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al ${isEditing ? 'actualizar' : 'crear'} la póliza: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Set form values when editing
  useEffect(() => {
    if (policy) {
      form.reset({
        policy_number: policy.policy_number || "",
        client_id: policy.client_id || "",
        insurance_company_id: policy.insurance_company_id || "",
        insurance_branch_id: policy.insurance_branch_id || "",
        start_date: policy.start_date ? new Date(policy.start_date).toISOString().split('T')[0] : "",
        end_date: policy.end_date ? new Date(policy.end_date).toISOString().split('T')[0] : "",
        premium_value: policy.premium_value || 0,
        status: policy.status || "En trámite",
      });
    } else {
      form.reset({
        policy_number: "",
        client_id: "",
        insurance_company_id: "",
        insurance_branch_id: "",
        start_date: "",
        end_date: "",
        premium_value: 0,
        status: "En trámite",
      });
    }
  }, [policy, form]);

  const onSubmit = (values: PolicyFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Póliza' : 'Crear Nueva Póliza'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="policy_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Póliza*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el número de póliza" {...field} />
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
                  <FormControl>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">Seleccione un cliente</option>
                      {clients?.map((client: any) => (
                        <option key={client.id} value={client.id}>
                          {`${client.last_name}, ${client.first_name}`}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="insurance_company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aseguradora</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">Seleccione una aseguradora</option>
                        {insuranceCompanies?.map((company: any) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
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
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">Seleccione un ramo</option>
                        {insuranceBranches?.map((branch: any) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
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
                    <FormLabel>Fecha Inicio</FormLabel>
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
                    <FormLabel>Fecha Fin</FormLabel>
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
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="En trámite">En trámite</option>
                        <option value="Activa">Activa</option>
                        <option value="Por renovar">Por renovar</option>
                        <option value="Vencida">Vencida</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyFormDialog;
