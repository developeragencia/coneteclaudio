import axios from 'axios';
import { CNPJResponse } from '@/types/audit.types';

export class CNPJService {
  private static readonly API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
  private static readonly BASE_URL = 'https://www.cnpj.ws/api/v1';

  static async fetchCNPJData(cnpj: string): Promise<CNPJResponse> {
    try {
      const response = await axios.get(`${this.BASE_URL}/cnpj/${cnpj}`, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do CNPJ:', error);
      throw new Error('Falha ao consultar CNPJ');
    }
  }
} 