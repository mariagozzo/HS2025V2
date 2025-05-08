import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, Database, Users, FileText, Coins, File, FileSearch, 
  LayoutDashboard, Book, ListTodo, Activity, Calendar, ArrowLeft, 
  ArrowRight, ChevronDown, Currency
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

type MenuCategory = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: {
    title: string;
    href: string;
  }[];
  expanded?: boolean;
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [categories, setCategories] = useState<MenuCategory[]>([
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    {
      title: "Configuración / Catálogos",
      icon: <Settings size={20} />,
      expanded: false,
      submenu: [
        { title: "Motivos estados póliza", href: "/config/motivos-poliza" },
        { title: "Tipo afiliación", href: "/config/tipo-afiliacion" },
        { title: "Mensajeros", href: "/config/mensajeros" },
        { title: "Coberturas", href: "/config/coberturas" },
        { title: "Importar Plantillas", href: "/config/importar-plantillas" },
      ]
    },
    {
      title: "Entidades principales",
      icon: <Database size={20} />,
      expanded: false,
      submenu: [
        { title: "Aseguradoras", href: "/entidades/aseguradoras" },
        { title: "Ramos", href: "/entidades/ramos" },
        { title: "Vendedores", href: "/entidades/vendedores" },
        { title: "Clientes", href: "/entidades/clientes" },
        { title: "Pólizas", href: "/entidades/polizas" },
        { title: "Pólizas de cumplimiento", href: "/entidades/polizas-cumplimiento" },
        { title: "Campos adicionales por tipo de póliza", href: "/entidades/campos-adicionales" },
        { title: "Anexos", href: "/entidades/anexos" },
        { title: "Cobros", href: "/entidades/cobros" },
        { title: "Vinculados pólizas colectivas", href: "/entidades/vinculados" },
        { title: "Beneficiarios", href: "/entidades/beneficiarios" },
        { title: "Asistente Comercial / Cotizador", href: "/entidades/cotizador" },
        { title: "Importar Siniestros", href: "/entidades/importar-siniestros" },
        { title: "Importar Amparos Siniestro", href: "/entidades/importar-amparos" },
        { title: "Tareas", href: "/entidades/tareas" },
        { title: "Importar datos adicionales", href: "/entidades/importar-datos" },
      ]
    },
    {
      title: "Módulo de Clientes",
      icon: <Users size={20} />,
      expanded: false,
      submenu: [
        { title: "Listado de Clientes", href: "/clientes/listado" },
        { title: "CRM", href: "/clientes/crm" },
      ]
    },
    {
      title: "Módulo de Pólizas",
      icon: <FileText size={20} />,
      expanded: false,
      submenu: [
        { title: "Listado de Pólizas", href: "/polizas/listado" },
        { title: "Cumplimiento, Judiciales", href: "/polizas/cumplimiento" },
        { title: "Remisiones", href: "/polizas/remisiones" },
        { title: "Tareas", href: "/polizas/tareas" },
      ]
    },
    {
      title: "Cobros",
      icon: <Coins size={20} />,
      expanded: location.pathname.startsWith('/cobros'),
      submenu: [
        { title: "Listado de pagos", href: "/cobros/pagos" },
        { title: "Recibos y Cuadre de Caja", href: "/cobros/recibos" },
        { title: "Liquidar vendedores", href: "/cobros/liquidar" },
        { title: "Gestión de Monedas", href: "/cobros/monedas" },
      ]
    },
    {
      title: "Informes",
      icon: <File size={20} />,
      expanded: location.pathname.startsWith('/informes'),
      submenu: [
        { title: "Informes generales", href: "/informes/generales" },
      ]
    },
    {
      title: "Archivos",
      icon: <File size={20} />,
      expanded: false,
      submenu: [
        { title: "Gestión de documentos", href: "/archivos/documentos" },
      ]
    },
    {
      title: "Siniestros",
      icon: <FileSearch size={20} />,
      expanded: false,
      submenu: [
        { title: "Registro y seguimiento", href: "/siniestros/registro" },
      ]
    },
    {
      title: "Facturas",
      icon: <FileText size={20} />,
      expanded: false,
      submenu: [
        { title: "Registro y consulta", href: "/facturas/registro" },
      ]
    },
    {
      title: "Configuración de Agencia",
      icon: <Settings size={20} />,
      expanded: false,
      submenu: [
        { title: "Usuarios", href: "/agencia/usuarios" },
        { title: "Información de agencia", href: "/agencia/informacion" },
        { title: "Sedes", href: "/agencia/sedes" },
        { title: "Aseguradoras", href: "/agencia/aseguradoras" },
        { title: "Ramos", href: "/agencia/ramos" },
        { title: "Vendedores", href: "/agencia/vendedores" },
        { title: "Estados Siniestros", href: "/agencia/estados-siniestros" },
        { title: "Estados ARL", href: "/agencia/estados-arl" },
        { title: "Motivos estado póliza", href: "/agencia/motivos-poliza" },
        { title: "Tipo afiliación", href: "/agencia/tipo-afiliacion" },
        { title: "Mensajeros", href: "/agencia/mensajeros" },
      ]
    },
  ]);

  const toggleSubmenu = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].expanded = !newCategories[index].expanded;
    setCategories(newCategories);
  };

  // Helper to check if a menu item is active
  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <aside className={cn(
      "bg-sidebar h-screen flex flex-col transition-all border-r",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        <Link to="/dashboard" className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-start"
        )}>
          {collapsed ? (
            <span className="font-bold text-2xl text-hubseguros-600">H</span>
          ) : (
            <span className="text-xl font-bold">Hub<span className="text-hubseguros-600">seguros</span></span>
          )}
        </Link>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2">
          {categories.map((category, index) => (
            <div key={index} className="mb-1">
              {category.href ? (
                <Link
                  to={category.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-gray-200",
                    isActive(category.href) && "bg-gray-800 text-white",
                    collapsed ? "justify-center" : "justify-between"
                  )}
                >
                  <span className="flex items-center">
                    {category.icon}
                    {!collapsed && <span className="ml-3">{category.title}</span>}
                  </span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={cn(
                      "w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-gray-200",
                      category.submenu?.some(item => isActive(item.href)) && "bg-gray-800 text-white",
                      collapsed ? "justify-center" : "justify-between"
                    )}
                  >
                    <span className="flex items-center">
                      {category.icon}
                      {!collapsed && <span className="ml-3">{category.title}</span>}
                    </span>
                    {!collapsed && category.submenu && (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          category.expanded ? "transform rotate-180" : ""
                        )}
                      />
                    )}
                  </button>
                  {!collapsed && category.expanded && category.submenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      {category.submenu.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.href}
                          className={cn(
                            "block py-1.5 px-3 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800",
                            isActive(item.href) && "bg-gray-800 text-white"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className={cn(
          "flex items-center text-sm text-gray-400",
          collapsed ? "justify-center" : "justify-start"
        )}>
          {collapsed ? (
            <span className="w-8 h-8 bg-hubseguros-600 rounded-full flex items-center justify-center text-white">
              A
            </span>
          ) : (
            <>
              <span className="w-8 h-8 bg-hubseguros-600 rounded-full flex items-center justify-center text-white mr-3">
                A
              </span>
              <div>
                <p className="text-gray-300 font-medium">Admin</p>
                <p className="text-gray-500 text-xs">admin@hubseguros.com</p>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
