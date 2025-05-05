
import { z } from "zod";

// Esquema para validación de clientes
export const clientSchema = z.object({
  first_name: z.string().min(1, "Nombre es requerido"),
  last_name: z.string().min(1, "Apellido es requerido"),
  identification_type: z.string().optional(),
  identification_number: z.string().optional(),
  birthdate: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Correo electrónico inválido").optional(),
  affiliation_type_id: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

// Esquema para validación de pólizas
export const policySchema = z.object({
  policy_number: z.string().min(1, "Número de póliza es requerido"),
  client_id: z.string().min(1, "Cliente es requerido"),
  insurance_company_id: z.string().optional(),
  insurance_branch_id: z.string().optional(),
  seller_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  premium_value: z.number().optional(),
  status: z.string().optional(),
  status_reason_id: z.string().optional(),
  is_renewal: z.boolean().optional(),
  parent_policy_id: z.string().optional(),
  is_collective: z.boolean().optional(),
});

export type PolicyFormValues = z.infer<typeof policySchema>;

// Esquema para validación de pagos
export const paymentSchema = z.object({
  policy_id: z.string().optional(),
  amount: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  payment_date: z.string().optional(),
  due_date: z.string().optional(),
  status: z.string().optional(),
  payment_method: z.string().optional(),
  receipt_number: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;

// Esquema para validación de siniestros
export const claimSchema = z.object({
  policy_id: z.string().optional(),
  claim_number: z.string().optional(),
  claim_date: z.string().optional(),
  notification_date: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  settlement_amount: z.number().optional(),
  settlement_date: z.string().optional(),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;

// Esquema para validación de tareas
export const taskSchema = z.object({
  title: z.string().min(1, "Título es requerido"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  assigned_to: z.string().optional(),
  related_entity_type: z.string().optional(),
  related_entity_id: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

// Esquema para validación de facturas
export const invoiceSchema = z.object({
  invoice_number: z.string().min(1, "Número de factura es requerido"),
  client_id: z.string().optional(),
  issue_date: z.string().optional(),
  due_date: z.string().optional(),
  amount: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  status: z.string().optional(),
  description: z.string().optional(),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
