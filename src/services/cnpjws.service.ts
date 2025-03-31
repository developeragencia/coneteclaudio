import axios from 'axios';

const API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
const BASE_URL = 'https://www.cnpj.ws/api/v1';

interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  atividade_principal: {
    codigo: string;
    descricao: string;
  };
  atividades_secundarias: Array<{
    codigo: string;
    descricao: string;
  }>;
  natureza_juridica: {
    codigo: string;
    descricao: string;
  };
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    bairro: string;
    municipio: string;
    uf: string;
  };
  email: string;
  telefone: string;
  data_situacao: string;
  situacao: string;
  capital_social: number;
}

export class CNPJWSService {
  private static instance: CNPJWSService;
  private constructor() {}

  public static getInstance(): CNPJWSService {
    if (!CNPJWSService.instance) {
      CNPJWSService.instance = new CNPJWSService();
    }
    return CNPJWSService.instance;
  }

  private async request(endpoint: string) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`CNPJ.ws API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  public async consultarCNPJ(cnpj: string): Promise<CNPJResponse> {
    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
    return this.request(`/cnpj/${cnpjLimpo}`);
  }

  public async consultarCNPJBatch(cnpjs: string[]): Promise<CNPJResponse[]> {
    const cnpjsLimpos = cnpjs.map(cnpj => cnpj.replace(/[^\d]/g, ''));
    return this.request(`/cnpj/batch?cnpjs=${cnpjsLimpos.join(',')}`);
  }
}

export const cnpjwsService = CNPJWSService.getInstance(); 