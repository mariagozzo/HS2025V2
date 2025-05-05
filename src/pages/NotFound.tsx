
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-hubseguros-600 mb-6">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</p>
        <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <Link to="/">
          <Button className="bg-hubseguros-600 hover:bg-hubseguros-700 text-white">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
