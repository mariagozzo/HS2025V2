import { Check, Clock } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Revisar pólizas vencidas",
    completed: false,
    dueDate: "2025-05-17"
  },
  {
    id: 2,
    title: "Seguimiento de siniestros",
    completed: true,
    dueDate: "2025-05-16"
  }
];

export default function TaskList() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Tareas Pendientes</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                task.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {task.completed ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-500" />
                )}
              </div>
              <span className={`font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(task.dueDate).toLocaleDateString('es-ES')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
