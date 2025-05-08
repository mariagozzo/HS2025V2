
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '@/components/admin/Sidebar';
import { Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {title && (
          <Helmet>
            <title>{title} | HubSeguros</title>
          </Helmet>
        )}
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 bg-blue-600">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">Admin System</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
