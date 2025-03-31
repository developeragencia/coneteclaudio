export type RetentionType = 'irrf' | 'pis' | 'cofins' | 'csll' | 'inss' | 'iss';

export type RetentionStatus = 'pending' | 'processing' | 'processed' | 'error';

export interface RetentionReceipt {
  id: string;
  companyName: string;
  cnpj: string;
  type: RetentionType;
  competence: string;
  value: number;
  status: RetentionStatus;
  createdAt: Date;
  processedAt?: Date;
  documentUrl?: string;
  observations?: string;
}

export interface RetentionFilter {
  dateRange?: {
    from: Date;
    to: Date;
  };
  type?: RetentionType;
  status?: RetentionStatus;
  searchTerm?: string;
}

export interface RetentionStats {
  total: number;
  pending: number;
  processed: number;
  error: number;
  totalValue: number;
} 