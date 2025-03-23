
export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'ARCHIVED';
export type ClientType = 'public' | 'private';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string; // Added zipCode property
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  segment?: string;
  industry?: string;
  type: ClientType;
  status: ClientStatus;
  createdAt: string;
  updatedAt?: string;
  representativeId?: string;
  representativeName?: string;
}
