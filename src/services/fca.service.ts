import { supabase } from '@/lib/supabase';

export interface FCAReport {
  id: string;
  clientId: string;
  clientName: string;
  operationType: 'entrada' | 'saida' | 'todos';
  startDate: string;
  endDate: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
}

export interface FCAFile {
  id: string;
  clientId: string;
  clientName: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'processed' | 'error';
  createdAt: string;
  processedAt?: string;
  error?: string;
}

export class FCAService {
  private static REPORTS_TABLE = 'fca_reports';
  private static FILES_TABLE = 'fca_files';
  private static STORAGE_BUCKET = 'fca-files';

  static async generateReport(data: Partial<FCAReport>): Promise<FCAReport> {
    const { data: report, error } = await supabase
      .from(this.REPORTS_TABLE)
      .insert({
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error generating report: ${error.message}`);
    }

    // Aqui você pode adicionar a lógica para processar o relatório em background
    this.processReport(report.id).catch(console.error);

    return report;
  }

  private static async processReport(reportId: string): Promise<void> {
    try {
      // Atualizar status para processing
      await this.updateReportStatus(reportId, 'processing');

      // Aqui você implementará a lógica de processamento do relatório
      await new Promise(resolve => setTimeout(resolve, 5000)); // Simulação

      // Gerar URL do arquivo
      const fileUrl = `reports/${reportId}/report.xlsx`;

      // Atualizar relatório com sucesso
      await supabase
        .from(this.REPORTS_TABLE)
        .update({
          status: 'completed',
          fileUrl,
          updatedAt: new Date().toISOString()
        })
        .eq('id', reportId);
    } catch (error) {
      // Em caso de erro, atualizar status
      await this.updateReportStatus(reportId, 'error', error.message);
    }
  }

  static async uploadFile(file: File, clientId: string, clientName: string): Promise<FCAFile> {
    // Upload do arquivo
    const fileName = `${clientId}/${new Date().getTime()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(this.STORAGE_BUCKET)
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }

    // Criar registro do arquivo
    const { data: fileRecord, error: dbError } = await supabase
      .from(this.FILES_TABLE)
      .insert({
        clientId,
        clientName,
        fileName: file.name,
        fileUrl: uploadData.path,
        status: 'pending',
        createdAt: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Error creating file record: ${dbError.message}`);
    }

    // Processar arquivo em background
    this.processFile(fileRecord.id).catch(console.error);

    return fileRecord;
  }

  private static async processFile(fileId: string): Promise<void> {
    try {
      // Aqui você implementará a lógica de processamento do arquivo
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulação

      // Atualizar status do arquivo
      await supabase
        .from(this.FILES_TABLE)
        .update({
          status: 'processed',
          processedAt: new Date().toISOString()
        })
        .eq('id', fileId);
    } catch (error) {
      // Em caso de erro, atualizar status
      await supabase
        .from(this.FILES_TABLE)
        .update({
          status: 'error',
          error: error.message
        })
        .eq('id', fileId);
    }
  }

  static async getReports(clientId?: string): Promise<FCAReport[]> {
    let query = supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .order('createdAt', { ascending: false });

    if (clientId) {
      query = query.eq('clientId', clientId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching reports: ${error.message}`);
    }

    return data;
  }

  static async getFiles(clientId?: string): Promise<FCAFile[]> {
    let query = supabase
      .from(this.FILES_TABLE)
      .select('*')
      .order('createdAt', { ascending: false });

    if (clientId) {
      query = query.eq('clientId', clientId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching files: ${error.message}`);
    }

    return data;
  }

  private static async updateReportStatus(
    reportId: string,
    status: FCAReport['status'],
    error?: string
  ): Promise<void> {
    const { error: updateError } = await supabase
      .from(this.REPORTS_TABLE)
      .update({
        status,
        error,
        updatedAt: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      throw new Error(`Error updating report status: ${updateError.message}`);
    }
  }

  static async deleteReport(reportId: string): Promise<void> {
    // Primeiro, obter o relatório para pegar a URL do arquivo
    const { data: report, error: fetchError } = await supabase
      .from(this.REPORTS_TABLE)
      .select('fileUrl')
      .eq('id', reportId)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching report: ${fetchError.message}`);
    }

    // Se houver arquivo, deletar do storage
    if (report.fileUrl) {
      const { error: storageError } = await supabase.storage
        .from(this.STORAGE_BUCKET)
        .remove([report.fileUrl]);

      if (storageError) {
        throw new Error(`Error deleting report file: ${storageError.message}`);
      }
    }

    // Deletar registro do banco
    const { error: deleteError } = await supabase
      .from(this.REPORTS_TABLE)
      .delete()
      .eq('id', reportId);

    if (deleteError) {
      throw new Error(`Error deleting report: ${deleteError.message}`);
    }
  }

  static async deleteFile(fileId: string): Promise<void> {
    // Primeiro, obter o arquivo para pegar a URL
    const { data: file, error: fetchError } = await supabase
      .from(this.FILES_TABLE)
      .select('fileUrl')
      .eq('id', fileId)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching file: ${fetchError.message}`);
    }

    // Deletar arquivo do storage
    const { error: storageError } = await supabase.storage
      .from(this.STORAGE_BUCKET)
      .remove([file.fileUrl]);

    if (storageError) {
      throw new Error(`Error deleting file: ${storageError.message}`);
    }

    // Deletar registro do banco
    const { error: deleteError } = await supabase
      .from(this.FILES_TABLE)
      .delete()
      .eq('id', fileId);

    if (deleteError) {
      throw new Error(`Error deleting file record: ${deleteError.message}`);
    }
  }
} 