
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-hubseguros-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para optimizar tu negocio?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Únete a cientos de profesionales que ya confían en Hubseguros para gestionar su día a día.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700 text-white px-8 py-6 text-lg">
            Comenzar ahora
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-hubseguros-800 px-8 py-6 text-lg">
            Agendar una demostración
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
