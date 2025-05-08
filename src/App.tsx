
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
            
            {/* Módulos principales */}
            <Route path="/polizas" element={<PoliciesPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/pagos" element={<PaymentsPage />} />
            <Route path="/siniestros" element={<ClaimsPage />} />
            <Route path="/tareas" element={<TasksPage />} />
            <Route path="/facturas" element={<InvoicesPage />} />
            
            {/* Módulo de Cobros */}
            <Route path="/cobros/monedas" element={<CurrencyPage />} />
            <Route path="/cobros/pagos" element={<PaymentsPage />} />
            <Route path="/cobros/recibos" element={<PaymentsPage />} />
            <Route path="/cobros/liquidar" element={<PaymentsPage />} />
            
            {/* Rutas para compatibilidad */}
            <Route path="/clientes/crm" element={<ClientsPage />} />
            <Route path="/polizas/listado" element={<PoliciesPage />} />
            <Route path="/entidades/clientes" element={<ClientsPage />} />
            <Route path="/entidades/polizas" element={<PoliciesPage />} />
            
            {/* Configuration routes */}
            <Route path="/config/motivos-poliza" element={<NotFound />} />
            <Route path="/config/tipo-afiliacion" element={<NotFound />} />
            <Route path="/config/mensajeros" element={<NotFound />} />
            <Route path="/config/coberturas" element={<NotFound />} />
            <Route path="/config/importar-plantillas" element={<NotFound />} />
            
            {/* Entities routes */}
            <Route path="/entidades/aseguradoras" element={<NotFound />} />
            <Route path="/entidades/ramos" element={<NotFound />} />
            <Route path="/entidades/vendedores" element={<NotFound />} />
            <Route path="/entidades/polizas-cumplimiento" element={<NotFound />} />
            <Route path="/entidades/campos-adicionales" element={<NotFound />} />
            <Route path="/entidades/anexos" element={<NotFound />} />
            <Route path="/entidades/cobros" element={<PaymentsPage />} />
            <Route path="/entidades/vinculados" element={<NotFound />} />
            <Route path="/entidades/beneficiarios" element={<NotFound />} />
            <Route path="/entidades/cotizador" element={<NotFound />} />
            <Route path="/entidades/importar-siniestros" element={<NotFound />} />
            <Route path="/entidades/importar-amparos" element={<NotFound />} />
            <Route path="/entidades/tareas" element={<TasksPage />} />
            <Route path="/entidades/importar-datos" element={<NotFound />} />
            
            {/* Policy module routes */}
            <Route path="/polizas/cumplimiento" element={<NotFound />} />
            <Route path="/polizas/remisiones" element={<NotFound />} />
            <Route path="/polizas/tareas" element={<TasksPage />} />
            
            {/* Reports routes */}
            <Route path="/informes/generales" element={<NotFound />} />
            
            {/* Documents routes */}
            <Route path="/archivos/documentos" element={<NotFound />} />
            
            {/* Claims routes */}
            <Route path="/siniestros/registro" element={<ClaimsPage />} />
            
            {/* Invoices routes */}
            <Route path="/facturas/registro" element={<InvoicesPage />} />
            
            {/* Agency settings routes */}
            <Route path="/agencia/usuarios" element={<NotFound />} />
            <Route path="/agencia/informacion" element={<NotFound />} />
            <Route path="/agencia/sedes" element={<NotFound />} />
            <Route path="/agencia/aseguradoras" element={<NotFound />} />
            <Route path="/agencia/ramos" element={<NotFound />} />
            <Route path="/agencia/vendedores" element={<NotFound />} />
            <Route path="/agencia/estados-siniestros" element={<NotFound />} />
            <Route path="/agencia/estados-arl" element={<NotFound />} />
            <Route path="/agencia/motivos-poliza" element={<NotFound />} />
            <Route path="/agencia/tipo-afiliacion" element={<NotFound />} />
            <Route path="/agencia/mensajeros" element={<NotFound />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
