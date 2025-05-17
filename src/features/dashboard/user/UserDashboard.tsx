import { Link } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import TaskList from '@/components/dashboard/TaskList';
import { Shield, AlertCircle, CreditCard } from 'lucide-react';

// Datos de ejemplo para el dashboard
const stats = [
  {
    title: "Mis Pólizas",
    value: "2",
    change: "activas",
    timeframe: "último período",
    icon: <Shield className="h-6 w-6" />,
    linkTo: "/usuario/mis-polizas"
  },
  {
    title: "Siniestros",
    value: "0",
    change: "pendientes",
    timeframe: "sin siniestros",
    icon: <AlertCircle className="h-6 w-6" />,
    linkTo: "/usuario/siniestros"
  },
  {
    title: "Pagos",
    value: "15/06/2023",
    change: "próximo pago",
    timeframe: "período actual",
    icon: <CreditCard className="h-6 w-6" />,
    linkTo: "/usuario/pagos"
  }
];

// Tareas pendientes de ejemplo
const pendingTasks = [
  { id: '1', title: 'Renovación de póliza de auto', priority: 'alta' as 'alta', dueDate: '18/05/2023', completed: false },
  { id: '2', title: 'Completar información personal', priority: 'media' as 'media', dueDate: '22/05/2023', completed: false },
  { id: '3', title: 'Subir documentos de identidad', priority: 'baja' as 'baja', dueDate: '25/05/2023', completed: true },
  { id: '4', title: 'Confirmar cobertura adicional', priority: 'media' as 'media', dueDate: '01/06/2023', completed: false }
];

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Usuario</h1>
        <p className="text-muted-foreground">Bienvenido a tu panel de control personalizado</p>
      </div>
      
      {/* Estadísticas principales */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.linkTo}>
            <DashboardCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              timeframe={stat.timeframe}
              icon={stat.icon}
            />
          </Link>
        ))}
      </div>

      {/* Sección de pólizas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mis Pólizas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/usuario/mis-polizas" className="block">
            <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">Póliza de Automóvil</h3>
                  <p className="text-gray-500 text-sm">Premium</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activa</div>
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Número:</span>
                  <span className="font-medium">POL-AUTO-12345</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Vencimiento:</span>
                  <span className="font-medium">12/12/2023</span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/usuario/mis-polizas" className="block">
            <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">Póliza de Hogar</h3>
                  <p className="text-gray-500 text-sm">Básica</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activa</div>
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Número:</span>
                  <span className="font-medium">POL-HOG-54321</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Vencimiento:</span>
                  <span className="font-medium">03/09/2023</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Tareas pendientes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tareas Pendientes</h2>
        <div className="bg-white border rounded-lg shadow-sm">
          <TaskList tasks={pendingTasks} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
