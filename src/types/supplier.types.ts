export type SupplierStatus = 'active' | 'inactive';
export type BankAccountType = 'checking' | 'savings';
export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';

export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: SupplierStatus;
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  bankAccountType: BankAccountType;
  pixKey?: string;
  pixKeyType?: PixKeyType;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierFilter {
  searchTerm?: string;
  status?: SupplierStatus;
}

export interface SupplierFormData extends Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> {} 