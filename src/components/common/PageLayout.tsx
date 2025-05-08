
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </HelmetProvider>
  );
};

export default PageLayout;
