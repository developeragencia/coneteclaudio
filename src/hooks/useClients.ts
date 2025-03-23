import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '@/services/clientService';
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/types/user';

interface UseClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  type?: 'public' | 'private';
  enabled?: boolean;
  assignedOnly?: boolean;
  salesRepOnly?: boolean;
}

export function useClients({
  page = 1,
  limit = 10,
  search,
  status,
  type,
  enabled = true,
  assignedOnly = false,
  salesRepOnly = false,
}: UseClientsParams = {}) {
  return useQuery({
    queryKey: ['clients', { page, limit, search, status, type, assignedOnly, salesRepOnly }],
    queryFn: () => clientService.getClients({ page, limit, search, status, type, assignedOnly, salesRepOnly }),
    enabled,
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => clientService.getClientById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Cliente criado',
        description: 'O cliente foi criado com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar cliente',
        description: error.message || 'Ocorreu um erro ao criar o cliente.',
      });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof clientService.updateClient>[1] }) =>
      clientService.updateClient(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.setQueryData(['clients', data.id], data);
      toast({
        title: 'Cliente atualizado',
        description: 'O cliente foi atualizado com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar cliente',
        description: error.message || 'Ocorreu um erro ao atualizar o cliente.',
      });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Cliente excluído',
        description: 'O cliente foi excluído com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir cliente',
        description: error.message || 'Ocorreu um erro ao excluir o cliente.',
      });
    },
  });
}

export function useAssignUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: string; data: Parameters<typeof clientService.assignUser>[1] }) =>
      clientService.assignUser(clientId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.setQueryData(['clients', data.id], data);
      toast({
        title: 'Usuário atribuído',
        description: 'O usuário foi atribuído ao cliente com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atribuir usuário',
        description: error.message || 'Ocorreu um erro ao atribuir o usuário ao cliente.',
      });
    },
  });
}

export function useUnassignUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ clientId, userId }: { clientId: string; userId: string }) =>
      clientService.unassignUser(clientId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.setQueryData(['clients', data.id], data);
      toast({
        title: 'Usuário removido',
        description: 'O usuário foi removido do cliente com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao remover usuário',
        description: error.message || 'Ocorreu um erro ao remover o usuário do cliente.',
      });
    },
  });
}

export function useValidateCNPJ() {
  return useMutation({
    mutationFn: clientService.validateCNPJ,
  });
}

export function useImportClients() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.importClients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Clientes importados',
        description: 'Os clientes foram importados com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao importar clientes',
        description: error.message || 'Ocorreu um erro ao importar os clientes.',
      });
    },
  });
}

export function useExportClients() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.exportClients,
    onSuccess: (data) => {
      // Cria um link para download do arquivo
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Clientes exportados',
        description: 'Os clientes foram exportados com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao exportar clientes',
        description: error.message || 'Ocorreu um erro ao exportar os clientes.',
      });
    },
  });
} 