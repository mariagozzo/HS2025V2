
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
            
            {/* Rutas para compatibilidad */}
            <Route path="/clientes/crm" element={<ClientsPage />} />
            <Route path="/polizas/listado" element={<PoliciesPage />} />
            <Route path="/entidades/clientes" element={<ClientsPage />} />
            <Route path="/entidades/polizas" element={<PoliciesPage />} />
            
            {/* Submódulos - se pueden implementar posteriormente */}
            <Route path="/aseguradoras" element={<NotFound />} />
            <Route path="/ramos" element={<NotFound />} />
            <Route path="/vendedores" element={<NotFound />} />
            <Route path="/configuracion" element={<NotFound />} />
            <Route path="/informes" element={<NotFound />} />
            <Route path="/archivos" element={<NotFound />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
