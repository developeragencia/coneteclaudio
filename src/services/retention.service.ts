import { supabase } from '@/lib/supabase';
import { 
  RetentionReceipt, 
  RetentionFilter, 
  RetentionStats,
  RetentionType,
  RetentionStatus 
} from '@/types/retention.types';

export class RetentionService {
  private static TABLE_NAME = 'retention_receipts';

  static async getReceipts(filter?: RetentionFilter): Promise<RetentionReceipt[]> {
    let query = supabase
      .from(this.TABLE_NAME)
      .select('*');

    if (filter) {
      if (filter.dateRange) {
        query = query
          .gte('created_at', filter.dateRange.from.toISOString())
          .lte('created_at', filter.dateRange.to.toISOString());
      }

      if (filter.type) {
        query = query.eq('type', filter.type);
      }

      if (filter.status) {
        query = query.eq('status', filter.status);
      }

      if (filter.searchTerm) {
        query = query.or(`company_name.ilike.%${filter.searchTerm}%,cnpj.ilike.%${filter.searchTerm}%`);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching retention receipts: ${error.message}`);
    }

    return data as RetentionReceipt[];
  }

  static async getStats(): Promise<RetentionStats> {
    const { data: total, error: totalError } = await supabase
      .from(this.TABLE_NAME)
      .select('value', { count: 'exact' });

    if (totalError) {
      throw new Error(`Error fetching total stats: ${totalError.message}`);
    }

    const { count: pending, error: pendingError } = await supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact' })
      .eq('status', 'pending');

    if (pendingError) {
      throw new Error(`Error fetching pending stats: ${pendingError.message}`);
    }

    const { count: processed, error: processedError } = await supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact' })
      .eq('status', 'processed');

    if (processedError) {
      throw new Error(`Error fetching processed stats: ${processedError.message}`);
    }

    const { count: error, error: errorError } = await supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact' })
      .eq('status', 'error');

    if (errorError) {
      throw new Error(`Error fetching error stats: ${errorError.message}`);
    }

    const totalValue = total?.reduce((acc, curr) => acc + curr.value, 0) || 0;

    return {
      total: total?.length || 0,
      pending: pending || 0,
      processed: processed || 0,
      error: error || 0,
      totalValue
    };
  }

  static async uploadReceipt(file: File, data: Partial<RetentionReceipt>): Promise<RetentionReceipt> {
    // Upload do arquivo
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('retention-receipts')
      .upload(`${data.cnpj}/${file.name}`, file);

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }

    // Criar registro no banco
    const { data: receiptData, error: receiptError } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        ...data,
        status: 'pending',
        document_url: uploadData.path,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (receiptError) {
      throw new Error(`Error creating receipt record: ${receiptError.message}`);
    }

    return receiptData as RetentionReceipt;
  }

  static async updateReceiptStatus(
    id: string, 
    status: RetentionStatus, 
    observations?: string
  ): Promise<RetentionReceipt> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update({
        status,
        observations,
        processed_at: status === 'processed' ? new Date().toISOString() : null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating receipt status: ${error.message}`);
    }

    return data as RetentionReceipt;
  }

  static async deleteReceipt(id: string): Promise<void> {
    // Primeiro, obter o registro para pegar a URL do documento
    const { data: receipt, error: fetchError } = await supabase
      .from(this.TABLE_NAME)
      .select('document_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching receipt: ${fetchError.message}`);
    }

    // Deletar o arquivo do storage
    if (receipt.document_url) {
      const { error: storageError } = await supabase.storage
        .from('retention-receipts')
        .remove([receipt.document_url]);

      if (storageError) {
        throw new Error(`Error deleting file: ${storageError.message}`);
      }
    }

    // Deletar o registro do banco
    const { error: deleteError } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw new Error(`Error deleting receipt: ${deleteError.message}`);
    }
  }

  static async getReceiptTypes(): Promise<RetentionType[]> {
    return ['irrf', 'pis', 'cofins', 'csll', 'inss', 'iss'];
  }

  static async validateReceipt(id: string): Promise<RetentionReceipt> {
    // Aqui você pode adicionar lógica de validação específica
    return this.updateReceiptStatus(id, 'processed', 'Validated successfully');
  }

  static async processReceipt(id: string): Promise<RetentionReceipt> {
    // Aqui você pode adicionar lógica de processamento específica
    return this.updateReceiptStatus(id, 'processing', 'Processing started');
  }
} 