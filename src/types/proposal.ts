
import { User, Client } from './user';

export type ProposalStatus = 
  | 'DRAFT' // Rascunho
  | 'PENDING' // Aguardando análise
  | 'IN_ANALYSIS' // Em análise
  | 'APPROVED' // Aprovada
  | 'REJECTED' // Rejeitada
  | 'CONVERTED' // Convertida em contrato
  | 'CANCELLED' // Cancelada
  | 'REQUEST'  // For backward compatibility
  | 'ANALYSIS'; // For backward compatibility

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  DRAFT: 'Rascunho',
  PENDING: 'Aguardando análise',
  IN_ANALYSIS: 'Em análise',
  APPROVED: 'Aprovada',
  REJECTED: 'Rejeitada',
  CONVERTED: 'Convertida em contrato',
  CANCELLED: 'Cancelada',
  REQUEST: 'Solicitação',
  ANALYSIS: 'Em Análise'
};

export interface ProposalTimeline {
  id: string;
  proposalId: string;
  status?: ProposalStatus;
  comment?: string;
  userId: string;
  userName?: string;
  description?: string;
  type?: string;
  metadata?: any;
  createdAt: string;
}

export interface ProposalTimelineEvent {
  id: string;
  type: 'CREATED' | 'UPDATED' | 'ANALYZED' | 'APPROVED' | 'REJECTED' | 'CONVERTED';
  description: string;
  userName: string;
  metadata?: any;
  createdAt: string;
}

export interface ProposalService {
  id: string;
  name: string;
  description: string;
  value: number;
  recurrence: 'one_time' | 'monthly' | 'yearly';
}

export interface Proposal {
  id: string;
  title: string;
  clientId: string;
  client?: Client;
  salesRepId: string;
  salesRep?: User;
  status: ProposalStatus;
  services: ProposalService[];
  totalValue: number;
  value?: number; // For backward compatibility
  description: string;
  validUntil: string;
  timeline: ProposalTimeline[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
  }[];
  contractId?: string;
  createdAt: string;
  updatedAt: string;
  
  // Backward compatibility fields
  clientName?: string;
  cnpj?: string;
  service?: string;
  representativeName?: string;
  createdByName?: string;
  approvedByName?: string;
  approvedAt?: string;
  rejectedByName?: string;
  rejectedAt?: string;
  convertedAt?: string;
  rejectionReason?: string;
}

export interface ProposalFilters {
  status?: ProposalStatus[];
  clientId?: string;
  salesRepId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Tipos para análise automática de créditos
export interface CreditAnalysis {
  id: string;
  clientId: string;
  period: {
    start: string;
    end: string;
  };
  transactions: CreditTransaction[];
  summary: {
    totalCredits: number;
    totalRetentions: number;
    potentialCredits: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface CreditTransaction {
  id: string;
  date: string;
  supplier: {
    id: string;
    name: string;
    cnpj: string;
    retentionType: 'full' | 'partial' | 'exempt';
    retentionReason?: string;
  };
  value: number;
  retentionValue: number;
  retentionRules: {
    ruleId: string;
    description: string;
    appliedValue: number;
  }[];
  status: 'identified' | 'pending_review' | 'approved' | 'rejected';
  observations?: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}
