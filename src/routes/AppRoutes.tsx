
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import { UserRole } from '@/types/auth';

// Pages con lazy loading
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Landing = lazy(() => import('../pages/Landing'));

// Dashboards específicos por rol
const UserDashboard = lazy(() => import('../features/dashboard/user/UserDashboard'));
const AgentDashboard = lazy(() => import('../features/dashboard/agent/AgentDashboard'));
const AgencyDashboard = lazy(() => import('../features/dashboard/agency/AgencyDashboard'));
const AdminDashboard = lazy(() => import('../features/dashboard/admin/AdminDashboard'));

// Páginas de ejemplo para cada sección
const Placeholder = lazy(() => import('../components/common/Placeholder'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirección inteligente basada en autenticación y rol
  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/landing';
    
    switch (user?.role) {
      case 'CLIENTE':
        return '/usuario/dashboard';
      case 'AGENTE':
        return '/agente/dashboard';
      case 'AGENCIA':
        return '/agencia/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Ruta raíz con redirección inteligente */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
        
        {/* Rutas públicas */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas para CLIENTE */}
        <Route path="/usuario" element={<PrivateRoute allowedRoles={['CLIENTE', 'ADMIN']} />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="mis-polizas" element={<Placeholder title="Mis Pólizas" description="Visualiza y administra todas tus pólizas activas, vencidas y en proceso." />} />
          <Route path="siniestros" element={<Placeholder title="Siniestros" description="Reporta y da seguimiento a tus reclamaciones de siniestros." />} />
          <Route path="pagos" element={<Placeholder title="Pagos" description="Realiza pagos, consulta tu historial y programa pagos futuros." />} />
          <Route path="documentos" element={<Placeholder title="Documentos" description="Biblioteca digital con todos tus documentos importantes." />} />
          <Route path="cotizaciones" element={<Placeholder title="Cotizaciones" description="Solicita nuevas cotizaciones o revisa cotizaciones pendientes." />} />
        </Route>

        {/* Rutas para AGENTE */}
        <Route path="/agente" element={<PrivateRoute allowedRoles={['AGENTE', 'ADMIN']} />}>
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="clientes" element={<Placeholder title="Clientes" description="Gestiona tu cartera de clientes y prospectos." />} />
          <Route path="polizas" element={<Placeholder title="Pólizas" description="Administra todas las pólizas de tus clientes." />} />
          <Route path="siniestros" element={<Placeholder title="Siniestros" description="Seguimiento de siniestros reportados por tus clientes." />} />
          <Route path="ventas" element={<Placeholder title="Ventas" description="Consulta tus ventas realizadas y comisiones generadas." />} />
          <Route path="cobros" element={<Placeholder title="Cobros" description="Gestiona cobros pendientes y pagos recibidos." />} />
          <Route path="leads" element={<Placeholder title="Leads" description="Seguimiento a prospectos y oportunidades de venta." />} />
          <Route path="tareas" element={<Placeholder title="Tareas" description="Administra tus actividades diarias y pendientes." />} />
          <Route path="calendario" element={<Placeholder title="Calendario" description="Agenda de citas y recordatorios importantes." />} />
          <Route path="estadisticas" element={<Placeholder title="Estadísticas" description="Análisis de rendimiento y métricas clave." />} />
          <Route path="cotizaciones" element={<Placeholder title="Cotizaciones" description="Genera y administra cotizaciones para clientes." />} />
          <Route path="facturas" element={<Placeholder title="Facturas" description="Control de facturación y documentos fiscales." />} />
        </Route>

        {/* Rutas para AGENCIA */}
        <Route path="/agencia" element={<PrivateRoute allowedRoles={['AGENCIA', 'ADMIN']} />}>
          <Route path="dashboard" element={<AgencyDashboard />} />
          <Route path="clientes" element={<Placeholder title="Clientes" description="Base de datos completa de clientes de la agencia." />} />
          <Route path="polizas" element={<Placeholder title="Pólizas" description="Gestión centralizada de todas las pólizas." />} />
          <Route path="siniestros" element={<Placeholder title="Siniestros" description="Control y seguimiento de todos los siniestros reportados." />} />
          <Route path="ventas" element={<Placeholder title="Ventas" description="Control de ventas, renovaciones y métricas de negocio." />} />
          <Route path="cobros" element={<Placeholder title="Cobros" description="Sistema integral de cobros y pagos recibidos." />} />
          <Route path="leads" element={<Placeholder title="Leads" description="Administración de prospectos y oportunidades de venta." />} />
          <Route path="agentes" element={<Placeholder title="Agentes" description="Gestión de agentes y estructura organizacional." />} />
          <Route path="ramos" element={<Placeholder title="Ramos" description="Configuración de ramos y productos ofrecidos." />} />
          <Route path="aseguradoras" element={<Placeholder title="Aseguradoras" description="Relación con compañías aseguradoras y productos." />} />
          <Route path="estadisticas" element={<Placeholder title="Estadísticas" description="Análisis avanzado de rendimiento y KPIs." />} />
          <Route path="cotizaciones" element={<Placeholder title="Cotizaciones" description="Gestión centralizada de cotizaciones." />} />
          <Route path="archivos" element={<Placeholder title="Archivos" description="Repositorio digital de documentos." />} />
          <Route path="facturas" element={<Placeholder title="Facturas" description="Sistema de facturación y control contable." />} />
          <Route path="configuracion" element={<Placeholder title="Configuración" description="Ajustes generales del sistema." />} />
        </Route>

        {/* Rutas para ADMIN */}
        <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="vista-general" element={<AdminDashboard />} />
          <Route path="usuarios" element={<Placeholder title="Gestión de Usuarios" description="Administración centralizada de todos los usuarios del sistema." />} />
          <Route path="agencias" element={<Placeholder title="Gestión de Agencias" description="Control y configuración de las agencias registradas." />} />
          <Route path="agentes" element={<Placeholder title="Gestión de Agentes" description="Administración de agentes en toda la plataforma." />} />
          <Route path="roles" element={<Placeholder title="Gestión de Roles" description="Configuración de roles y permisos del sistema." />} />
          <Route path="permisos" element={<Placeholder title="Gestión de Permisos" description="Administración detallada de permisos por rol y usuario." />} />
          <Route path="logs" element={<Placeholder title="Logs del Sistema" description="Registro de todas las operaciones realizadas en la plataforma." />} />
          <Route path="backups" element={<Placeholder title="Copias de Seguridad" description="Sistema de respaldo y recuperación de datos." />} />
          <Route path="configuracion" element={<Placeholder title="Configuración del Sistema" description="Panel de configuración global de la plataforma." />} />
          <Route path="actividades" element={<Placeholder title="Registro de Actividades" description="Historial detallado de acciones de usuarios." />} />
          <Route path="sistema" element={<Placeholder title="Estado del Sistema" description="Monitoreo de estado y rendimiento del sistema." />} />
          <Route path="metricas/alertas" element={<Placeholder title="Alertas del Sistema" description="Centro de notificaciones de incidentes críticos." />} />
          <Route path="metricas/rendimiento" element={<Placeholder title="Rendimiento del Sistema" description="Análisis técnico de rendimiento y optimización." />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
