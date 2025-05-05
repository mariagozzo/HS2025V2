
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search, ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Policy } from '@/types/database';
import { toast } from '@/components/ui/use-toast';

const RecentPolicies = () => {
  // Fetch policies from Supabase
  const { data: policies, isLoading, error } = useQuery({
    queryKey: ['recentPolicies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('policies')
        .select(`
          *,
          clients(first_name, last_name),
          insurance_companies(name),
          insurance_branches(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las pólizas",
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    }
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Por renovar":
        return "bg-yellow-100 text-yellow-800";
      case "En trámite":
        return "bg-blue-100 text-blue-800";
      case "Vencida":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pólizas recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500">Error al cargar los datos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pólizas recientes</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Nueva póliza
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Cargando pólizas...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="py-2 px-2 font-medium text-left">ID</th>
                  <th className="py-2 px-2 font-medium text-left">Cliente</th>
                  <th className="py-2 px-2 font-medium text-left">Aseguradora</th>
                  <th className="py-2 px-2 font-medium text-left">Tipo</th>
                  <th className="py-2 px-2 font-medium text-left">Estado</th>
                  <th className="py-2 px-2 font-medium text-left">Vencimiento</th>
                  <th className="py-2 px-2 font-medium text-right">Prima</th>
                  <th className="py-2 px-2 font-medium text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {policies && policies.length > 0 ? (
                  policies.map((policy: any) => (
                    <tr key={policy.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">{policy.policy_number}</td>
                      <td className="py-3 px-2 text-sm font-medium">
                        {policy.clients ? 
                          `${policy.clients.first_name} ${policy.clients.last_name}` : 
                          'Sin cliente'}
                      </td>
                      <td className="py-3 px-2 text-sm">{policy.insurance_companies?.name || '-'}</td>
                      <td className="py-3 px-2 text-sm">{policy.insurance_branches?.name || '-'}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(policy.status || 'Desconocido')}`}>
                          {policy.status || 'Desconocido'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm">{formatDate(policy.end_date)}</td>
                      <td className="py-3 px-2 text-sm text-right">{formatCurrency(policy.premium_value)}</td>
                      <td className="py-3 px-2">
                        <div className="flex justify-center space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Search className="h-4 w-4 text-gray-500" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-gray-500" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-4 text-center text-gray-500">
                      No hay pólizas recientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPolicies;
