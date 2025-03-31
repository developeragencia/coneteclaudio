import { supabase } from '@/lib/supabase';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ClientFilter {
  searchTerm?: string;
  status?: Client['status'];
}

export class ClientService {
  private static TABLE_NAME = 'clients';

  static async getClients(filter?: ClientFilter): Promise<Client[]> {
    let query = supabase
      .from(this.TABLE_NAME)
      .select('*')
      .order('name');

    if (filter) {
      if (filter.status) {
        query = query.eq('status', filter.status);
      }

      if (filter.searchTerm) {
        query = query.or(`name.ilike.%${filter.searchTerm}%,cnpj.ilike.%${filter.searchTerm}%`);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching clients: ${error.message}`);
    }

    return data;
  }

  static async getClientById(id: string): Promise<Client> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching client: ${error.message}`);
    }

    return data;
  }

  static async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        ...client,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating client: ${error.message}`);
    }

    return data;
  }

  static async updateClient(id: string, client: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update({
        ...client,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating client: ${error.message}`);
    }

    return data;
  }

  static async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting client: ${error.message}`);
    }
  }

  static async validateCNPJ(cnpj: string): Promise<boolean> {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Verificar se tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Validar dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  }

  static async checkCNPJExists(cnpj: string): Promise<boolean> {
    const { count, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact' })
      .eq('cnpj', cnpj);

    if (error) {
      throw new Error(`Error checking CNPJ: ${error.message}`);
    }

    return count > 0;
  }

  static formatCNPJ(cnpj: string): string {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Formatar CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

  static async getClientByCNPJ(cnpj: string): Promise<Client> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('cnpj', cnpj)
      .single();

    if (error) {
      throw new Error(`Error fetching client by CNPJ: ${error.message}`);
    }

    return data;
  }
} 