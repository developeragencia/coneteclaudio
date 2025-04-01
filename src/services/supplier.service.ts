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

  formatBankBranch(branch: string): string {
    const cleanBranch = branch.replace(/\D/g, '');
    return cleanBranch.replace(/(\d{4})(\d*)/, '$1-$2');
  }

  formatBankAccount(account: string): string {
    const cleanAccount = account.replace(/\D/g, '');
    return cleanAccount.replace(/(\d{1,})(\d{1})$/, '$1-$2');
  }

  validatePixKey(key: string, type: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random'): boolean {
    switch (type) {
      case 'cpf':
        return /^\d{11}$/.test(key.replace(/\D/g, ''));
      case 'cnpj':
        return /^\d{14}$/.test(key.replace(/\D/g, ''));
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
      case 'phone':
        return /^\d{11}$/.test(key.replace(/\D/g, ''));
      case 'random':
        return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key);
      default:
        return false;
    }
  }

  formatPixKey(key: string, type: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random'): string {
    switch (type) {
      case 'cpf':
        const cleanCPF = key.replace(/\D/g, '');
        return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 'cnpj':
        return this.formatCNPJ(key);
      case 'phone':
        const cleanPhone = key.replace(/\D/g, '');
        return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      default:
        return key;
    }
  }
}

export const supplierService = new SupplierService(); 