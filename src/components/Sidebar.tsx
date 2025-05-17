import { Home, User, Shield, AlertCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/dashboard'
  },
  {
    name: 'Clientes',
    icon: <User className="h-5 w-5" />,
    path: '/clientes'
  },
  {
    name: 'Pólizas',
    icon: <Shield className="h-5 w-5" />,
    path: '/polizas'
  },
  {
    name: 'Siniestros',
    icon: <AlertCircle className="h-5 w-5" />,
    path: '/siniestros'
  },
  {
    name: 'Configuración',
    icon: <Settings className="h-5 w-5" />,
    path: '/settings'
  }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-8">Hubseguros</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
