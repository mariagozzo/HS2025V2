
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ListTodo, Activity, Calendar, FileSearch, Coins } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Book className="mr-2 h-5 w-5 text-hubseguros-600" />
            Resumen de pólizas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Cotizaciones</p>
              <p className="text-2xl font-bold text-hubseguros-800">24</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">En expedición</p>
              <p className="text-2xl font-bold text-hubseguros-800">12</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Por renovar</p>
              <p className="text-2xl font-bold text-orange-600">18</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Vencidas</p>
              <p className="text-2xl font-bold text-red-600">7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ListTodo className="mr-2 h-5 w-5 text-hubseguros-600" />
            Tareas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Vencidas</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Para Hoy</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Para Mañana</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Próximamente</p>
              <p className="text-2xl font-bold text-hubseguros-800">20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-5 w-5 text-hubseguros-600" />
            Clientes activos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[calc(100%-2.5rem)]">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#0070c9"
                strokeWidth="3"
                strokeDasharray="75, 100"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold">75%</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">de clientes activos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-hubseguros-600" />
            Cumpleaños
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            <li className="py-2 flex justify-between">
              <div>
                <p className="font-medium">Carlos Rodríguez</p>
                <p className="text-sm text-gray-600">23 años</p>
              </div>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Hoy</span>
            </li>
            <li className="py-2 flex justify-between">
              <div>
                <p className="font-medium">María López</p>
                <p className="text-sm text-gray-600">35 años</p>
              </div>
              <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Mañana</span>
            </li>
            <li className="py-2 flex justify-between">
              <div>
                <p className="font-medium">Juan Pérez</p>
                <p className="text-sm text-gray-600">42 años</p>
              </div>
              <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">En 3 días</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileSearch className="mr-2 h-5 w-5 text-hubseguros-600" />
            Siniestros pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[calc(100%-2.5rem)]">
          <div className="text-5xl font-bold text-hubseguros-800">12</div>
          <p className="mt-2 text-sm text-gray-600">siniestros pendientes de gestión</p>
          <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="w-full flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>20</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Coins className="mr-2 h-5 w-5 text-hubseguros-600" />
            Cobros por recaudar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[calc(100%-2.5rem)]">
          <div className="text-5xl font-bold text-red-600">$5.8M</div>
          <p className="mt-2 text-sm text-gray-600">pendientes con antigüedad mayor a 90 días</p>
          <div className="w-full mt-4 flex text-xs">
            <div className="bg-red-500 h-2 w-1/3 rounded-l"></div>
            <div className="bg-orange-500 h-2 w-1/4"></div>
            <div className="bg-yellow-500 h-2 w-1/5"></div>
            <div className="bg-green-500 h-2 w-1/5 rounded-r"></div>
          </div>
          <div className="w-full flex justify-between text-xs text-gray-500 mt-1">
            <span>+90 días</span>
            <span>60 días</span>
            <span>30 días</span>
            <span>Al día</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
