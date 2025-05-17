
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const { login, isAuthenticated, user, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Si está autenticado, redirigimos al dashboard correspondiente según el rol
  if (isAuthenticated && user) {
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sección izquierda (imagen de fondo) */}
      <div className="flex-1 bg-blue-700 p-8 flex flex-col justify-center items-start text-white">
        <div className="max-w-md mx-auto md:ml-auto md:mr-0">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a HubSeguros</h1>
          <p className="text-xl mb-6">
            La plataforma digital para gestionar y hacer crecer tu negocio de seguros.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border border-white mr-3">
                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Organiza tu cartera de clientes y pólizas</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border border-white mr-3">
                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Ahorra tiempo en tareas administrativas</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border border-white mr-3">
                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Impulsa tus ventas con herramientas inteligentes</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border border-white mr-3">
                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Soporte humano cuando lo necesites</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección derecha (formulario de login) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Hubseguros</h2>
            <h3 className="text-xl font-semibold">Iniciar sesión</h3>
            <p className="text-gray-600 mt-2">Ingresa tus credenciales para acceder a la plataforma</p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@factotum.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a href="#" className="text-xs text-blue-700 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Cuentas de prueba:</p>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div className="p-2 border rounded text-xs">
                <p className="font-medium">Cliente</p>
                <p>cliente@demo.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border rounded text-xs">
                <p className="font-medium">Agente</p>
                <p>agente@demo.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border rounded text-xs">
                <p className="font-medium">Agencia</p>
                <p>agencia@demo.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border rounded text-xs">
                <p className="font-medium">Admin</p>
                <p>admin@demo.com</p>
                <p>password</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <p className="text-center text-sm">
            ¿No tienes una cuenta? <a href="/register" className="text-blue-700 hover:underline">Regístrate</a>
          </p>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Acceso demo: demo@factotum.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
