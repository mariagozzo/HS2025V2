
import React from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/common/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface PlaceholderPageProps {
  title?: string;
  category?: 'config' | 'entity' | 'document' | 'report' | 'policy';
  breadcrumbs?: { text: string; href?: string }[];
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, category, breadcrumbs }) => {
  const location = useLocation();
  const path = location.pathname;
  const pathSegments = path.split('/').filter(Boolean);
  
  // Generate title from path if not provided
  const pageTitle = title || (pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + 
      pathSegments[pathSegments.length - 1].slice(1).replace(/-/g, ' ')
    : 'Página');
  
  // Determine category from path if not provided
  const pageCategory = category || (() => {
    if (path.startsWith('/config') || path.startsWith('/agencia')) return 'config';
    if (path.startsWith('/entidades')) return 'entity';
    if (path.startsWith('/archivos')) return 'document';
    if (path.startsWith('/informes')) return 'report';
    if (path.startsWith('/polizas')) return 'policy';
    return 'config';
  })();
  
  // Generate breadcrumbs from path if not provided
  const pageBreadcrumbs = breadcrumbs || pathSegments.map((segment, index) => {
    const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      text: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: index < pathSegments.length - 1 ? segmentPath : undefined
    };
  });
  
  // Category specific information
  const categoryInfo = {
    config: {
      badge: 'Configuración',
      color: 'bg-blue-100 text-blue-800',
      description: 'Módulo de configuración del sistema',
      features: ['Formularios para CRUD', 'Validación de datos', 'Estado persistente', 'Manejo de permisos']
    },
    entity: {
      badge: 'Entidad',
      color: 'bg-green-100 text-green-800',
      description: 'Gestión de datos principales',
      features: ['Tablas de datos', 'Filtros avanzados', 'Exportación', 'Importación']
    },
    document: {
      badge: 'Documento',
      color: 'bg-amber-100 text-amber-800',
      description: 'Gestión de archivos y documentos',
      features: ['Upload de archivos', 'Previsualización', 'Categorización', 'Búsqueda']
    },
    report: {
      badge: 'Informe',
      color: 'bg-purple-100 text-purple-800',
      description: 'Reportes y estadísticas',
      features: ['Gráficos', 'Filtros de fecha', 'Exportación', 'KPIs']
    },
    policy: {
      badge: 'Póliza',
      color: 'bg-red-100 text-red-800',
      description: 'Gestión especializada de pólizas',
      features: ['Workflows específicos', 'Validaciones especiales', 'Integración con APIs externas']
    }
  };
  
  return (
    <PageLayout title={pageTitle}>
      <div className="container mx-auto py-6">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {pageBreadcrumbs.map((crumb, i) => (
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
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={categoryInfo[pageCategory].color}>
                {categoryInfo[pageCategory].badge}
              </Badge>
              <span className="text-gray-500 text-sm">{path}</span>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <CardTitle>Módulo en desarrollo</CardTitle>
              </div>
              <Badge variant="outline">Prioridad: Media</Badge>
            </div>
            <CardDescription>
              {categoryInfo[pageCategory].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p>
                La funcionalidad para <strong>{pageTitle}</strong> está actualmente en desarrollo. 
                Esta página formará parte del grupo de funcionalidades de <strong>{categoryInfo[pageCategory].badge}</strong>.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> 
                Características planificadas:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {categoryInfo[pageCategory].features.map((feature, i) => (
                  <li key={i} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-3 mt-4">
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
              >
                Volver atrás
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
              >
                Ir al Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PlaceholderPage;
