
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <main className="min-h-screen bg-gray-50">
      {title && (
        <Helmet>
          <title>{title} | HubSeguros</title>
        </Helmet>
      )}
      {children}
    </main>
  );
};

export default PageLayout;
