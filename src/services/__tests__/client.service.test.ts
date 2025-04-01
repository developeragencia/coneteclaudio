import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clientService } from '../client.service';
import api from '../../lib/api';
import type { AxiosResponse } from 'axios';
import { type Client } from '@/types/models';

// Mock do módulo api
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

describe('ClientService', () => {
  const mockClient: Client = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Empresa Teste',
    document: '12345678901234',
    email: 'contato@empresa.com',
    phone: '11999999999',
    address: {
      street: 'Rua Teste',
      number: '123',
      district: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
    },
    contacts: [
      {
        name: 'João Silva',
        email: 'joao@empresa.com',
        phone: '11988888888',
        role: 'Gerente',
      },
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('deve listar clientes com filtros', async () => {
      const mockResponse = mockAxiosResponse({
        items: [
          { id: '1', name: 'Client 1', status: 'active' as const },
          { id: '2', name: 'Client 2', status: 'inactive' as const },
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

      const result = await clientService.list(filters);

      expect(api.get).toHaveBeenCalledWith('/clients', { params: filters });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('create', () => {
    it('deve criar um novo cliente', async () => {
      const mockClient = {
        name: 'Test Client',
        document: '12345678901',
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
        ...mockClient,
      });

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await clientService.create(mockClient);

      expect(api.post).toHaveBeenCalledWith('/clients', mockClient);
      expect(result).toEqual(mockResponse.data);
    });

    it('deve validar dados do cliente antes de criar', async () => {
      const invalidClient = {
        name: '', // Nome vazio
        document: 'invalid', // CPF/CNPJ inválido
        email: 'invalid-email', // Email inválido
      };

      await expect(clientService.create(invalidClient)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('deve atualizar um cliente existente', async () => {
      const mockClient = {
        id: '1',
        name: 'Updated Client',
        email: 'updated@example.com',
      };

      const mockResponse = mockAxiosResponse(mockClient);

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await clientService.update('1', mockClient);

      expect(api.put).toHaveBeenCalledWith('/clients/1', mockClient);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    it('deve excluir um cliente', async () => {
      const mockResponse = mockAxiosResponse({ success: true });

      vi.mocked(api.delete).mockResolvedValueOnce(mockResponse);

      await clientService.delete('1');

      expect(api.delete).toHaveBeenCalledWith('/clients/1');
    });
  });

  describe('getById', () => {
    it('deve obter um cliente por ID', async () => {
      const mockClient = {
        id: '1',
        name: 'Test Client',
        status: 'active',
      };

      const mockResponse = mockAxiosResponse(mockClient);

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await clientService.getById('1');

      expect(api.get).toHaveBeenCalledWith('/clients/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve retornar null quando cliente não existe', async () => {
      vi.mocked(api.get).mockRejectedValueOnce({
        response: { status: 404 },
      });

      const result = await clientService.getById('999');

      expect(result).toBeNull();
    });
  });

  describe('activate/deactivate', () => {
    it('deve ativar um cliente', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'active',
      });

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await clientService.activate('1');

      expect(api.put).toHaveBeenCalledWith('/clients/1/activate');
      expect(result).toEqual(mockResponse.data);
    });

    it('deve desativar um cliente', async () => {
      const mockResponse = mockAxiosResponse({
        id: '1',
        status: 'inactive',
      });

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await clientService.deactivate('1');

      expect(api.put).toHaveBeenCalledWith('/clients/1/deactivate');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('validateDocument', () => {
    it('deve validar CPF válido', () => {
      const validCPF = '12345678901';
      expect(clientService.validateDocument(validCPF)).toBe(true);
    });

    it('deve validar CNPJ válido', () => {
      const validCNPJ = '12345678901234';
      expect(clientService.validateDocument(validCNPJ)).toBe(true);
    });

    it('deve rejeitar documentos inválidos', () => {
      const invalidDoc = '123';
      expect(clientService.validateDocument(invalidDoc)).toBe(false);
    });
  });

  describe('formatDocument', () => {
    it('deve formatar CPF corretamente', () => {
      const cpf = '12345678901';
      expect(clientService.formatDocument(cpf)).toBe('123.456.789-01');
    });

    it('deve formatar CNPJ corretamente', () => {
      const cnpj = '12345678901234';
      expect(clientService.formatDocument(cnpj)).toBe('12.345.678/9012-34');
    });

    it('deve retornar documento original se formato inválido', () => {
      const invalidDoc = '123';
      expect(clientService.formatDocument(invalidDoc)).toBe(invalidDoc);
    });
  });
}); 