
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="hubseguros-text">La plataforma que simplifica</span><br />
          tu trabajo como agente de seguros
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700 text-white px-8 py-6 text-lg">
            Comenzar ahora
          </Button>
          <Button variant="outline" className="border-hubseguros-600 text-hubseguros-600 hover:bg-hubseguros-50 px-8 py-6 text-lg">
            Solicitar una demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
