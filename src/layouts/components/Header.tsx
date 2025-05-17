
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Breadcrumb {
  label: string;
  path: string;
}

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const newBreadcrumbs: Breadcrumb[] = [];
    let currentPath = '';

    if (pathSegments.length > 0) {
      // Primera parte (usuario, agente, agencia)
      const roleSegment = pathSegments[0];
      currentPath = `/${roleSegment}`;
      let roleLabel = '';

      switch (roleSegment) {
        case 'usuario':
          roleLabel = 'Cliente';
          break;
        case 'agente':
          roleLabel = 'Agente';
          break;
        case 'agencia':
          roleLabel = 'Agencia';
          break;
        default:
          roleLabel = roleSegment.charAt(0).toUpperCase() + roleSegment.slice(1);
      }

      newBreadcrumbs.push({ 
        label: roleLabel, 
        path: `/${roleSegment}/dashboard` 
      });

      // Secciones adicionales
      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        currentPath += `/${segment}`;
        
        // Formateamos el label para el breadcrumb
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        newBreadcrumbs.push({ label, path: currentPath });
      }

      // Establecer título de la página basado en el último segmento
      if (newBreadcrumbs.length > 0) {
        setPageTitle(newBreadcrumbs[newBreadcrumbs.length - 1].label);
      }
    }

    setBreadcrumbs(newBreadcrumbs);
  }, [location]);

  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="flex h-full items-center justify-between px-6">
        {/* Breadcrumbs */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink href={breadcrumb.path}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold text-hubseguros-dark mt-1">{pageTitle}</h1>
        </div>
        
        {/* Barra de búsqueda y acciones */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-9 rounded-full bg-gray-50"
            />
          </div>
          
          <Separator orientation="vertical" className="h-8" />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Mail size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <Separator orientation="vertical" className="h-8" />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-hubseguros-primary flex items-center justify-center text-white font-medium">
              {user?.name.charAt(0)}
            </div>
            <span className="font-medium text-sm hidden md:inline-block">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
