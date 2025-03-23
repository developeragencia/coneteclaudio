import api from '@/lib/api';
import { Client } from '@/types/user';

interface GetClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  type?: 'public' | 'private';
  assignedOnly?: boolean;
  salesRepOnly?: boolean;
}

interface ClientsResponse {
  data: Client[];
  total: number;
  page: number;
  totalPages: number;
}

interface CreateClientData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  type: 'public' | 'private';
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contacts: {
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];
  salesRepId?: string;
  contractNumber?: string;
  contractStartDate?: string;
  contractEndDate?: string;
}

interface UpdateClientData extends Partial<CreateClientData> {
  status?: 'active' | 'inactive' | 'pending';
  logo?: File;
}

interface AssignUserData {
  userId: string;
  role: string;
}

export const clientService = {
  async getClients({
    page = 1,
    limit = 10,
    search,
    status,
    type,
    assignedOnly = false,
    salesRepOnly = false,
  }: GetClientsParams = {}): Promise<ClientsResponse> {
    try {
      const response = await api.get<ClientsResponse>('/clients', {
        params: {
          page,
          limit,
          search,
          status,
          type,
          assignedOnly,
          salesRepOnly,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },

  async getClientById(id: string): Promise<Client> {
    try {
      const response = await api.get<Client>(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  },

  async createClient(data: CreateClientData): Promise<Client> {
    try {
      const response = await api.post<Client>('/clients', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },

  async updateClient(id: string, data: UpdateClientData): Promise<Client> {
    try {
      let formData: FormData | UpdateClientData = data;

      if (data.logo instanceof File) {
        formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'logo' && value instanceof File) {
            formData.append('logo', value);
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        });
      }

      const response = await api.put<Client>(`/clients/${id}`, formData, {
        headers: data.logo instanceof File
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
      await api.delete(`/clients/${id}`);
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw error;
    }
  },

  async assignUser(clientId: string, data: AssignUserData): Promise<Client> {
    try {
      const response = await api.post<Client>(
        `/clients/${clientId}/assign-user`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atribuir usuário ao cliente:', error);
      throw error;
    }
  },

  async unassignUser(clientId: string, userId: string): Promise<Client> {
    try {
      const response = await api.delete<Client>(
        `/clients/${clientId}/users/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao remover usuário do cliente:', error);
      throw error;
    }
  },

  async validateCNPJ(cnpj: string): Promise<boolean> {
    try {
      const response = await api.get<{ valid: boolean }>('/clients/validate-cnpj', {
        params: { cnpj },
      });
      return response.data.valid;
    } catch (error) {
      console.error('Erro ao validar CNPJ:', error);
      throw error;
    }
  },

  async importClients(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post('/clients/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Erro ao importar clientes:', error);
      throw error;
    }
  },

  async exportClients(): Promise<Blob> {
    try {
      const response = await api.get('/clients/export', {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar clientes:', error);
      throw error;
    }
  },
}; 