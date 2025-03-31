import { supabase } from '@/lib/supabase';
import { cnpjwsService } from './cnpjws.service';
import type { Database } from '@/types/database.types';

type Fornecedor = Database['public']['Tables']['fornecedores']['Row'];
type Cliente = Database['public']['Tables']['clientes']['Row'];
type Pagamento = Database['public']['Tables']['pagamentos']['Row'];
type AliquotaRetencao = Database['public']['Tables']['aliquotas_retencao']['Row'];
type Auditoria = Database['public']['Tables']['auditorias']['Row'];

export class AuditoriaService {
  private static instance: AuditoriaService;

  private constructor() {}

  public static getInstance(): AuditoriaService {
    if (!AuditoriaService.instance) {
      AuditoriaService.instance = new AuditoriaService();
    }
    return AuditoriaService.instance;
  }

  // Busca ou cria um fornecedor baseado no CNPJ
  async obterOuCriarFornecedor(cnpj: string): Promise<Fornecedor> {
    const { data: fornecedor } = await supabase
      .from('fornecedores')
      .select()
      .eq('cnpj', cnpj)
      .single();

    if (fornecedor) {
      return fornecedor;
    }

    // Se não encontrou, busca na API do CNPJ.ws
    const dadosCNPJ = await cnpjwsService.consultarCNPJ(cnpj);

    // Insere o novo fornecedor
    const { data: novoFornecedor, error } = await supabase
      .from('fornecedores')
      .insert({
        cnpj: dadosCNPJ.cnpj,
        razao_social: dadosCNPJ.razao_social,
        nome_fantasia: dadosCNPJ.nome_fantasia,
        atividade_principal: dadosCNPJ.atividade_principal.descricao,
        atividade_secundaria: dadosCNPJ.atividades_secundarias.map(a => a.descricao),
        natureza_juridica: dadosCNPJ.natureza_juridica.descricao,
        logradouro: dadosCNPJ.endereco.logradouro,
        numero: dadosCNPJ.endereco.numero,
        complemento: dadosCNPJ.endereco.complemento,
        cep: dadosCNPJ.endereco.cep,
        bairro: dadosCNPJ.endereco.bairro,
        municipio: dadosCNPJ.endereco.municipio,
        uf: dadosCNPJ.endereco.uf,
        email: dadosCNPJ.email,
        telefone: dadosCNPJ.telefone,
        data_situacao: dadosCNPJ.data_situacao,
        situacao: dadosCNPJ.situacao,
        capital_social: dadosCNPJ.capital_social
      })
      .select()
      .single();

    if (error) throw error;
    return novoFornecedor;
  }

  // Processa pagamentos de um cliente
  async processarPagamentos(clienteId: string, pagamentos: Array<{
    fornecedor_cnpj: string;
    data_pagamento: string;
    valor: number;
    descricao: string;
    numero_nota: string;
  }>) {
    const fornecedoresCNPJ = [...new Set(pagamentos.map(p => p.fornecedor_cnpj))];
    
    // Busca ou cria todos os fornecedores necessários
    const fornecedores = await Promise.all(
      fornecedoresCNPJ.map(cnpj => this.obterOuCriarFornecedor(cnpj))
    );

    // Mapa de CNPJ para ID do fornecedor
    const fornecedoresMap = fornecedores.reduce((acc, f) => {
      acc[f.cnpj] = f.id;
      return acc;
    }, {} as Record<string, string>);

    // Insere os pagamentos
    const { data: pagamentosInseridos, error } = await supabase
      .from('pagamentos')
      .insert(
        pagamentos.map(p => ({
          cliente_id: clienteId,
          fornecedor_id: fornecedoresMap[p.fornecedor_cnpj],
          data_pagamento: p.data_pagamento,
          valor: p.valor,
          descricao: p.descricao,
          numero_nota: p.numero_nota
        }))
      )
      .select();

    if (error) throw error;
    return pagamentosInseridos;
  }

  // Realiza a auditoria de um pagamento
  async auditarPagamento(pagamentoId: string) {
    // Busca o pagamento com informações do fornecedor
    const { data: pagamento } = await supabase
      .from('pagamentos')
      .select(`
        *,
        fornecedores (
          *
        )
      `)
      .eq('id', pagamentoId)
      .single();

    if (!pagamento) throw new Error('Pagamento não encontrado');

    // Busca a alíquota baseada na atividade principal do fornecedor
    const { data: aliquota } = await supabase
      .from('aliquotas_retencao')
      .select()
      .eq('codigo_atividade', pagamento.fornecedores.atividade_principal)
      .single();

    if (!aliquota) throw new Error('Alíquota não encontrada para esta atividade');

    // Calcula os valores de retenção
    const valorBase = pagamento.valor;
    const valorIR = valorBase * (aliquota.aliquota_ir / 100);
    const valorPIS = valorBase * (aliquota.aliquota_pis / 100);
    const valorCOFINS = valorBase * (aliquota.aliquota_cofins / 100);
    const valorCSLL = valorBase * (aliquota.aliquota_csll / 100);

    // Cria o registro de auditoria
    const { data: auditoria, error } = await supabase
      .from('auditorias')
      .insert({
        pagamento_id: pagamentoId,
        fornecedor_id: pagamento.fornecedor_id,
        aliquota_id: aliquota.id,
        valor_base: valorBase,
        valor_ir: valorIR,
        valor_pis: valorPIS,
        valor_cofins: valorCOFINS,
        valor_csll: valorCSLL,
        status: 'CONCLUIDO',
        observacoes: 'Auditoria realizada automaticamente'
      })
      .select()
      .single();

    if (error) throw error;
    return auditoria;
  }

  // Busca auditorias por cliente
  async buscarAuditoriasCliente(clienteId: string) {
    const { data: auditorias, error } = await supabase
      .from('auditorias')
      .select(`
        *,
        pagamentos (
          *,
          fornecedores (
            *
          )
        ),
        aliquotas_retencao (
          *
        )
      `)
      .eq('pagamentos.cliente_id', clienteId);

    if (error) throw error;
    return auditorias;
  }

  // Gera relatório de retenções
  async gerarRelatorioRetencoes(clienteId: string, periodo: { inicio: string; fim: string }) {
    const { data: auditorias } = await supabase
      .from('auditorias')
      .select(`
        *,
        pagamentos!inner (
          *,
          fornecedores (
            *
          )
        )
      `)
      .eq('pagamentos.cliente_id', clienteId)
      .gte('pagamentos.data_pagamento', periodo.inicio)
      .lte('pagamentos.data_pagamento', periodo.fim);

    if (!auditorias) return null;

    const totais = auditorias.reduce((acc, auditoria) => {
      acc.valor_base += auditoria.valor_base;
      acc.valor_ir += auditoria.valor_ir;
      acc.valor_pis += auditoria.valor_pis;
      acc.valor_cofins += auditoria.valor_cofins;
      acc.valor_csll += auditoria.valor_csll;
      return acc;
    }, {
      valor_base: 0,
      valor_ir: 0,
      valor_pis: 0,
      valor_cofins: 0,
      valor_csll: 0
    });

    return {
      auditorias,
      totais,
      periodo
    };
  }
}

export const auditoriaService = AuditoriaService.getInstance(); 