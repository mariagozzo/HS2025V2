import { Link } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import TaskList from '@/components/dashboard/TaskList';
import { BarChart4, Users, Shield, ShoppingCart } from 'lucide-react';

// Datos de ejemplo para el dashboard
const stats = [
  {
    title: "Ventas Totales",
    value: "$245,340",
    change: "+12% vs mes anterior",
    timeframe: "Todos los canales",
    icon: <ShoppingCart className="h-6 w-6" />,
    linkTo: "/agencia/ventas"
  },
  {
    title: "Agentes",
    value: "12",
    change: "Agentes activos",
    timeframe: "Equipo comercial",
    icon: <Users className="h-6 w-6" />,
    linkTo: "/agencia/agentes"
  },
  {
    title: "Clientes",
    value: "342",
    change: "+8 nuevos este mes",
    timeframe: "Base total",
    icon: <Users className="h-6 w-6" />,
    linkTo: "/agencia/clientes"
  },
  {
    title: "Pólizas",
    value: "524",
    change: "Valor: $3.2M",
    timeframe: "Total vigentes",
    icon: <Shield className="h-6 w-6" />,
    linkTo: "/agencia/polizas"
  }
];

// Tareas pendientes de ejemplo
const pendingTasks = [
  { id: '1', title: 'Revisión de rendimiento de agentes', priority: 'alta' as 'alta', dueDate: 'Hoy', completed: false },
  { id: '2', title: 'Llamada con aseguradora', priority: 'alta' as 'alta', dueDate: 'Mañana', completed: false },
  { id: '3', title: 'Preparar reporte mensual', priority: 'media' as 'media', dueDate: '25/05/2023', completed: true },
  { id: '4', title: 'Revisar comisiones pendientes', priority: 'baja' as 'baja', dueDate: '28/05/2023', completed: false }
];

const AgencyDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel Ejecutivo</h1>
        <p className="text-muted-foreground">Administración de agencia y rendimiento general</p>
      </div>
      
      {/* Estadísticas principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      
      {/* Rendimiento de ventas y estado de metas */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Gráfico de rendimiento */}
        <Link to="/agencia/estadisticas" className="md:col-span-2 block">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Rendimiento de Ventas</h2>
              <div className="flex items-center text-sm text-gray-500">
                <span>Últimos 6 meses</span>
                <BarChart4 className="ml-2 h-4 w-4" />
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between">
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '40%' }}></div>
                <span className="text-xs mt-2">Ene</span>
              </div>
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '65%' }}></div>
                <span className="text-xs mt-2">Feb</span>
              </div>
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '50%' }}></div>
                <span className="text-xs mt-2">Mar</span>
              </div>
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '75%' }}></div>
                <span className="text-xs mt-2">Abr</span>
              </div>
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '60%' }}></div>
                <span className="text-xs mt-2">May</span>
              </div>
              <div className="h-full flex flex-col justify-end items-center">
                <div className="w-10 bg-blue-700 rounded-t-md" style={{ height: '90%' }}></div>
                <span className="text-xs mt-2">Jun</span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Estado de metas */}
        <Link to="/agencia/estadisticas" className="block">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-6">Metas Trimestrales</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Ventas</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-700 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nuevos Clientes</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-700 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Retención</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-700 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Satisfacción</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-700 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Agentes destacados y tareas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Agentes destacados */}
        <Link to="/agencia/agentes" className="block">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Agentes Destacados</h2>
              <span className="text-sm text-gray-500">Este mes</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    AC
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Ana Castro</div>
                    <div className="text-sm text-gray-500">15 ventas</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">$45,290</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    MR
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Miguel Rodríguez</div>
                    <div className="text-sm text-gray-500">12 ventas</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">$38,450</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    LV
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Laura Vega</div>
                    <div className="text-sm text-gray-500">10 ventas</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">$32,780</div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Tareas pendientes */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tareas Pendientes</h2>
              <Link to="/agencia/tareas" className="text-sm text-blue-700 hover:underline">
                Ver todas
              </Link>
            </div>
          </div>
          <TaskList tasks={pendingTasks} />
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
