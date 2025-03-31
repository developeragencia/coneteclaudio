export interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cnae_fiscal: string;
  cnae_fiscal_descricao: string;
  natureza_juridica: string;
  situacao_cadastral: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
}

export interface RetentionRule {
  cnae: string;
  description: string;
  irrf_percent: number;
  pis_percent: number;
  cofins_percent: number;
  csll_percent: number;
  inss_percent: number;
  iss_percent: number;
}

export interface Payment {
  id: string;
  supplier_id: string;
  client_id: string;
  date: Date;
  value: number;
  description: string;
  status: 'pending' | 'processed' | 'audited';
}

export interface AuditResult {
  payment_id: string;
  supplier_data: CNPJResponse;
  original_value: number;
  retentions: {
    irrf: number;
    pis: number;
    cofins: number;
    csll: number;
    inss: number;
    iss: number;
  };
  net_value: number;
} 