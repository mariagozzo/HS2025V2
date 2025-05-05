
import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentPolicies from '@/components/admin/RecentPolicies';
import TasksList from '@/components/admin/TasksList';
import { Button } from "@/components/ui/button";
import { Bell, Menu } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold ml-2">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-hubseguros-600 rounded-full flex items-center justify-center text-white">
                  A
                </span>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Bienvenido de nuevo</h2>
              <p className="text-gray-600">Aquí tienes un resumen de tu actividad</p>
            </div>
            
            <DashboardStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentPolicies />
              </div>
              <div>
                <TasksList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
