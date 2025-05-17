
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, UserLevel } from '../types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

// Datos de usuarios de prueba
const mockUsers = [
  { 
    id: '1', 
    name: 'Cliente Demo', 
    email: 'cliente@demo.com', 
    password: 'password', 
    role: 'CLIENTE' as UserRole,
    level: 'BASICO' as UserLevel 
  },
  { 
    id: '2', 
    name: 'Agente Demo', 
    email: 'agente@demo.com', 
    password: 'password', 
    role: 'AGENTE' as UserRole,
    level: 'INTERMEDIO' as UserLevel 
  },
  { 
    id: '3', 
    name: 'Agencia Demo', 
    email: 'agencia@demo.com', 
    password: 'password', 
    role: 'AGENCIA' as UserRole,
    level: 'AVANZADO' as UserLevel 
  },
  { 
    id: '4', 
    name: 'Admin Demo', 
    email: 'admin@demo.com', 
    password: 'password', 
    role: 'ADMIN' as UserRole,
    level: 'AVANZADO' as UserLevel 
  },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('hubseguros_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulamos una petición a API con un delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem('hubseguros_user', JSON.stringify(userWithoutPassword));
        
        // Navegar a la ruta correspondiente según el rol
        switch (foundUser.role) {
          case 'CLIENTE':
            navigate('/usuario/dashboard');
            break;
          case 'AGENTE':
            navigate('/agente/dashboard');
            break;
          case 'AGENCIA':
            navigate('/agencia/dashboard');
            break;
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
        
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido, ${foundUser.name}`,
        });
        
        return true;
      } else {
        setError('Credenciales incorrectas. Inténtelo de nuevo.');
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: "Credenciales incorrectas. Inténtelo de nuevo.",
        });
        return false;
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "Ocurrió un error al intentar iniciar sesión.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hubseguros_user');
    navigate('/login');
    toast({
      title: "Sesión finalizada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
