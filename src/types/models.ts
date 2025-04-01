import { z } from 'zod';

// Schemas base
export const addressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string(),
});

// Cliente
export const clientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  document: z.string(), // CPF/CNPJ
  email: z.string().email(),
  phone: z.string(),
  address: addressSchema,
  contacts: z.array(contactSchema),
  status: z.enum(['active', 'inactive', 'pending']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Fornecedor
export const supplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  document: z.string(), // CNPJ
  email: z.string().email(),
  phone: z.string(),
  address: addressSchema,
  contacts: z.array(contactSchema),
  category: z.string(),
  status: z.enum(['active', 'inactive', 'pending']),
  bankAccount: z.object({
    bank: z.string(),
    agency: z.string(),
    account: z.string(),
    type: z.enum(['checking', 'savings']),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Pagamento
export const paymentSchema = z.object({
  id: z.string().uuid(),
  supplierId: z.string().uuid(),
  amount: z.number(),
  dueDate: z.string().datetime(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'cancelled']),
  type: z.enum(['invoice', 'bill', 'transfer']),
  description: z.string(),
  attachments: z.array(z.string().url()),
  processingDetails: z.object({
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
    errorMessage: z.string().optional(),
    transactionId: z.string().optional(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Types inferidos dos schemas
export type Address = z.infer<typeof addressSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Client = z.infer<typeof clientSchema>;
export type Supplier = z.infer<typeof supplierSchema>;
export type Payment = z.infer<typeof paymentSchema>; 