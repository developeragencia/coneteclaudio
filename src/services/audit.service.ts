import { supabase } from '@/lib/supabase';
import { CNPJService } from './cnpj.service';
import { Payment, AuditResult, RetentionRule } from '@/types/audit.types';

export class AuditService {
  static async processPayments(clientId: string): Promise<Payment[]> {
    // Buscar pagamentos do cliente
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('client_id', clientId)
      .eq('status', 'pending');

    if (error) throw error;
    return payments;
  }

  static async getSupplierData(cnpj: string) {
    // Verificar se fornecedor já existe no banco
    let { data: supplier } = await supabase
      .from('suppliers')
      .select('*')
      .eq('cnpj', cnpj)
      .single();

    if (!supplier) {
      // Buscar dados na API e salvar no banco
      const cnpjData = await CNPJService.fetchCNPJData(cnpj);
      const { data, error } = await supabase
        .from('suppliers')
        .insert([cnpjData])
        .select()
        .single();

      if (error) throw error;
      supplier = data;
    }

    return supplier;
  }

  static async getRetentionRules(cnae: string): Promise<RetentionRule> {
    const { data, error } = await supabase
      .from('retention_rules')
      .select('*')
      .eq('cnae', cnae)
      .single();

    if (error) throw error;
    return data;
  }

  static async auditPayment(payment: Payment): Promise<AuditResult> {
    // Buscar dados do fornecedor
    const supplier = await this.getSupplierData(payment.supplier_id);
    
    // Buscar regras de retenção
    const rules = await this.getRetentionRules(supplier.cnae_fiscal);

    // Calcular retenções
    const retentions = {
      irrf: payment.value * (rules.irrf_percent / 100),
      pis: payment.value * (rules.pis_percent / 100),
      cofins: payment.value * (rules.cofins_percent / 100),
      csll: payment.value * (rules.csll_percent / 100),
      inss: payment.value * (rules.inss_percent / 100),
      iss: payment.value * (rules.iss_percent / 100),
    };

    // Calcular valor líquido
    const net_value = payment.value - Object.values(retentions).reduce((a, b) => a + b, 0);

    // Atualizar status do pagamento
    await supabase
      .from('payments')
      .update({ status: 'audited' })
      .eq('id', payment.id);

    return {
      payment_id: payment.id,
      supplier_data: supplier,
      original_value: payment.value,
      retentions,
      net_value
    };
  }
} 