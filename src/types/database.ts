
// Custom type definitions for our database entities
// These complement the auto-generated types from Supabase

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgencyInfo {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  tax_id: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface InsuranceCompany {
  id: string;
  name: string;
  tax_id: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  contact_person: string | null;
  created_at: string;
  updated_at: string;
}

export interface InsuranceBranch {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Seller {
  id: string;
  name: string;
  tax_id: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  commission_percentage: number | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  identification_type: string | null;
  identification_number: string | null;
  birthdate: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  affiliation_type_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  policy_number: string;
  client_id: string | null;
  insurance_company_id: string | null;
  insurance_branch_id: string | null;
  seller_id: string | null;
  start_date: string | null;
  end_date: string | null;
  premium_value: number | null;
  status: string | null;
  status_reason_id: string | null;
  is_renewal: boolean | null;
  parent_policy_id: string | null;
  is_collective: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  assigned_to: string | null;
  related_entity_type: string | null;
  related_entity_id: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  policy_id: string | null;
  amount: number;
  payment_date: string | null;
  due_date: string | null;
  status: string | null;
  payment_method: string | null;
  receipt_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  policy_id: string | null;
  claim_number: string | null;
  claim_date: string | null;
  notification_date: string | null;
  description: string | null;
  status: string | null;
  settlement_amount: number | null;
  settlement_date: string | null;
  created_at: string;
  updated_at: string;
}
