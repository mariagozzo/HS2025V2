
import { UserRole } from '../types/auth';
import { 
  BarChart4, 
  AlertCircle, 
  CreditCard, 
  FileText, 
  Calculator, 
  Users, 
  Shield, 
  ShoppingCart, 
  UserPlus, 
  CheckSquare, 
  Calendar, 
  PieChart, 
  Folder, 
  GitBranch, 
  Building, 
  Settings,
  LayoutDashboard,
  KeyRound,
  ClipboardList,
  Database,
  Bell,
  Contact
} from "lucide-react";

export interface MenuItem {
  key: string;
  label: string;
  icon: typeof BarChart4;
  path: string;
  notificationCount?: number;
  tooltip?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface RouteConfig {
  path: string;
  sections: MenuSection[];
}

// Configuración de rutas para el rol de usuario (CLIENTE)
export const userRoutes: RouteConfig = {
  path: '/usuario/dashboard',
  sections: [
    {
      title: 'PRINCIPALES',
      items: [
        { 
          key: 'mis-polizas', 
          label: 'Mis Pólizas', 
          icon: Shield, 
          path: '/usuario/mis-polizas',
          tooltip: 'Administra tus pólizas contratadas'
        },
        { 
          key: 'siniestros', 
          label: 'Siniestros', 
          icon: AlertCircle, 
          path: '/usuario/siniestros',
          tooltip: 'Reporta y da seguimiento a tus siniestros'
        },
        { 
          key: 'pagos', 
          label: 'Pagos', 
          icon: CreditCard, 
          path: '/usuario/pagos',
          tooltip: 'Realiza y administra tus pagos'
        },
        { 
          key: 'notificaciones', 
          label: 'Notificaciones', 
          icon: Bell, 
          path: '/usuario/notificaciones',
          notificationCount: 3,
          tooltip: 'Centro de notificaciones'
        }
      ]
    },
    {
      title: 'GESTIÓN',
      items: [
        { 
          key: 'documentos', 
          label: 'Documentos', 
          icon: FileText, 
          path: '/usuario/documentos',
          tooltip: 'Accede a tus documentos importantes' 
        },
        { 
          key: 'cotizaciones', 
          label: 'Cotizaciones', 
          icon: Calculator, 
          path: '/usuario/cotizaciones',
          tooltip: 'Solicita cotizaciones de seguros'
        },
        { 
          key: 'contacto-soporte', 
          label: 'Contacto con Soporte', 
          icon: Contact, 
          path: '/usuario/contacto-soporte',
          tooltip: 'Contacta con nuestro equipo de soporte'
        }
      ]
    }
  ]
};

// Configuración de rutas para el rol de agente
export const agentRoutes: RouteConfig = {
  path: '/agente/dashboard',
  sections: [
    {
      title: 'PRINCIPALES',
      items: [
        { 
          key: 'clientes', 
          label: 'Clientes', 
          icon: Users, 
          path: '/agente/clientes',
          tooltip: 'Administra tu cartera de clientes'
        },
        { 
          key: 'polizas', 
          label: 'Pólizas', 
          icon: Shield, 
          path: '/agente/polizas',
          tooltip: 'Gestiona las pólizas de tus clientes'
        },
        { 
          key: 'siniestros', 
          label: 'Siniestros', 
          icon: AlertCircle, 
          path: '/agente/siniestros',
          tooltip: 'Seguimiento de siniestros reportados'
        },
        { 
          key: 'ventas', 
          label: 'Ventas', 
          icon: ShoppingCart, 
          path: '/agente/ventas',
          tooltip: 'Administra tus ventas y comisiones'
        },
        { 
          key: 'cobros', 
          label: 'Cobros', 
          icon: CreditCard, 
          path: '/agente/cobros',
          tooltip: 'Gestiona cobros y pagos pendientes'
        },
        { 
          key: 'notificaciones', 
          label: 'Notificaciones', 
          icon: Bell, 
          path: '/agente/notificaciones',
          notificationCount: 5,
          tooltip: 'Centro de notificaciones'
        }
      ]
    },
    {
      title: 'GESTIÓN',
      items: [
        { 
          key: 'leads', 
          label: 'Leads', 
          icon: UserPlus, 
          path: '/agente/leads',
          tooltip: 'Administra tus prospectos de clientes'
        },
        { 
          key: 'tareas', 
          label: 'Tareas', 
          icon: CheckSquare, 
          path: '/agente/tareas',
          tooltip: 'Gestiona tus tareas pendientes',
          notificationCount: 3
        },
        { 
          key: 'calendario', 
          label: 'Calendario', 
          icon: Calendar, 
          path: '/agente/calendario',
          tooltip: 'Organiza tus citas y recordatorios'
        }
      ]
    },
    {
      title: 'REPORTES',
      items: [
        { 
          key: 'estadisticas', 
          label: 'Estadísticas', 
          icon: BarChart4, 
          path: '/agente/estadisticas',
          tooltip: 'Visualiza tus indicadores de desempeño'
        },
        { 
          key: 'cotizaciones', 
          label: 'Cotizaciones', 
          icon: FileText, 
          path: '/agente/cotizaciones',
          tooltip: 'Administra tus cotizaciones',
          notificationCount: 2
        },
        { 
          key: 'facturas', 
          label: 'Facturas', 
          icon: FileText, 
          path: '/agente/facturas',
          tooltip: 'Gestiona tus facturas y comprobantes'
        }
      ]
    }
  ]
};

// Configuración de rutas para el rol de agencia
export const agencyRoutes: RouteConfig = {
  path: '/agencia/dashboard',
  sections: [
    {
      title: 'PRINCIPALES',
      items: [
        { 
          key: 'clientes', 
          label: 'Clientes', 
          icon: Users, 
          path: '/agencia/clientes',
          tooltip: 'Administra la cartera de clientes'
        },
        { 
          key: 'polizas', 
          label: 'Pólizas', 
          icon: Shield, 
          path: '/agencia/polizas',
          tooltip: 'Gestión centralizada de pólizas'
        },
        { 
          key: 'siniestros', 
          label: 'Siniestros', 
          icon: AlertCircle, 
          path: '/agencia/siniestros',
          tooltip: 'Seguimiento de siniestros reportados'
        },
        { 
          key: 'ventas', 
          label: 'Ventas', 
          icon: ShoppingCart, 
          path: '/agencia/ventas',
          tooltip: 'Control de ventas y comisiones'
        },
        { 
          key: 'cobros', 
          label: 'Cobros', 
          icon: CreditCard, 
          path: '/agencia/cobros',
          tooltip: 'Administración de cobros y pagos'
        },
        { 
          key: 'notificaciones', 
          label: 'Notificaciones', 
          icon: Bell, 
          path: '/agencia/notificaciones',
          notificationCount: 7,
          tooltip: 'Centro de notificaciones'
        }
      ]
    },
    {
      title: 'GESTIÓN',
      items: [
        { 
          key: 'leads', 
          label: 'Leads', 
          icon: UserPlus, 
          path: '/agencia/leads',
          tooltip: 'Gestión de prospectos' 
        },
        { 
          key: 'agentes', 
          label: 'Agentes', 
          icon: Users, 
          path: '/agencia/agentes',
          tooltip: 'Administra tu fuerza de ventas',
          notificationCount: 1
        },
        { 
          key: 'ramos', 
          label: 'Ramos', 
          icon: GitBranch, 
          path: '/agencia/ramos',
          tooltip: 'Configuración de ramos de seguros'
        },
        { 
          key: 'aseguradoras', 
          label: 'Aseguradoras', 
          icon: Building, 
          path: '/agencia/aseguradoras',
          tooltip: 'Gestiona las compañías aseguradoras'
        },
        { 
          key: 'tareas', 
          label: 'Tareas', 
          icon: CheckSquare, 
          path: '/agencia/tareas',
          tooltip: 'Gestiona tus tareas pendientes'
        },
        { 
          key: 'calendario', 
          label: 'Calendario', 
          icon: Calendar, 
          path: '/agencia/calendario',
          tooltip: 'Organiza tus citas y recordatorios'
        }
      ]
    },
    {
      title: 'REPORTES',
      items: [
        { 
          key: 'estadisticas', 
          label: 'Estadísticas', 
          icon: PieChart, 
          path: '/agencia/estadisticas',
          tooltip: 'Análisis de rendimiento y KPIs'
        },
        { 
          key: 'cotizaciones', 
          label: 'Cotizaciones', 
          icon: FileText, 
          path: '/agencia/cotizaciones',
          tooltip: 'Gestión de cotizaciones',
          notificationCount: 5
        },
        { 
          key: 'archivos', 
          label: 'Archivos', 
          icon: Folder, 
          path: '/agencia/archivos',
          tooltip: 'Repositorio de archivos y documentos'
        },
        { 
          key: 'facturas', 
          label: 'Facturas', 
          icon: FileText, 
          path: '/agencia/facturas',
          tooltip: 'Control de facturación'
        }
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { 
          key: 'configuracion', 
          label: 'Configuración', 
          icon: Settings, 
          path: '/agencia/configuracion',
          tooltip: 'Configuración general del sistema'
        }
      ]
    }
  ]
};

// Configuración de rutas para el rol de administrador
export const adminRoutes: RouteConfig = {
  path: '/admin/dashboard',
  sections: [
    {
      title: 'PRINCIPALES',
      items: [
        { 
          key: 'vista-general', 
          label: 'Vista General', 
          icon: LayoutDashboard, 
          path: '/admin/vista-general',
          tooltip: 'Panel general de la plataforma'
        },
        { 
          key: 'usuarios', 
          label: 'Usuarios', 
          icon: Users, 
          path: '/admin/usuarios',
          tooltip: 'Gestión de usuarios del sistema'
        },
        { 
          key: 'agencias', 
          label: 'Agencias', 
          icon: Building, 
          path: '/admin/agencias',
          tooltip: 'Administración de agencias',
          notificationCount: 2
        },
        { 
          key: 'agentes', 
          label: 'Agentes', 
          icon: Users, 
          path: '/admin/agentes',
          tooltip: 'Administración de agentes',
          notificationCount: 3
        },
        { 
          key: 'notificaciones', 
          label: 'Notificaciones', 
          icon: Bell, 
          path: '/admin/notificaciones',
          notificationCount: 10,
          tooltip: 'Centro de notificaciones'
        }
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { 
          key: 'roles', 
          label: 'Roles', 
          icon: KeyRound, 
          path: '/admin/roles',
          tooltip: 'Gestión de roles y permisos'
        },
        { 
          key: 'permisos', 
          label: 'Permisos', 
          icon: ClipboardList, 
          path: '/admin/permisos',
          tooltip: 'Configuración de permisos del sistema'
        },
        { 
          key: 'logs', 
          label: 'Logs del Sistema', 
          icon: FileText, 
          path: '/admin/logs',
          tooltip: 'Registro de actividades del sistema'
        },
        { 
          key: 'backups', 
          label: 'Copias de Seguridad', 
          icon: Database, 
          path: '/admin/backups',
          tooltip: 'Gestión de backups del sistema'
        },
        { 
          key: 'configuracion', 
          label: 'Configuración', 
          icon: Settings, 
          path: '/admin/configuracion',
          tooltip: 'Configuración general de la plataforma'
        }
      ]
    },
  ]
};

export const getRoutesByRole = (role: UserRole): RouteConfig => {
  switch (role) {
    case 'CLIENTE':
      return userRoutes;
    case 'AGENTE':
      return agentRoutes;
    case 'AGENCIA':
      return agencyRoutes;
    case 'ADMIN':
      return adminRoutes;
    default:
      return adminRoutes; // Por defecto, si es ADMIN mostramos la vista de administrador
  }
};
