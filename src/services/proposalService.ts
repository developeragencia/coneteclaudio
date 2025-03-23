
import api from '@/lib/api';
import { Proposal, ProposalFilters, ProposalStatus } from '@/types/proposal';

interface CreateProposalData {
  title: string;
  clientId: string;
  description: string;
  services: {
    name: string;
    description: string;
    value: number;
    recurrence: 'one_time' | 'monthly' | 'yearly';
  }[];
  validUntil: string;
  attachments?: File[];
}

interface UpdateProposalData extends Partial<CreateProposalData> {
  id: string;
}

interface UpdateProposalStatusData {
  id: string;
  status: ProposalStatus;
  comment?: string;
}

interface GetProposalsParams extends ProposalFilters {
  page?: number;
  limit?: number;
}

interface ProposalsResponse {
  proposals: Proposal[];
  total: number;
  page: number;
  totalPages: number;
}

export const proposalService = {
  async getProposals(params?: GetProposalsParams): Promise<ProposalsResponse> {
    try {
      const { data } = await api.get<ProposalsResponse>('/proposals', { params });
      return data;
    } catch (error) {
      console.error('Erro ao buscar propostas:', error);
      throw error;
    }
  },

  async getProposalById(id: string): Promise<Proposal> {
    try {
      const { data } = await api.get<Proposal>(`/proposals/${id}`);
      return data;
    } catch (error) {
      console.error('Erro ao buscar proposta:', error);
      throw error;
    }
  },

  async createProposal(data: CreateProposalData): Promise<Proposal> {
    try {
      const formData = new FormData();
      
      // Adiciona os dados básicos
      formData.append('data', JSON.stringify({
        title: data.title,
        clientId: data.clientId,
        description: data.description,
        services: data.services,
        validUntil: data.validUntil,
      }));

      // Adiciona os anexos
      if (data.attachments) {
        data.attachments.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const { data: response } = await api.post<Proposal>('/proposals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Erro ao criar proposta:', error);
      throw error;
    }
  },

  async updateProposal(data: UpdateProposalData): Promise<Proposal> {
    try {
      const formData = new FormData();
      
      // Adiciona os dados básicos
      formData.append('data', JSON.stringify({
        title: data.title,
        description: data.description,
        services: data.services,
        validUntil: data.validUntil,
      }));

      // Adiciona os anexos
      if (data.attachments) {
        data.attachments.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const { data: response } = await api.put<Proposal>(`/proposals/${data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Erro ao atualizar proposta:', error);
      throw error;
    }
  },

  async updateProposalStatus(data: UpdateProposalStatusData): Promise<Proposal> {
    try {
      const { data: response } = await api.patch<Proposal>(`/proposals/${data.id}/status`, {
        status: data.status,
        comment: data.comment,
      });

      return response;
    } catch (error) {
      console.error('Erro ao atualizar status da proposta:', error);
      throw error;
    }
  },

  async deleteProposal(id: string): Promise<void> {
    try {
      await api.delete(`/proposals/${id}`);
    } catch (error) {
      console.error('Erro ao excluir proposta:', error);
      throw error;
    }
  },

  async convertToContract(id: string): Promise<Proposal> {
    try {
      const { data } = await api.post<Proposal>(`/proposals/${id}/convert`);
      return data;
    } catch (error) {
      console.error('Erro ao converter proposta em contrato:', error);
      throw error;
    }
  },

  async downloadAttachment(proposalId: string, attachmentId: string): Promise<Blob> {
    try {
      const { data } = await api.get<Blob>(
        `/proposals/${proposalId}/attachments/${attachmentId}`,
        { responseType: 'blob' }
      );
      return data;
    } catch (error) {
      console.error('Erro ao baixar anexo:', error);
      throw error;
    }
  },
};
