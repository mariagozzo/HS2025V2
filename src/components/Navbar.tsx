
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-hubseguros-800">Hub<span className="text-hubseguros-600">seguros</span></span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-hubseguros-600 font-medium">Inicio</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-hubseguros-600 font-medium">Dashboard</Link>
          <Link to="/clientes" className="text-gray-700 hover:text-hubseguros-600 font-medium">Clientes</Link>
          <Link to="/polizas" className="text-gray-700 hover:text-hubseguros-600 font-medium">Pólizas</Link>
          <Link to="/siniestros" className="text-gray-700 hover:text-hubseguros-600 font-medium">Siniestros</Link>
          <Link to="/perfil" className="text-gray-700 hover:text-hubseguros-600 font-medium">Mi Perfil</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right hidden md:block">
              <p className="font-medium">bkcor23@outlook.com</p>
            </div>
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
