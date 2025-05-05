
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <img 
                    src="/lovable-uploads/931df68c-e544-4c24-8908-7468c12d5b55.png" 
                    alt="Dashboard de Hubseguros" 
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-12">
                  <h2 className="text-3xl font-bold mb-6 hubseguros-text">Todo lo que necesitas en un solo lugar</h2>
                  <p className="text-gray-700 mb-6">
                    La plataforma completa para gestionar tu agencia de seguros. Controla pólizas, clientes, renovaciones, 
                    siniestros y más desde un intuitivo panel de administración.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-hubseguros-100 text-hubseguros-600 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Gestión de clientes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-hubseguros-100 text-hubseguros-600 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Control de pólizas</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-hubseguros-100 text-hubseguros-600 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Seguimiento de cobros</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-hubseguros-100 text-hubseguros-600 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Reportes avanzados</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link to="/dashboard">
                      <Button className="bg-hubseguros-600 hover:bg-hubseguros-700 text-white">
                        Explorar funcionalidades
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Features />
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Soluciones adaptadas a tu rol</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-hubseguros-50 p-6 text-center">
                  <h3 className="text-xl font-bold text-hubseguros-800">Agente</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Optimizado para Agentes</h4>
                  <p className="text-gray-600 mb-6">
                    Herramientas esenciales para gestionar tu cartera de clientes y maximizar tus ventas sin complicaciones.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">CRM para gestión integral de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Configuración de tareas automáticas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Alertas de vencimientos y renovaciones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Cotizaciones rápidas para clientes</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-hubseguros-600 hover:bg-hubseguros-700 text-white">
                    Empezar como Agente
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-hubseguros-50 p-6 text-center">
                  <h3 className="text-xl font-bold text-hubseguros-800">Promotor</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Control para Promotores</h4>
                  <p className="text-gray-600 mb-6">
                    Herramientas de supervisión para equipos de venta y seguimiento eficaz de la productividad.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Dashboard de rendimiento del equipo</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Asignación de tareas a agentes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Reportes de productividad</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Sistema de alertas y seguimiento</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-hubseguros-600 hover:bg-hubseguros-700 text-white">
                    Empezar como Promotor
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-hubseguros-50 p-6 text-center">
                  <h3 className="text-xl font-bold text-hubseguros-800">Agencia</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Gestión para Agencias</h4>
                  <p className="text-gray-600 mb-6">
                    Solución integral para administrar toda la operación de tu agencia de seguros en un solo lugar.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Gestión completa de usuarios y permisos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Reportes financieros y de comisiones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Múltiples sucursales y equipos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-hubseguros-600">✓</div>
                      <span className="ml-2 text-gray-700">Integraciones con aseguradoras</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-hubseguros-600 hover:bg-hubseguros-700 text-white">
                    Empezar como Agencia
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
