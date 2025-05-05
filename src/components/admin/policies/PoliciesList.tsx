
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Eye,
  FileText,
  Check
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Policy } from '@/types/database';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PolicyFormDialog from './PolicyFormDialog';
import PolicyDetailsDialog from './PolicyDetailsDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const PoliciesList = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);
  const [viewPolicy, setViewPolicy] = useState<Policy | null>(null);
  const [deletePolicy, setDeletePolicy] = useState<Policy | null>(null);

  // Fetch policies from Supabase
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['policies', page, pageSize, searchQuery, statusFilter],
    queryFn: async () => {
      let query = supabase.from('policies') as any;
      
      // Select with joins
      query = query.select(`
        *,
        clients(first_name, last_name),
        insurance_companies(name),
        insurance_branches(name)
      `);

      // Apply filters
      if (searchQuery) {
        query = query.or(`policy_number.ilike.%${searchQuery}%,clients.first_name.ilike.%${searchQuery}%,clients.last_name.ilike.%${searchQuery}%`);
      }
      
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      // Pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      // Count for pagination
      const { count, error: countError } = await (supabase
        .from('policies') as any)
        .select('id', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      // Get paginated results
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        throw error;
      }
      
      return {
        data: data || [],
        count: count || 0,
        page,
        pageSize,
        pageCount: Math.ceil(count / pageSize)
      };
    }
  });

  const handleCreateSuccess = () => {
    refetch();
    setCreateDialogOpen(false);
    toast({
      title: "Éxito",
      description: "Póliza creada correctamente",
    });
  };

  const handleEditSuccess = () => {
    refetch();
    setEditPolicy(null);
    toast({
      title: "Éxito",
      description: "Póliza actualizada correctamente",
    });
  };

  const handleDeleteSuccess = () => {
    refetch();
    setDeletePolicy(null);
    toast({
      title: "Éxito",
      description: "Póliza eliminada correctamente",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Por renovar":
        return "bg-yellow-100 text-yellow-800";
      case "En trámite":
        return "bg-blue-100 text-blue-800";
      case "Vencida":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statuses = [
    "Activa",
    "Por renovar",
    "En trámite",
    "Vencida",
    "Cancelada",
  ];

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pólizas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500">Error al cargar los datos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl">Gestión de Pólizas</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="h-9"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva póliza
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar pólizas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  {statusFilter || "Filtrar por estado"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setStatusFilter(null)} className="flex items-center gap-2">
                  <Check className={`h-4 w-4 ${!statusFilter ? 'opacity-100' : 'opacity-0'}`} />
                  <span>Todos</span>
                </DropdownMenuItem>
                {statuses.map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="flex items-center gap-2"
                  >
                    <Check className={`h-4 w-4 ${statusFilter === status ? 'opacity-100' : 'opacity-0'}`} />
                    <span>{status}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando pólizas...</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden md:table-cell">Aseguradora</TableHead>
                    <TableHead className="hidden md:table-cell">Ramo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Vencimiento</TableHead>
                    <TableHead className="text-right">Prima</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.policy_number}</TableCell>
                        <TableCell>
                          {policy.clients 
                            ? `${policy.clients.first_name || ''} ${policy.clients.last_name || ''}` 
                            : 'Sin cliente'}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {policy.insurance_companies?.name || '-'}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {policy.insurance_branches?.name || '-'}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(policy.status || 'Desconocido')}`}>
                            {policy.status || 'Desconocido'}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(policy.end_date)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(policy.premium_value)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setViewPolicy(policy)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditPolicy(policy)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeletePolicy(policy)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No se encontraron pólizas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {data?.pageCount && data.pageCount > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página anterior</span>
                      </PaginationLink>
                    </PaginationItem>
                    
                    {page > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(1)}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {page > 3 && (
                      <PaginationItem>
                        <PaginationLink disabled>...</PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(page - 1)}
                        >
                          {page - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationLink isActive>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                    
                    {page < data.pageCount && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(page + 1)}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {page < data.pageCount - 2 && (
                      <PaginationItem>
                        <PaginationLink disabled>...</PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {page < data.pageCount - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(data.pageCount)}
                        >
                          {data.pageCount}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setPage(Math.min(page + 1, data.pageCount))}
                        disabled={page === data.pageCount}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Página siguiente</span>
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Dialogs for CRUD operations */}
      <PolicyFormDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />

      {editPolicy && (
        <PolicyFormDialog 
          open={!!editPolicy} 
          onOpenChange={() => setEditPolicy(null)}
          policy={editPolicy}
          onSuccess={handleEditSuccess}
        />
      )}

      {viewPolicy && (
        <PolicyDetailsDialog
          open={!!viewPolicy}
          onOpenChange={() => setViewPolicy(null)}
          policy={viewPolicy}
        />
      )}

      {deletePolicy && (
        <DeleteConfirmDialog
          open={!!deletePolicy}
          onOpenChange={() => setDeletePolicy(null)}
          policy={deletePolicy}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </Card>
  );
};

export default PoliciesList;
