import { describe, it, expect, vi, beforeEach } from 'vitest';
import { paymentService } from '../payment.service';
import api from '../../lib/api';
import type { AxiosResponse } from 'axios';

vi.mock('../../lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    url: 'test-url',
    method: 'GET',
    headers: {},
    baseURL: '',
    transformRequest: [],
    transformResponse: [],
    timeout: 0,
    xsrfCookieName: '',
    xsrfHeaderName: '',
    maxContentLength: 0,
    maxBodyLength: 0,
  },
});

describe('PaymentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('deve listar pagamentos com filtros', async () => {
      const mockResponse = mockAxiosResponse({
        items: [
          { id: '1', amount: 100, status: 'pending' as const },
          { id: '2', amount: 200, status: 'paid' as const },
        ],
        total: 2,
        page: 1,
        per_page: 10,
        total_pages: 1,
      });

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const filters = {
        status: 'pending' as const,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        page: 1,
        per_page: 10,
      };

      const result = await paymentService.list(filters);

      expect(api.get).toHaveBeenCalledWith('/payments', { params: filters });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('create', () => {
    it('deve criar um novo pagamento', async () => {
      const mockPayment = {
        amount: 1000,
        due_date: '2024-03-15',
        description: 'Test Payment',
        supplier_id: '1',
        payment_method: 'bank_transfer' as const,
        bank_details: {
          bank: '001',
          agency: '1234',
          account: '56789-0',
          account_type: 'checking' as const,
        },
      };

      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'pending',
        ...mockPayment,
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.create(mockPayment);

      expect(api.post).toHaveBeenCalledWith('/payments', mockPayment);
      expect(result).toEqual(mockResponse.data);
    });

    it('deve validar dados do pagamento antes de criar', async () => {
      const invalidPayment = {
        amount: -100, // Valor negativo
        due_date: 'invalid-date', // Data inválida
      };

      await expect(paymentService.create(invalidPayment)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('deve atualizar um pagamento existente', async () => {
      const mockPayment = {
        id: '1',
        amount: 1500,
        description: 'Updated Payment',
      };

      const mockResponse = mockAxiosResponse(mockPayment);

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.update('1', mockPayment);

      expect(api.put).toHaveBeenCalledWith('/payments/1', mockPayment);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    it('deve excluir um pagamento', async () => {
      const mockResponse = mockAxiosResponse({ success: true });

      vi.mocked(api.delete).mockResolvedValueOnce(mockResponse);

      await paymentService.delete('1');

      expect(api.delete).toHaveBeenCalledWith('/payments/1');
    });
  });

  describe('getById', () => {
    it('deve obter um pagamento por ID', async () => {
      const mockPayment = {
        id: '1',
        amount: 1000,
        status: 'pending' as const,
      };

      const mockResponse = mockAxiosResponse(mockPayment);

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.getById('1');

      expect(api.get).toHaveBeenCalledWith('/payments/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve retornar null quando pagamento não existe', async () => {
      vi.mocked(api.get).mockRejectedValueOnce({
        response: { status: 404 },
      });

      const result = await paymentService.getById('999');

      expect(result).toBeNull();
    });
  });

  describe('process', () => {
    it('deve processar um pagamento', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'processing' as const,
        processed_at: '2024-03-10T10:00:00Z',
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.process('1');

      expect(api.post).toHaveBeenCalledWith('/payments/1/process');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lidar com erros de processamento', async () => {
      vi.mocked(api.post).mockRejectedValueOnce({
        response: {
          status: 400,
          data: { message: 'Insufficient funds' },
        },
      });

      await expect(paymentService.process('1')).rejects.toThrow('Insufficient funds');
    });
  });

  describe('cancel', () => {
    it('deve cancelar um pagamento', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'cancelled' as const,
        cancelled_at: '2024-03-10T10:00:00Z',
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.cancel('1', 'Payment cancelled by user');

      expect(api.post).toHaveBeenCalledWith('/payments/1/cancel', {
        reason: 'Payment cancelled by user',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('retry', () => {
    it('deve tentar processar um pagamento novamente', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'processing' as const,
        retried_at: '2024-03-10T10:00:00Z',
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.retry('1');

      expect(api.post).toHaveBeenCalledWith('/payments/1/retry');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('attachments', () => {
    it('deve adicionar um anexo ao pagamento', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('file', mockFile);

      const mockResponse = mockAxiosResponse({
        id: '1',
        filename: 'test.pdf',
        url: 'https://example.com/test.pdf',
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.addAttachment('1', mockFile);

      expect(api.post).toHaveBeenCalledWith('/payments/1/attachments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('deve remover um anexo do pagamento', async () => {
      const mockResponse = mockAxiosResponse({ success: true });

      vi.mocked(api.delete).mockResolvedValueOnce(mockResponse);

      await paymentService.removeAttachment('1', 'attachment-1');

      expect(api.delete).toHaveBeenCalledWith('/payments/1/attachments/attachment-1');
    });

    it('deve listar anexos de um pagamento', async () => {
      const mockResponse = mockAxiosResponse([
        {
          id: '1',
          filename: 'invoice.pdf',
          url: 'https://example.com/invoice.pdf',
        },
        {
          id: '2',
          filename: 'receipt.pdf',
          url: 'https://example.com/receipt.pdf',
        },
      ]);

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await paymentService.listAttachments('1');

      expect(api.get).toHaveBeenCalledWith('/payments/1/attachments');
      expect(result).toEqual(mockResponse.data);
    });
  });
}); 