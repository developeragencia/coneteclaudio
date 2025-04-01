import api, { type ApiResponse, type PaginatedResponse } from './api';
import { type Supplier, supplierSchema } from '@/types/models';

export interface SupplierFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  category?: string;
  page?: number;
  per_page?: number;
}

class SupplierService {
  private validate(data: unknown): Supplier {
    return supplierSchema.parse(data);
  }

  async list(filters: SupplierFilters = {}): Promise<PaginatedResponse<Supplier[]>> {
    const response = await api.get<PaginatedResponse<Supplier[]>>('/suppliers', { params: filters });
    return {
      ...response.data,
      data: response.data.data.map(supplier => this.validate(supplier))
    };
  }

  async create(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Supplier>> {
    const response = await api.post<ApiResponse<Supplier>>('/suppliers', data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async update(id: string, data: Partial<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<Supplier>> {
    const response = await api.put<ApiResponse<Supplier>>(`/suppliers/${id}`, data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/suppliers/${id}`);
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<Supplier>> {
    const response = await api.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  // Métodos auxiliares
  async activate(id: string): Promise<ApiResponse<Supplier>> {
    return this.update(id, { status: 'active' });
  }

  async deactivate(id: string): Promise<ApiResponse<Supplier>> {
    return this.update(id, { status: 'inactive' });
  }

  // Validações específicas
  validateCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.length === 14;
  }

  formatCNPJ(cnpj: string): string {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  validateBankAccount(bank: string, agency: string, account: string): boolean {
    // Implementar validação básica de conta bancária
    const cleanAgency = agency.replace(/\D/g, '');
    const cleanAccount = account.replace(/\D/g, '');
    return bank.length > 0 && cleanAgency.length >= 4 && cleanAccount.length >= 5;
  }
}

export const supplierService = new SupplierService(); 