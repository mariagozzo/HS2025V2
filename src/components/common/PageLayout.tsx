
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '@/components/admin/Sidebar';

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
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
