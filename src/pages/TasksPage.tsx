
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CrudLayout from '@/components/common/crud/CrudLayout';
import { Task } from '@/types/database';
import { fromTable } from '@/integrations/supabase/client';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteDialog from '@/components/common/crud/ConfirmDeleteDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

const TasksPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await fromTable<Task>('tasks')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await fromTable('tasks')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Tarea eliminada",
        description: "La tarea ha sido eliminada exitosamente",
      });
      setDeleteDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la tarea: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };
  
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Título',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) return '-';
        return description.length > 50 ? description.substring(0, 50) + '...' : description;
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
      accessorKey: 'assigned_to',
      header: 'Asignada a',
    },
    {
      accessorKey: 'priority',
      header: 'Prioridad',
      cell: ({ row }) => {
        const priority = row.original.priority;
        if (!priority) return '-';
        
        let variant: "default" | "secondary" | "destructive" | "outline" = "default";
        
        switch (priority.toLowerCase()) {
          case 'alta':
            variant = "destructive";
            break;
          case 'media':
            variant = "default";
            break;
          case 'baja':
            variant = "secondary";
            break;
          default:
            variant = "outline";
        }
        
        return <Badge variant={variant}>{priority}</Badge>;
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
          case 'completada':
            variant = "default";
            break;
          case 'en progreso':
            variant = "secondary";
            break;
          case 'pendiente':
            variant = "outline";
            break;
          case 'vencida':
            variant = "destructive";
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
        const task = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* TODO: Implement edit task */}}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(task)}
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
      title="Tareas"
      subtitle="Gestione todas las tareas y seguimientos"
      breadcrumbs={[{ text: 'Tareas' }]}
      actions={
        <Button onClick={() => {/* TODO: Implement create task */}}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      }
    >
      <DataTable 
        columns={columns} 
        data={tasks} 
        searchKey="title" 
        searchPlaceholder="Buscar por título..."
      />
      
      {taskToDelete && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Confirmar Eliminación"
          description="¿Está seguro que desea eliminar la tarea"
          itemIdentifier={taskToDelete.title}
          isDeleting={deleteTaskMutation.isPending}
          onDelete={() => deleteTaskMutation.mutate(taskToDelete.id)}
        />
      )}
    </CrudLayout>
  );
};

export default TasksPage;
