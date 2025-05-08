
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PoliciesPage from "./pages/PoliciesPage";
import ClientsPage from "./pages/ClientsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ClaimsPage from "./pages/ClaimsPage";
import TasksPage from "./pages/TasksPage";
import InvoicesPage from "./pages/InvoicesPage";
import CurrencyPage from "./pages/cobros/monedas";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Módulos principales con implementaciones existentes */}
            <Route path="/polizas" element={<PoliciesPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/pagos" element={<PaymentsPage />} />
            <Route path="/siniestros" element={<ClaimsPage />} />
            <Route path="/tareas" element={<TasksPage />} />
            <Route path="/facturas" element={<InvoicesPage />} />
            
            {/* Módulo de Cobros */}
            <Route path="/cobros/monedas" element={<CurrencyPage />} />
            <Route path="/cobros/pagos" element={<PlaceholderPage />} />
            <Route path="/cobros/recibos" element={<PlaceholderPage />} />
            <Route path="/cobros/liquidar" element={<PlaceholderPage />} />
            
            {/* Rutas para compatibilidad */}
            <Route path="/clientes/crm" element={<ClientsPage />} />
            <Route path="/polizas/listado" element={<PoliciesPage />} />
            <Route path="/entidades/clientes" element={<ClientsPage />} />
            <Route path="/entidades/polizas" element={<PoliciesPage />} />
            
            {/* Configuration routes */}
            <Route path="/config/motivos-poliza" element={<PlaceholderPage category="config" />} />
            <Route path="/config/tipo-afiliacion" element={<PlaceholderPage category="config" />} />
            <Route path="/config/mensajeros" element={<PlaceholderPage category="config" />} />
            <Route path="/config/coberturas" element={<PlaceholderPage category="config" />} />
            <Route path="/config/importar-plantillas" element={<PlaceholderPage category="config" />} />
            
            {/* Entities routes */}
            <Route path="/entidades/aseguradoras" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/ramos" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/vendedores" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/polizas-cumplimiento" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/campos-adicionales" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/anexos" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/cobros" element={<PaymentsPage />} />
            <Route path="/entidades/vinculados" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/beneficiarios" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/cotizador" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/importar-siniestros" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/importar-amparos" element={<PlaceholderPage category="entity" />} />
            <Route path="/entidades/tareas" element={<TasksPage />} />
            <Route path="/entidades/importar-datos" element={<PlaceholderPage category="entity" />} />
            
            {/* Policy module routes */}
            <Route path="/polizas/cumplimiento" element={<PlaceholderPage category="policy" />} />
            <Route path="/polizas/remisiones" element={<PlaceholderPage category="policy" />} />
            <Route path="/polizas/tareas" element={<TasksPage />} />
            
            {/* Reports routes */}
            <Route path="/informes/generales" element={<PlaceholderPage category="report" />} />
            
            {/* Documents routes */}
            <Route path="/archivos/documentos" element={<PlaceholderPage category="document" />} />
            
            {/* Claims routes */}
            <Route path="/siniestros/registro" element={<ClaimsPage />} />
            
            {/* Invoices routes */}
            <Route path="/facturas/registro" element={<InvoicesPage />} />
            
            {/* Agency settings routes */}
            <Route path="/agencia/usuarios" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/informacion" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/sedes" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/aseguradoras" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/ramos" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/vendedores" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/estados-siniestros" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/estados-arl" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/motivos-poliza" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/tipo-afiliacion" element={<PlaceholderPage category="config" />} />
            <Route path="/agencia/mensajeros" element={<PlaceholderPage category="config" />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
