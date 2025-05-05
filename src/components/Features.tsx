
import React from 'react';
import { CheckCircle, Clock, TrendingUp, Headphones } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CheckCircle className="h-12 w-12 text-hubseguros-600" />,
      title: "Organiza tu cartera",
      description: "Gestiona de forma eficiente tus clientes, pólizas y siniestros en una sola plataforma integrada."
    },
    {
      icon: <Clock className="h-12 w-12 text-hubseguros-600" />,
      title: "Ahorra tiempo",
      description: "Automatiza tareas repetitivas y procesos administrativos para centrarte en lo que realmente importa."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-hubseguros-600" />,
      title: "Impulsa tus ventas",
      description: "Identifica oportunidades de venta cruzada y seguimiento de renovaciones para aumentar tu cartera."
    },
    {
      icon: <Headphones className="h-12 w-12 text-hubseguros-600" />,
      title: "Soporte humano",
      description: "Contamos con un equipo de especialistas que te ayudarán en todo momento con cualquier consulta."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Beneficios de usar Hubseguros</h2>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Nuestra plataforma está diseñada específicamente para facilitar el trabajo diario de agentes, promotores y agencias de seguros.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hubseguros-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
