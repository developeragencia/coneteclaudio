import { Supplier, SupplierFilter } from '@/types/supplier.types';
import { supabase } from '@/lib/supabase';

export interface Supplier {
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
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  bankAccountType: 'checking' | 'savings';
  pixKey?: string;
  pixKeyType?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  createdAt: string;
  updatedAt: string;
}

export interface SupplierFilter {
  searchTerm?: string;
  status?: Supplier['status'];
}

export class SupplierService {
  private static readonly TABLE_NAME = 'suppliers';

  static async getSuppliers(filter?: SupplierFilter): Promise<Supplier[]> {
    try {
      let query = supabase.from(this.TABLE_NAME).select('*');

    if (filter?.searchTerm) {
      query = query.or(`name.ilike.%${filter.searchTerm}%,cnpj.ilike.%${filter.searchTerm}%`);
    }

    if (filter?.status) {
      query = query.eq('status', filter.status);
    }

    const { data, error } = await query;

    if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return [];
    }
  }

  static async getSupplierById(id: string): Promise<Supplier> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching supplier: ${error.message}`);
    }

    return data;
  }

  static async createSupplier(supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Supplier | null> {
    try {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
        .insert([supplier])
      .select()
      .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating supplier:', error);
      return null;
    }
  }

  static async updateSupplier(id: string, supplier: Partial<Supplier>): Promise<Supplier | null> {
    try {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
        .update(supplier)
      .eq('id', id)
      .select()
      .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating supplier:', error);
      return null;
    }
  }

  static async deleteSupplier(id: string): Promise<boolean> {
    try {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return false;
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

  static async getSupplierByCNPJ(cnpj: string): Promise<Supplier> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('cnpj', cnpj)
      .single();

    if (error) {
      throw new Error(`Error fetching supplier by CNPJ: ${error.message}`);
    }

    return data;
  }

  static formatBankAccount(account: string): string {
    // Remover caracteres não numéricos
    account = account.replace(/[^\d]/g, '');

    // Formatar conta: XXXXX-X
    return account.replace(/^(\d+)(\d)$/, '$1-$2');
  }

  static formatBankBranch(branch: string): string {
    // Remover caracteres não numéricos
    branch = branch.replace(/[^\d]/g, '');

    // Formatar agência: XXXX
    return branch.padStart(4, '0');
  }

  static validatePixKey(key: string, type: Supplier['pixKeyType']): boolean {
    if (!key || !type) return true; // Chave PIX é opcional

    switch (type) {
      case 'cpf':
        return /^\d{11}$/.test(key.replace(/[^\d]/g, ''));
      case 'cnpj':
        return this.validateCNPJ(key);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
      case 'phone':
        return /^\d{10,11}$/.test(key.replace(/[^\d]/g, ''));
      case 'random':
        return /^[a-zA-Z0-9]{32}$/.test(key);
      default:
        return false;
    }
  }

  static formatPixKey(key: string, type: Supplier['pixKeyType']): string {
    if (!key || !type) return key;

    switch (type) {
      case 'cpf':
        return key.replace(/[^\d]/g, '').replace(
          /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
          '$1.$2.$3-$4'
        );
      case 'cnpj':
        return this.formatCNPJ(key);
      case 'phone':
        const cleaned = key.replace(/[^\d]/g, '');
        return cleaned.length === 11
          ? cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
          : cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      default:
        return key;
    }
  }
} 