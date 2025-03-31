export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      fornecedores: {
        Row: {
          id: string
          cnpj: string
          razao_social: string
          nome_fantasia: string
          atividade_principal: string
          atividade_secundaria: string[]
          natureza_juridica: string
          logradouro: string
          numero: string
          complemento: string
          cep: string
          bairro: string
          municipio: string
          uf: string
          email: string
          telefone: string
          data_situacao: string
          situacao: string
          capital_social: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cnpj: string
          razao_social: string
          nome_fantasia?: string
          atividade_principal: string
          atividade_secundaria?: string[]
          natureza_juridica: string
          logradouro?: string
          numero?: string
          complemento?: string
          cep?: string
          bairro?: string
          municipio?: string
          uf?: string
          email?: string
          telefone?: string
          data_situacao: string
          situacao: string
          capital_social?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cnpj?: string
          razao_social?: string
          nome_fantasia?: string
          atividade_principal?: string
          atividade_secundaria?: string[]
          natureza_juridica?: string
          logradouro?: string
          numero?: string
          complemento?: string
          cep?: string
          bairro?: string
          municipio?: string
          uf?: string
          email?: string
          telefone?: string
          data_situacao?: string
          situacao?: string
          capital_social?: number
          updated_at?: string
        }
      }
      clientes: {
        Row: {
          id: string
          cnpj: string
          razao_social: string
          nome_fantasia: string
          contato_nome: string
          contato_email: string
          contato_telefone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cnpj: string
          razao_social: string
          nome_fantasia?: string
          contato_nome: string
          contato_email: string
          contato_telefone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cnpj?: string
          razao_social?: string
          nome_fantasia?: string
          contato_nome?: string
          contato_email?: string
          contato_telefone?: string
          updated_at?: string
        }
      }
      pagamentos: {
        Row: {
          id: string
          cliente_id: string
          fornecedor_id: string
          data_pagamento: string
          valor: number
          descricao: string
          numero_nota: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cliente_id: string
          fornecedor_id: string
          data_pagamento: string
          valor: number
          descricao: string
          numero_nota: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string
          fornecedor_id?: string
          data_pagamento?: string
          valor?: number
          descricao?: string
          numero_nota?: string
          updated_at?: string
        }
      }
      aliquotas_retencao: {
        Row: {
          id: string
          codigo_atividade: string
          descricao_atividade: string
          aliquota_ir: number
          aliquota_pis: number
          aliquota_cofins: number
          aliquota_csll: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          codigo_atividade: string
          descricao_atividade: string
          aliquota_ir: number
          aliquota_pis: number
          aliquota_cofins: number
          aliquota_csll: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          codigo_atividade?: string
          descricao_atividade?: string
          aliquota_ir?: number
          aliquota_pis?: number
          aliquota_cofins?: number
          aliquota_csll?: number
          updated_at?: string
        }
      }
      auditorias: {
        Row: {
          id: string
          pagamento_id: string
          fornecedor_id: string
          aliquota_id: string
          valor_base: number
          valor_ir: number
          valor_pis: number
          valor_cofins: number
          valor_csll: number
          status: string
          observacoes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pagamento_id: string
          fornecedor_id: string
          aliquota_id: string
          valor_base: number
          valor_ir: number
          valor_pis: number
          valor_cofins: number
          valor_csll: number
          status: string
          observacoes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pagamento_id?: string
          fornecedor_id?: string
          aliquota_id?: string
          valor_base?: number
          valor_ir?: number
          valor_pis?: number
          valor_cofins?: number
          valor_csll?: number
          status?: string
          observacoes?: string
          updated_at?: string
        }
      }
    }
  }
} 