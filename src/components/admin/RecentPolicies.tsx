
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search, ArrowDown, ArrowUp, Plus } from 'lucide-react';

const RecentPolicies = () => {
  const policies = [
    {
      id: "POL-2023-001",
      client: "Carlos Rodríguez",
      insuranceCompany: "Seguros Alfa",
      type: "Auto",
      status: "Activa",
      expiration: "12/10/2023",
      premium: "1,250,000"
    },
    {
      id: "POL-2023-002",
      client: "María López",
      insuranceCompany: "Seguros Bolívar",
      type: "Hogar",
      status: "Por renovar",
      expiration: "05/06/2023",
      premium: "850,000"
    },
    {
      id: "POL-2023-003",
      client: "Juan Pérez",
      insuranceCompany: "Liberty Seguros",
      type: "Vida",
      status: "En trámite",
      expiration: "30/12/2023",
      premium: "2,100,000"
    },
    {
      id: "POL-2023-004",
      client: "Ana Gutiérrez",
      insuranceCompany: "Mapfre",
      type: "Cumplimiento",
      status: "Vencida",
      expiration: "01/05/2023",
      premium: "3,500,000"
    },
    {
      id: "POL-2023-005",
      client: "Luis Martínez",
      insuranceCompany: "Allianz",
      type: "Salud",
      status: "Activa",
      expiration: "18/11/2023",
      premium: "4,200,000"
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Por renovar":
        return "bg-yellow-100 text-yellow-800";
      case "En trámite":
        return "bg-blue-100 text-blue-800";
      case "Vencida":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pólizas recientes</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Nueva póliza
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="py-2 px-2 font-medium text-left">ID</th>
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Aseguradora</th>
                <th className="py-2 px-2 font-medium text-left">Tipo</th>
                <th className="py-2 px-2 font-medium text-left">Estado</th>
                <th className="py-2 px-2 font-medium text-left">Vencimiento</th>
                <th className="py-2 px-2 font-medium text-right">Prima</th>
                <th className="py-2 px-2 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm">{policy.id}</td>
                  <td className="py-3 px-2 text-sm font-medium">{policy.client}</td>
                  <td className="py-3 px-2 text-sm">{policy.insuranceCompany}</td>
                  <td className="py-3 px-2 text-sm">{policy.type}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">{policy.expiration}</td>
                  <td className="py-3 px-2 text-sm text-right">${policy.premium}</td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Ver</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPolicies;
