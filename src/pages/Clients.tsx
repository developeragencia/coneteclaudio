import React, { useState } from 'react';
import { useClients, useDeleteClient } from '@/hooks/useClients';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/types/user';
import ClientForm from '@/components/clients/ClientForm';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '@/lib/permissions';

const Clients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: clients = [],
    isLoading,
    error,
  } = useClients({
    search,
  });

  const deleteClient = useDeleteClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateClient = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    navigate(`/clients/${client.id}`);
  };

  const handleDeleteClient = async (client: Client) => {
    try {
      await deleteClient.mutateAsync(client.id);
      toast({
        title: 'Cliente excluído',
        description: 'O cliente foi excluído com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir cliente',
        description: 'Ocorreu um erro ao excluir o cliente. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">
          Ocorreu um erro ao carregar os clientes. Tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        {hasPermission(user, 'clients.create') && (
          <Button onClick={handleCreateClient}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={search}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
          {hasPermission(user, 'clients.create') && (
            <Button onClick={handleCreateClient}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          )}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CNPJ</TableHead>
                <TableHead>Razão Social</TableHead>
                <TableHead>Nome Fantasia</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead>Contrato</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.cnpj}</TableCell>
                  <TableCell>{client.razaoSocial}</TableCell>
                  <TableCell>{client.nomeFantasia}</TableCell>
                  <TableCell>
                    {client.type === 'public' ? 'Público' : 'Privado'}
                  </TableCell>
                  <TableCell>
                    {client.address.city}/{client.address.state}
                  </TableCell>
                  <TableCell>{client.contractNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {hasPermission(user, 'clients.update') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClient(client)}
                        >
                          Editar
                        </Button>
                      )}
                      {hasPermission(user, 'clients.delete') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClient(client)}
                          disabled={deleteClient.isLoading}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo cliente.
            </DialogDescription>
          </DialogHeader>
          <ClientForm
            onSubmit={async (data) => {
              try {
                // TODO: Implement client creation
                toast({
                  title: 'Cliente criado',
                  description: 'O cliente foi criado com sucesso.',
                });
                setIsCreateDialogOpen(false);
              } catch (error) {
                toast({
                  title: 'Erro ao criar cliente',
                  description: 'Ocorreu um erro ao criar o cliente. Tente novamente.',
                  variant: 'destructive',
                });
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
