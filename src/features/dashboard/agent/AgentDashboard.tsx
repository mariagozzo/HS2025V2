import { Link } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import TaskList from '@/components/dashboard/TaskList';
import { Users, Shield, ShoppingCart, AlertCircle } from 'lucide-react';

// Datos de ejemplo para el dashboard
const stats = [
  {
    title: "Clientes",
    value: "24",
    change: "activos",
    timeframe: "gestión de cartera",
    icon: <Users className="h-6 w-6" />,
    linkTo: "/agente/clientes"
  },
  {
    title: "Pólizas",
    value: "36",
    change: "activas",
    timeframe: "contratos vigentes",
    icon: <Shield className="h-6 w-6" />,
    linkTo: "/agente/polizas"
  },
  {
    title: "Ventas",
    value: "$12,500",
    change: "este mes",
    timeframe: "rendimiento comercial",
    icon: <ShoppingCart className="h-6 w-6" />,
    linkTo: "/agente/ventas"
  },
  {
    title: "Renovaciones",
    value: "5",
    change: "próximas a vencer",
    timeframe: "en los próximos 30 días",
    icon: <AlertCircle className="h-6 w-6" />,
    linkTo: "/agente/polizas"
  }
];

// Tareas pendientes de ejemplo
const pendingTasks = [
  { id: '1', title: 'Llamar a Juan Pérez', priority: 'alta' as 'alta', dueDate: 'Hoy', completed: false },
  { id: '2', title: 'Renovar póliza #12345', priority: 'alta' as 'alta', dueDate: 'Mañana', completed: false },
  { id: '3', title: 'Enviar cotización a María', priority: 'media' as 'media', dueDate: '25/05/2023', completed: true },
  { id: '4', title: 'Seguimiento de siniestro', priority: 'media' as 'media', dueDate: '25/05/2023', completed: false }
];

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Agente</h1>
        <p className="text-muted-foreground">Gestión de clientes, pólizas y ventas</p>
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
      
      {/* Clientes recientes y tareas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Clientes recientes */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Clientes Recientes</h2>
            <Link to="/agente/clientes" className="text-sm text-blue-700 hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="space-y-4">
            <Link to="/agente/clientes" className="block">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    RP
                  </div>
                  <div>
                    <div className="font-medium">Roberto Pérez</div>
                    <div className="text-sm text-gray-500">2 pólizas activas</div>
                  </div>
                </div>
                <div className="text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to="/agente/clientes" className="block">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    MG
                  </div>
                  <div>
                    <div className="font-medium">María González</div>
                    <div className="text-sm text-gray-500">1 póliza activa</div>
                  </div>
                </div>
                <div className="text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to="/agente/clientes" className="block">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium">
                    JL
                  </div>
                  <div>
                    <div className="font-medium">José López</div>
                    <div className="text-sm text-gray-500">3 pólizas activas</div>
                  </div>
                </div>
                <div className="text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Tareas pendientes */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tareas Pendientes</h2>
              <Link to="/agente/tareas" className="text-sm text-blue-700 hover:underline">
                Ver todas
              </Link>
            </div>
          </div>
          <TaskList tasks={pendingTasks} />
        </div>
      </div>

      {/* Calendario y oportunidades */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Próximos eventos */}
        <Link to="/agente/calendario" className="block">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-4">Próximos Eventos</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                  18
                </div>
                <div className="ml-4">
                  <div className="font-medium">Reunión con Cliente</div>
                  <div className="text-sm text-gray-500">10:00 AM - Roberto Pérez</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                  20
                </div>
                <div className="ml-4">
                  <div className="font-medium">Firma de Contrato</div>
                  <div className="text-sm text-gray-500">2:30 PM - María González</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Oportunidades de venta */}
        <Link to="/agente/leads" className="block">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-4">Oportunidades de Venta</h2>
            <div>
              <div className="flex items-center justify-between">
                <span>Leads sin contactar</span>
                <span className="font-bold">8</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span>Cotizaciones pendientes</span>
                <span className="font-bold">5</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span>Seguimientos programados</span>
                <span className="font-bold">12</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AgentDashboard;
