
import React, { useState } from 'react';
import PageLayout from '@/components/common/PageLayout';
import PoliciesList from '@/components/admin/policies/PoliciesList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fromPolicies } from '@/integrations/supabase/client';

const PoliciesPage = () => {
  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const { data: policies, isLoading, error, refetch } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const { data, error } = await fromPolicies()
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });

  return (
    <PageLayout title="Pólizas">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pólizas</h1>
          <Button 
            className="bg-hubseguros-600 hover:bg-hubseguros-700"
            onClick={() => {
              setSelectedPolicy(null);
              setShowPolicyForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Nueva Póliza
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <PoliciesList 
            policies={policies || []} 
            isLoading={isLoading} 
            error={error} 
            onEdit={(policy) => {
              setSelectedPolicy(policy);
              setShowPolicyForm(true);
            }}
            refetch={refetch}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default PoliciesPage;
