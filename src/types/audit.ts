
export interface Audit {
  id: string;
  title?: string;
  client?: string;
  clientName: string;
  type?: string;
  auditType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignedTo?: string;
  priority?: string;
  description?: string;
  findings?: string;
  recommendations?: string;
  clientId?: string;
  date?: string;
  startDate?: string;
  deadline?: string;
  documentsCount?: number;
  documentNumber?: string;
  documents?: string[];
  completionDate?: string;
  observations?: string;
  notes?: string;
}

export interface AuditSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  inProgress: number;
  // For backward compatibility
  totalAudits: number;
  pendingAudits: number;
  completedAudits: number;
  inProgressAudits: number;
  // Portuguese labels
  emAndamento: number;
  pendentes: number;
  concluidas: number;
}
