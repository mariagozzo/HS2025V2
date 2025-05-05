
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TasksList = () => {
  const tasks = [
    {
      id: 1,
      title: "Llamar a cliente para renovación",
      client: "María López",
      dueDate: "Hoy, 14:00",
      priority: "Alta",
      status: "Pendiente"
    },
    {
      id: 2,
      title: "Enviar cotización seguro hogar",
      client: "Carlos Rodríguez",
      dueDate: "Hoy, 16:30",
      priority: "Media",
      status: "Pendiente"
    },
    {
      id: 3,
      title: "Actualizar datos de póliza #54213",
      client: "Juan Pérez",
      dueDate: "Mañana, 10:00",
      priority: "Baja",
      status: "Pendiente"
    },
    {
      id: 4,
      title: "Verificar documentación siniestro",
      client: "Ana Gutiérrez",
      dueDate: "Vencida (Ayer)",
      priority: "Alta",
      status: "Atrasada"
    },
    {
      id: 5,
      title: "Cobrar cuota póliza de vida",
      client: "Luis Martínez",
      dueDate: "Vencida (3 días)",
      priority: "Alta",
      status: "Atrasada"
    }
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Media":
        return "bg-yellow-100 text-yellow-800";
      case "Baja":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "text-blue-600";
      case "Atrasada":
        return "text-red-600";
      case "Completada":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendiente":
        return <Clock className="h-4 w-4" />;
      case "Atrasada":
        return <AlertCircle className="h-4 w-4" />;
      case "Completada":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

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
          {tasks.map((task) => (
            <div key={task.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600">Cliente: {task.client}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-500">{task.dueDate}</span>
                </div>
                <div className={`flex items-center ${getStatusStyle(task.status)}`}>
                  {getStatusIcon(task.status)}
                  <span className="ml-1 text-sm">{task.status}</span>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <Button size="sm" variant="default" className="bg-hubseguros-600 hover:bg-hubseguros-700 w-full">
                  Completar
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  Posponer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
