
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Policy, Task, Claim, Payment, Client } from '@/types/database';

const DashboardStats = () => {
  // Fetch policy counts by status
  const { data: policyCounts, isLoading: isLoadingPolicies } = useQuery({
    queryKey: ['policyCounts'],
    queryFn: async () => {
      // We use any type here since the Supabase types don't match our database
      const { count: quotations } = await supabase
        .from('policies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Cotización');
      
      const { count: inProcess } = await supabase
        .from('policies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'En expedición');
      
      const { count: toRenew } = await supabase
        .from('policies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Por renovar');
      
      const { count: expired } = await supabase
        .from('policies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Vencida');
      
      return {
        quotations: quotations || 0,
        inProcess: inProcess || 0,
        toRenew: toRenew || 0,
        expired: expired || 0
      };
    }
  });

  // Fetch task counts by due date and status
  const { data: taskCounts, isLoading: isLoadingTasks } = useQuery({
    queryKey: ['taskCounts'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
      
      const { count: overdue } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .lt('due_date', today)
        .eq('status', 'pending');
      
      const { count: todayTasks } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('due_date', today)
        .eq('status', 'pending');
      
      const { count: tomorrowTasks } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('due_date', tomorrow)
        .eq('status', 'pending');
      
      const { count: upcomingTasks } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .gt('due_date', tomorrow)
        .lte('due_date', nextWeek)
        .eq('status', 'pending');
      
      return {
        overdue: overdue || 0,
        today: todayTasks || 0,
        tomorrow: tomorrowTasks || 0,
        upcoming: upcomingTasks || 0
      };
    }
  });

  // Fetch active clients percentage
  const { data: clientStats, isLoading: isLoadingClients } = useQuery({
    queryKey: ['clientStats'],
    queryFn: async () => {
      const { count: totalClients } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });
      
      // For active clients, we need to check which clients have active policies
      // Since we can't directly use subqueries in RLS, we'll use a different approach
      const { data: activePolicies } = await supabase
        .from('policies')
        .select('client_id')
        .not('status', 'eq', 'Vencida');
      
      // Get unique client IDs from active policies
      const activeClientIds = new Set();
      activePolicies?.forEach(policy => {
        if (policy.client_id) activeClientIds.add(policy.client_id);
      });
      
      const activeClients = activeClientIds.size;
      
      return {
        total: totalClients || 0,
        active: activeClients || 0,
        percentage: totalClients ? Math.round((activeClients / totalClients) * 100) : 0
      };
    }
  });

  // Fetch pending claims
  const { data: pendingClaimsCount, isLoading: isLoadingClaims } = useQuery({
    queryKey: ['pendingClaims'],
    queryFn: async () => {
      const { count } = await supabase
        .from('claims')
        .select('*', { count: 'exact', head: true })
        .in('status', ['Pendiente', 'En proceso']);
      
      return count || 0;
    }
  });

  // Fetch overdue payments
  const { data: overduePaymentsAmount, isLoading: isLoadingPayments } = useQuery({
    queryKey: ['overduePayments'],
    queryFn: async () => {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      
      const { data } = await supabase
        .from('payments')
        .select('amount')
        .lt('due_date', ninetyDaysAgo.toISOString().split('T')[0])
        .eq('status', 'Pendiente');
      
      return data?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
    }
  });

  // Fetch upcoming birthdays
  const { data: upcomingBirthdays, isLoading: isLoadingBirthdays } = useQuery({
    queryKey: ['upcomingBirthdays'],
    queryFn: async () => {
      const today = new Date();
      const next5Days = new Date();
      next5Days.setDate(today.getDate() + 5);
      
      // Convert dates to MM-DD format for comparison
      const todayMMDD = (today.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                         today.getDate().toString().padStart(2, '0');
      
      const next5DaysMMDD = (next5Days.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                            next5Days.getDate().toString().padStart(2, '0');
      
      const { data } = await supabase
        .from('clients')
        .select('id, first_name, last_name, birthdate')
        .not('birthdate', 'is', null);
      
      if (!data) return [];
      
      // Filter clients with birthdays in the next 5 days
      return data.filter(client => {
        if (!client.birthdate) return false;
        
        const birthdate = new Date(client.birthdate);
        const birthdateMMDD = (birthdate.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                               birthdate.getDate().toString().padStart(2, '0');
        
        // Check if birthday falls within the next 5 days
        if (todayMMDD <= next5DaysMMDD) {
          // Normal case: both dates in same month
          return birthdateMMDD >= todayMMDD && birthdateMMDD <= next5DaysMMDD;
        } else {
          // Edge case: period spans across year boundary (December to January)
          return birthdateMMDD >= todayMMDD || birthdateMMDD <= next5DaysMMDD;
        }
      });
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Resumen de pólizas */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resumen de Pólizas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-600 text-2xl font-bold">{isLoadingPolicies ? '...' : policyCounts?.quotations}</p>
              <p className="text-gray-600">Cotizaciones</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-600 text-2xl font-bold">{isLoadingPolicies ? '...' : policyCounts?.inProcess}</p>
              <p className="text-gray-600">En expedición</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-orange-600 text-2xl font-bold">{isLoadingPolicies ? '...' : policyCounts?.toRenew}</p>
              <p className="text-gray-600">Por renovar</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 text-2xl font-bold">{isLoadingPolicies ? '...' : policyCounts?.expired}</p>
              <p className="text-gray-600">Vencidas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tareas */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tareas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 text-2xl font-bold">{isLoadingTasks ? '...' : taskCounts?.overdue}</p>
              <p className="text-gray-600">Vencidas</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 text-2xl font-bold">{isLoadingTasks ? '...' : taskCounts?.today}</p>
              <p className="text-gray-600">Para hoy</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-600 text-2xl font-bold">{isLoadingTasks ? '...' : taskCounts?.tomorrow}</p>
              <p className="text-gray-600">Para mañana</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600 text-2xl font-bold">{isLoadingTasks ? '...' : taskCounts?.upcoming}</p>
              <p className="text-gray-600">Próximamente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clientes activos */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Clientes Activos</h3>
          <div className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold text-hubseguros-600">
              {isLoadingClients ? '...' : `${clientStats?.percentage}%`}
            </div>
            <p className="text-gray-600 mt-2">
              ({isLoadingClients ? '...' : clientStats?.active} de {isLoadingClients ? '...' : clientStats?.total} clientes)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cumpleaños */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Próximos Cumpleaños</h3>
          {isLoadingBirthdays ? (
            <p className="text-gray-500">Cargando datos...</p>
          ) : upcomingBirthdays && upcomingBirthdays.length > 0 ? (
            <ul className="space-y-2">
              {upcomingBirthdays.slice(0, 5).map((client) => (
                <li key={client.id} className="border-b pb-2">
                  <p className="font-medium">{client.first_name} {client.last_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(client.birthdate!).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay cumpleaños próximos</p>
          )}
        </CardContent>
      </Card>

      {/* Siniestros pendientes */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Siniestros Pendientes</h3>
          <div className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold text-orange-500">
              {isLoadingClaims ? '...' : pendingClaimsCount}
            </div>
            <p className="text-gray-600 mt-2">Casos por gestionar</p>
          </div>
        </CardContent>
      </Card>

      {/* Cobros por recaudar */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cobros por Recaudar</h3>
          <div className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold text-red-600">
              {isLoadingPayments ? '...' : `$${overduePaymentsAmount.toLocaleString('es-CO')}`}
            </div>
            <p className="text-gray-600 mt-2">Más de 90 días</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
