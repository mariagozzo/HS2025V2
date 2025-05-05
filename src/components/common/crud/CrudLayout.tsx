
import React, { ReactNode } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface CrudLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs: {
    text: string;
    href?: string;
  }[];
  actions?: ReactNode;
}

const CrudLayout = ({ 
  children, 
  title, 
  subtitle, 
  breadcrumbs,
  actions 
}: CrudLayoutProps) => {
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
              <h1 className="text-xl font-semibold ml-2">{title}</h1>
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
          <div className="max-w-7xl mx-auto space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.text}</BreadcrumbLink>
                      ) : (
                        <span>{crumb.text}</span>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
              </div>
              
              {actions && (
                <div className="flex space-x-2">
                  {actions}
                </div>
              )}
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrudLayout;
