import { Link } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import TaskList from '@/components/dashboard/TaskList';
import { 
  Users, 
  Building, 
  Settings, 
  Shield, 
  BarChart4,
  AlertCircle,
  Clock
} from 'lucide-react';

// Datos de ejemplo para el panel de administración
const stats = [
  {
    title: "Total Usuarios",
    value: "1,248",
    change: "+2.5%",
    timeframe: "del mes pasado",
    icon: <Users className="h-6 w-6" />,
    linkTo: "/admin/usuarios"
  },
  {
    title: "Agentes",
    value: "324",
    change: "+15%",
    timeframe: "del mes pasado",
    icon: <Users className="h-6 w-6" />,
    linkTo: "/admin/agentes"
  },
  {
    title: "Agencias",
    value: "42",
    change: "+7%",
    timeframe: "del mes pasado",
    icon: <Building className="h-6 w-6" />,
    linkTo: "/admin/agencias"
  },
  {
    title: "Pólizas",
    value: "3,642",
    change: "+12%",
    timeframe: "del mes pasado",
    icon: <Shield className="h-6 w-6" />,
    linkTo: "/admin/polizas"
  }
];

// Actividades recientes
const recentActivities = [
  {
    id: 1,
    user: {
      name: "Carlos Méndez",
      avatar: "C"
    },
    action: "agregó una nueva póliza",
    time: "hace 5 minutos"
  },
  {
    id: 2,
    user: {
      name: "Agencia ABC",
      avatar: "A"
    },
    action: "registró un nuevo agente",
    time: "hace 15 minutos"
  },
  {
    id: 3,
    user: {
      name: "María García",
      avatar: "M"
    },
    action: "actualizó su perfil",
    time: "hace 45 minutos"
  },
  {
    id: 4,
    user: {
      name: "Juan López",
      avatar: "J"
    },
    action: "reportó un siniestro",
    time: "hace 1 hora"
  }
];

// Estado del sistema
const systemStatus = [
  { name: "Base de datos", status: "Operativa" },
  { name: "Autenticación", status: "Operativa" },
  { name: "Almacenamiento", status: "Operativa" },
  { name: "API", status: "Operativa" }
];

// Tareas pendientes
const pendingTasks = [
  { 
    id: "1", 
    title: "Revisar usuarios inactivos", 
    priority: 'alta' as 'alta', 
    dueDate: "Hoy", 
    completed: false 
  },
  { 
    id: "2", 
    title: "Aprobar solicitudes de agentes", 
    priority: 'media' as 'media', 
    dueDate: "Mañana", 
    completed: false 
  },
  { 
    id: "3", 
    title: "Actualizar permisos de sistema", 
    priority: 'baja' as 'baja', 
    dueDate: "25/05/2023", 
    completed: true 
  },
  { 
    id: "4", 
    title: "Revisar logs de errores", 
    priority: 'alta' as 'alta', 
    dueDate: "25/05/2023", 
    completed: false 
  }
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Bienvenido, Admin. Gestiona todos los aspectos de la plataforma.</p>
      </div>

      {/* Tabs de navegación rápida */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {["Vista General", "Usuarios", "Agencias", "Agentes", "Configuración"].map((tab) => (
          <Link
            key={tab}
            to={`/admin/${tab.toLowerCase().replace(" ", "-")}`}
            className={`px-4 py-2 rounded-md ${
              tab === "Vista General" 
                ? "bg-blue-700 text-white" 
                : "hover:bg-blue-50"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link to={stat.linkTo} key={index}>
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

      {/* Actividad reciente y estado del sistema */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Actividad Reciente - 2/3 del ancho */}
        <div className="md:col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Actividad Reciente</h2>
            <span className="text-sm text-gray-500">Últimas actividades registradas en la plataforma</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="py-3 flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                  {activity.user.avatar}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/admin/actividades" 
            className="mt-4 text-sm text-blue-700 hover:underline flex items-center justify-end"
          >
            Ver todas las actividades <Clock className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Estado del Sistema - 1/3 del ancho */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Estado del Sistema</h2>
          <p className="text-sm text-gray-500 mb-4">Rendimiento y métricas</p>
          
          <div className="space-y-4">
            {systemStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    item.status === "Operativa" ? "bg-green-500" : "bg-red-500"
                  }`}></span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className={`text-xs font-medium ${
                  item.status === "Operativa" ? "text-green-500" : "text-red-500"
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
          
          <Link 
            to="/admin/sistema" 
            className="mt-6 text-sm text-blue-700 hover:underline flex items-center justify-end"
          >
            Ver detalles <Settings className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Tareas pendientes y métricas */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Tareas Pendientes */}
        <div className="md:col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tareas Pendientes</h2>
            <Link to="/admin/tareas" className="text-sm text-blue-700 hover:underline">
              Ver todas
            </Link>
          </div>
          
          <TaskList tasks={pendingTasks} />
        </div>

        {/* Métricas Rápidas */}
        <div className="space-y-6">
          <Link to="/admin/metricas/alertas">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Alertas Activas</h3>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold mt-2">3</p>
              <p className="text-xs text-gray-500 mt-1">2 críticas, 1 advertencia</p>
            </div>
          </Link>
          
          <Link to="/admin/metricas/rendimiento">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Rendimiento</h3>
                <BarChart4 className="h-5 w-5 text-blue-700" />
              </div>
              <p className="text-2xl font-bold mt-2">92%</p>
              <p className="text-xs text-green-600 mt-1">+5% respecto al mes anterior</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
