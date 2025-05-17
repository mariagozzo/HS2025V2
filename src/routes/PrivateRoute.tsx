
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth';
import { MainLayout } from '../layouts/MainLayout';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
  requiresAuthentication?: boolean;
}

const PrivateRoute = ({ 
  allowedRoles = [],
  requiresAuthentication = true
}: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Informar al usuario sobre su contexto actual cuando entra en una ruta protegida
    if (isAuthenticated && user) {
      const roleText = {
        'CLIENTE': 'cliente',
        'AGENTE': 'agente de seguros',
        'AGENCIA': 'agencia',
        'ADMIN': 'administrador'
      }[user.role];

      toast({
        title: `Bienvenido, ${user.name}`,
        description: `Has iniciado sesión como ${roleText}. Tu panel ha sido adaptado a tu rol.`,
      });
    }
  }, [isAuthenticated, user]);

  // Si se requiere autenticación y el usuario no está autenticado, redirige al login
  if (requiresAuthentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles permitidos y el usuario no tiene el rol adecuado
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    toast({
      variant: "destructive",
      title: "Acceso restringido",
      description: `No tienes permisos para acceder a esta sección. Serás redirigido al panel correspondiente a tu rol.`,
    });
    
    // Redirigir al dashboard correspondiente según el rol
    switch (user.role) {
      case 'CLIENTE':
        return <Navigate to="/usuario/dashboard" replace />;
      case 'AGENTE':
        return <Navigate to="/agente/dashboard" replace />;
      case 'AGENCIA':
        return <Navigate to="/agencia/dashboard" replace />;
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  // Si todo está bien, renderiza el layout principal con las rutas hijas
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PrivateRoute;
