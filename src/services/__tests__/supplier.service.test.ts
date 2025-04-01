import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supplierService } from '../supplier.service';
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

describe('SupplierService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('deve listar fornecedores com filtros', async () => {
      const mockResponse = mockAxiosResponse({
        items: [
          { id: '1', name: 'Supplier 1', status: 'active' as const },
          { id: '2', name: 'Supplier 2', status: 'inactive' as const },
        ],
        total: 2,
        page: 1,
        per_page: 10,
        total_pages: 1,
      });

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const filters = {
        search: 'test',
        status: 'active' as const,
        page: 1,
        per_page: 10,
      };

      const result = await supplierService.list(filters);

      expect(api.get).toHaveBeenCalledWith('/suppliers', { params: filters });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('create', () => {
    it('deve criar um novo fornecedor', async () => {
      const mockSupplier = {
        name: 'Test Supplier',
        document: '12345678901234',
        email: 'test@example.com',
        phone: '1234567890',
        address: {
          street: 'Test Street',
          number: '123',
          complement: 'Apt 4',
          neighborhood: 'Test Neighborhood',
          city: 'Test City',
          state: 'TS',
          zip_code: '12345678',
        },
        contact: {
          name: 'Contact Person',
          email: 'contact@example.com',
          phone: '0987654321',
          role: 'Manager',
        },
      };

      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'active',
        ...mockSupplier,
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await supplierService.create(mockSupplier);

      expect(api.post).toHaveBeenCalledWith('/suppliers', mockSupplier);
      expect(result).toEqual(mockResponse.data);
    });

    it('deve validar dados do fornecedor antes de criar', async () => {
      const invalidSupplier = {
        name: '', // Nome vazio
        document: 'invalid', // CNPJ inválido
        email: 'invalid-email', // Email inválido
      };

      await expect(supplierService.create(invalidSupplier)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('deve atualizar um fornecedor existente', async () => {
      const mockSupplier = {
        id: '1',
        name: 'Updated Supplier',
        email: 'updated@example.com',
      };

      const mockResponse = mockAxiosResponse(mockSupplier);

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await supplierService.update('1', mockSupplier);

      expect(api.put).toHaveBeenCalledWith('/suppliers/1', mockSupplier);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    it('deve excluir um fornecedor', async () => {
      const mockResponse = mockAxiosResponse({ success: true });

      vi.mocked(api.delete).mockResolvedValueOnce(mockResponse);

      await supplierService.delete('1');

      expect(api.delete).toHaveBeenCalledWith('/suppliers/1');
    });
  });

  describe('getById', () => {
    it('deve obter um fornecedor por ID', async () => {
      const mockSupplier = {
        id: '1',
        name: 'Test Supplier',
        status: 'active',
      };

      const mockResponse = mockAxiosResponse(mockSupplier);

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await supplierService.getById('1');

      expect(api.get).toHaveBeenCalledWith('/suppliers/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve retornar null quando fornecedor não existe', async () => {
      vi.mocked(api.get).mockRejectedValueOnce({
        response: { status: 404 },
      });

      const result = await supplierService.getById('999');

      expect(result).toBeNull();
    });
  });

  describe('activate/deactivate', () => {
    it('deve ativar um fornecedor', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'active',
      });

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await supplierService.activate('1');

      expect(api.put).toHaveBeenCalledWith('/suppliers/1/activate');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve desativar um fornecedor', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'inactive',
      });

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await supplierService.deactivate('1');

      expect(api.put).toHaveBeenCalledWith('/suppliers/1/deactivate');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('validateDocument', () => {
    it('deve validar CNPJ válido', () => {
      const validCNPJ = '12345678901234';
      expect(supplierService.validateDocument(validCNPJ)).toBe(true);
    });

    it('deve rejeitar CNPJ inválido', () => {
      const invalidCNPJ = '123';
      expect(supplierService.validateDocument(invalidCNPJ)).toBe(false);
    });
  });

  describe('formatDocument', () => {
    it('deve formatar CNPJ corretamente', () => {
      const cnpj = '12345678901234';
      expect(supplierService.formatDocument(cnpj)).toBe('12.345.678/9012-34');
    });

    it('deve retornar documento original se formato inválido', () => {
      const invalidDoc = '123';
      expect(supplierService.formatDocument(invalidDoc)).toBe(invalidDoc);
    });
  });
}); 