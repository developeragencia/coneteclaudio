import api, { type ApiResponse, type PaginatedResponse } from './api';
import { type Client, clientSchema } from '@/types/models';

export interface ClientFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  page?: number;
  per_page?: number;
}

class ClientService {
  private validate(data: unknown): Client {
    return clientSchema.parse(data);
  }

  async list(filters: ClientFilters = {}): Promise<PaginatedResponse<Client[]>> {
    const response = await api.get<PaginatedResponse<Client[]>>('/clients', { params: filters });
    return {
      ...response.data,
      data: response.data.data.map(client => this.validate(client))
    };
  }

  async create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Client>> {
    const response = await api.post<ApiResponse<Client>>('/clients', data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async update(id: string, data: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<Client>> {
    const response = await api.put<ApiResponse<Client>>(`/clients/${id}`, data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/clients/${id}`);
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<Client>> {
    const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  // Métodos auxiliares
  async activate(id: string): Promise<ApiResponse<Client>> {
    return this.update(id, { status: 'active' });
  }

  async deactivate(id: string): Promise<ApiResponse<Client>> {
    return this.update(id, { status: 'inactive' });
  }

  // Validações específicas
  validateDocument(document: string): boolean {
    // Implementar validação de CPF/CNPJ
    const cleanDocument = document.replace(/\D/g, '');
    return cleanDocument.length === 11 || cleanDocument.length === 14;
  }

  formatDocument(document: string): string {
    const cleanDocument = document.replace(/\D/g, '');
    if (cleanDocument.length === 11) {
      return cleanDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cleanDocument.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}

export const clientService = new ClientService(); 