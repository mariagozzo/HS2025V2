
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromTable, fromTasks, supabase } from "@/integrations/supabase/client";
import { Task } from '@/types/database';
import { toast } from '@/components/ui/use-toast';

const TasksList = () => {
  // Fetch tasks from Supabase
  const { data: tasks, isLoading, error, refetch } = useQuery({
    queryKey: ['pendingTasks'],
    queryFn: async () => {
      // Use the fromTasks helper instead of direct fromTable
      const { data, error } = await fromTasks()
        .select('*, users_profiles(full_name)')
        .eq('status', 'pending')
        .order('due_date', { ascending: true })
        .limit(5);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });

  const completeTask = async (taskId: string) => {
    // Use fromTasks helper instead
    const { error } = await fromTasks()
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', taskId);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la tarea. Intente de nuevo.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Tarea completada",
      description: "La tarea ha sido marcada como completada.",
    });
    
    refetch();
  };

  const postponeTask = async (taskId: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const { error } = await (supabase
      .from('tasks') as any)
      .update({ 
        due_date: tomorrow.toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo posponer la tarea. Intente de nuevo.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Tarea pospuesta",
      description: "La tarea ha sido pospuesta para mañana.",
    });
    
    refetch();
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "alta":
      case "Alta":
        return "bg-red-100 text-red-800";
      case "media":
      case "Media":
        return "bg-yellow-100 text-yellow-800";
      case "baja":
      case "Baja":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
      case "Pendiente":
        return "text-blue-600";
      case "atrasada":
      case "Atrasada":
        return "text-red-600";
      case "completed":
      case "Completada":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "Pendiente":
        return <Clock className="h-4 w-4" />;
      case "atrasada":
      case "Atrasada":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
      case "Completada":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskStatus = (task: any): string => {
    if (task.status === 'completed') return 'Completada';
    
    if (task.due_date) {
      const dueDate = new Date(task.due_date);
      dueDate.setHours(23, 59, 59, 999); // End of the day
      
      if (dueDate < new Date()) {
        return 'Atrasada';
      }
    }
    
    return 'Pendiente';
  };

  const formatDueDate = (dueDate: string | null): string => {
    if (!dueDate) return 'Sin fecha';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const taskDueDate = new Date(dueDate);
    taskDueDate.setHours(0, 0, 0, 0);
    
    if (taskDueDate.getTime() === today.getTime()) {
      return 'Hoy';
    } else if (taskDueDate.getTime() === tomorrow.getTime()) {
      return 'Mañana';
    } else if (taskDueDate.getTime() === yesterday.getTime()) {
      return 'Ayer';
    } else if (taskDueDate < today) {
      const diffTime = Math.abs(today.getTime() - taskDueDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Vencida (${diffDays} días)`;
    } else {
      return new Date(dueDate).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short'
      });
    }
  };

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tareas pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500">Error al cargar las tareas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Tareas pendientes</CardTitle>
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center p-4">
              <p className="text-gray-500">Cargando tareas...</p>
            </div>
          ) : tasks && tasks.length > 0 ? (
            tasks.map((task: any) => {
              const taskStatus = getTaskStatus(task);
              
              return (
                <div key={task.id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600">
                        {task.users_profiles?.full_name && `Asignado a: ${task.users_profiles.full_name}`}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-gray-500">{formatDueDate(task.due_date)}</span>
                    </div>
                    <div className={`flex items-center ${getStatusStyle(taskStatus)}`}>
                      {getStatusIcon(taskStatus)}
                      <span className="ml-1 text-sm">{taskStatus}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="bg-hubseguros-600 hover:bg-hubseguros-700 w-full"
                      onClick={() => completeTask(task.id)}
                    >
                      Completar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => postponeTask(task.id)}
                    >
                      Posponer
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500">No hay tareas pendientes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
