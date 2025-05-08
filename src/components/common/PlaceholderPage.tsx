
import React from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/common/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface PlaceholderPageProps {
  title?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const location = useLocation();
  const pageName = title || location.pathname.split('/').pop() || '';
  const formattedTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
  
  return (
    <PageLayout title={formattedTitle}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{formattedTitle}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Página en desarrollo
            </CardTitle>
            <CardDescription>
              Esta sección está actualmente en desarrollo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              La funcionalidad para <strong>{formattedTitle}</strong> estará disponible próximamente. 
              Nuestro equipo está trabajando para implementar todas las características requeridas.
            </p>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="mt-2"
            >
              Volver atrás
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PlaceholderPage;
