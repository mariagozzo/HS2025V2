
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description?: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">
        {description || "Esta página está en desarrollo. Próximamente disponible."}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center mx-auto text-hubseguros-primary hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" />
        Volver
      </button>
    </div>
  );
};

export default Placeholder;
