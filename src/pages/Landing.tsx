import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { BarChart4, Clock, Shield, Users } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
const Landing = () => {
  const {
    isAuthenticated,
    user
  } = useAuth();

  // Determinar a dónde redirigir según el rol
  const getDashboardLink = () => {
    if (!isAuthenticated) return '/login';
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
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-[#0056FF]">HubSeguros</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#caracteristicas" className="text-gray-600 hover:text-gray-900">Características</a>
              <a href="#beneficios" className="text-gray-600 hover:text-gray-900">Beneficios</a>
              <a href="#soluciones" className="text-gray-600 hover:text-gray-900">Soluciones</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button className="bg-[#0056FF] hover:bg-blue-600">
                <Link to="/login" className="text-white">Solicitar demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                La plataforma que simplifica tu trabajo como agente de seguros
              </h1>
              <p className="text-xl text-gray-600">
                Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#0056FF] hover:bg-blue-600 text-white">
                  <Link to={getDashboardLink()}>Comenzar ahora</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Link to="/login">Solicitar una demo</Link>
                </Button>
              </div>
            </div>
            <div className="lg:block hidden">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="bg-gray-900 p-2 rounded-t-md flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-white ml-2">HubSeguros - Panel de control</span>
                </div>
                <div className="bg-white p-4 rounded-b-md">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#E8F0FF] p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-700">117</div>
                      <div className="text-sm text-gray-600">Pólizas activas</div>
                    </div>
                    <div className="bg-[#E8F8E8] p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-green-600">17</div>
                      <div className="text-sm text-gray-600">Renovaciones este mes</div>
                    </div>
                    <div className="bg-[#FFF8E8] p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-amber-600">7</div>
                      <div className="text-sm text-gray-600">Siniestros pendientes</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Vencimientos próximos</h4>
                      <h4 className="font-medium">Tareas pendientes</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="bg-white border rounded-md p-2 mb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">María García</span>
                            <span className="text-xs bg-red-100 text-red-800 rounded px-2 py-0.5">3 días</span>
                          </div>
                          <div className="text-xs text-gray-500">Auto - #5842</div>
                        </div>
                        <div className="bg-white border rounded-md p-2 mb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Juan Pérez</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-0.5">5 días</span>
                          </div>
                          <div className="text-xs text-gray-500">Vida - #721</div>
                        </div>
                        <div className="bg-white border rounded-md p-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Ana Rodríguez</span>
                            <span className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5">7 días</span>
                          </div>
                          <div className="text-xs text-gray-500">Hogar - #343</div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-white border rounded-md p-2 mb-2">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#FF4D4F] mr-2"></span>
                            <span className="text-sm">Llamar a cliente para renovación</span>
                          </div>
                        </div>
                        <div className="bg-white border rounded-md p-2 mb-2">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#FFC53D] mr-2"></span>
                            <span className="text-sm">Enviar cotización seguro hogar</span>
                          </div>
                        </div>
                        <div className="bg-white border rounded-md p-2">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#69C0FF] mr-2"></span>
                            <span className="text-sm">Actualizar datos de póliza #5423</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Beneficios de usar HubSeguros</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Nuestra plataforma está diseñada específicamente para facilitar el trabajo diario de agentes, promotores y agencias de seguros.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#E8F0FF] rounded-md flex items-center justify-center mx-auto mb-4">
                <BarChart4 size={24} className="text-[#0056FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organiza tu cartera</h3>
              <p className="text-gray-600 text-sm">
                Gestiona de forma eficiente tus clientes, pólizas y siniestros en una sola plataforma integrada.
              </p>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#E8F0FF] rounded-md flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-[#0056FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ahorra tiempo</h3>
              <p className="text-gray-600 text-sm">
                Automatiza tareas repetitivas y procesos administrativos para centrarte en lo que realmente importa.
              </p>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#E8F0FF] rounded-md flex items-center justify-center mx-auto mb-4">
                <BarChart4 size={24} className="text-[#0056FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Impulsa tus ventas</h3>
              <p className="text-gray-600 text-sm">
                Identifica oportunidades de venta cruzada y seguimiento de renovaciones para aumentar tu cartera.
              </p>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#E8F0FF] rounded-md flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-[#0056FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soporte humano</h3>
              <p className="text-gray-600 text-sm">
                Contamos con un equipo de especialistas que te ayudarán en todo momento con cualquier consulta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones para diferentes roles */}
      <section id="soluciones" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Soluciones adaptadas a tu rol</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            HubSeguros se adapta a tus necesidades específicas, ya sea que trabajes como agente independiente, promotor o administres una agencia completa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0056FF] mb-4">Usuario</h3>
              <ul className="space-y-3 mb-8 min-h-[180px]">
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Panel personalizado</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Visualización de pólizas</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Alertas de vencimiento</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Reportes sencillos</span>
                </li>
              </ul>
              <Button className="w-full bg-[#0056FF] hover:bg-blue-600">Comenzar</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-blue-200 shadow-md relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-xs uppercase font-bold text-white py-1 px-3 rounded-bl-lg rounded-tr-lg">
                Recomendado
              </div>
              <h3 className="text-2xl font-bold text-[#0056FF] mb-4">Agente</h3>
              <ul className="space-y-3 mb-8 min-h-[180px]">
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Todo lo de Usuario</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Gestión de clientes</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Seguimiento de comisiones</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Oportunidades de venta</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Asistente IA</span>
                </li>
              </ul>
              <Button className="w-full bg-[#0056FF] hover:bg-blue-600">Comenzar</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0056FF] mb-4">Agencia</h3>
              <ul className="space-y-3 mb-8 min-h-[180px]">
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Todo lo de Agente</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Gestión de agentes</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Dashboard financiero</span>
                </li>
                <li className="flex items-center">
                  <Shield size={18} className="text-green-500 mr-2" />
                  <span>Reportes avanzados</span>
                </li>
              </ul>
              <Button className="w-full bg-[#0056FF] hover:bg-blue-600">Comenzar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="caracteristicas" className="py-16 bg-[#0056FF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para optimizar tu negocio?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya confían en HubSeguros para gestionar su día a día.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-[#0056FF] hover:bg-gray-100">
              <Link to="/login">Comenzar ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HubSeguros</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Sobre nosotros</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contacto</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Producto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Características</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Precios</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Integraciones</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentación</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Tutoriales</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Soporte</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Términos de uso</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Política de privacidad</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 HubSeguros. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50">
        <FaWhatsapp size={28} />
      </a>
    </div>;
};
export default Landing;