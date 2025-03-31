export interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: string;
  data_situacao_cadastral: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
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
  porte: string;
  capital_social: number;
  data_abertura: string;
}

export interface CNPJError {
  error: string;
  message: string;
  status: number;
} 