import api, { type ApiResponse, type PaginatedResponse } from './api';
import { type Payment, paymentSchema } from '@/types/models';

export interface PaymentFilters {
  search?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  supplierId?: string;
  startDate?: string;
  endDate?: string;
  type?: 'invoice' | 'bill' | 'transfer';
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  per_page?: number;
}

class PaymentService {
  private validate(data: unknown): Payment {
    return paymentSchema.parse(data);
  }

  async list(filters: PaymentFilters = {}): Promise<PaginatedResponse<Payment[]>> {
    const response = await api.get<PaginatedResponse<Payment[]>>('/payments', { params: filters });
    return {
      ...response.data,
      data: response.data.data.map(payment => this.validate(payment))
    };
  }

  async create(data: Omit<Payment, 'id' | 'status' | 'processingDetails' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Payment>> {
    const response = await api.post<ApiResponse<Payment>>('/payments', data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async update(id: string, data: Partial<Omit<Payment, 'id' | 'status' | 'processingDetails' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<Payment>> {
    const response = await api.put<ApiResponse<Payment>>(`/payments/${id}`, data);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/payments/${id}`);
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<Payment>> {
    const response = await api.get<ApiResponse<Payment>>(`/payments/${id}`);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  // Métodos de processamento
  async process(id: string): Promise<ApiResponse<Payment>> {
    const response = await api.post<ApiResponse<Payment>>(`/payments/${id}/process`);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async cancel(id: string, reason: string): Promise<ApiResponse<Payment>> {
    const response = await api.post<ApiResponse<Payment>>(`/payments/${id}/cancel`, { reason });
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  async retry(id: string): Promise<ApiResponse<Payment>> {
    const response = await api.post<ApiResponse<Payment>>(`/payments/${id}/retry`);
    return {
      ...response.data,
      data: this.validate(response.data.data)
    };
  }

  // Métodos auxiliares
  async uploadAttachment(id: string, file: File): Promise<ApiResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<string>>(`/payments/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  async removeAttachment(id: string, attachmentUrl: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/payments/${id}/attachments`, {
      data: { url: attachmentUrl },
    });
    return response.data;
  }

  // Validações e formatações
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }

  validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000; // Limite de 1 milhão por pagamento
  }

  validateDueDate(dueDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate >= today;
  }
}

export const paymentService = new PaymentService(); 