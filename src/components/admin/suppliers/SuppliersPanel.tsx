import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { SupplierService } from '@/services/supplier.service';
import type { Supplier } from '@/types/supplier.types';

export function SuppliersPanel() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive' | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    status: 'active' as const,
    bankName: '',
    bankBranch: '',
    bankAccount: '',
    bankAccountType: 'checking' as const,
    pixKey: '',
    pixKeyType: undefined as Supplier['pixKeyType']
  });

  useEffect(() => {
    loadSuppliers();
  }, [selectedStatus]);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const filter: SupplierFilter = {
        searchTerm,
        status: selectedStatus
      };
      const data = await SupplierService.getSuppliers(filter);
      setSuppliers(data);
    } catch (error) {
      toast.error('Erro ao carregar fornecedores');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadSuppliers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!SupplierService.validateCNPJ(formData.cnpj)) {
      toast.error('CNPJ inválido');
      return;
    }

    if (formData.pixKey && formData.pixKeyType && !SupplierService.validatePixKey(formData.pixKey, formData.pixKeyType)) {
      toast.error('Chave PIX inválida');
      return;
    }

    setLoading(true);
    try {
      if (selectedSupplier) {
        await SupplierService.updateSupplier(selectedSupplier.id, formData);
        toast.success('Fornecedor atualizado com sucesso');
      } else {
        const cnpjExists = await SupplierService.checkCNPJExists(formData.cnpj);
        if (cnpjExists) {
          toast.error('CNPJ já cadastrado');
          return;
        }
        await SupplierService.createSupplier(formData);
        toast.success('Fornecedor criado com sucesso');
      }
      setIsDialogOpen(false);
      loadSuppliers();
      resetForm();
    } catch (error) {
      toast.error(selectedSupplier ? 'Erro ao atualizar fornecedor' : 'Erro ao criar fornecedor');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      state: supplier.state,
      zipCode: supplier.zipCode,
      status: supplier.status,
      bankName: supplier.bankName,
      bankBranch: supplier.bankBranch,
      bankAccount: supplier.bankAccount,
      bankAccountType: supplier.bankAccountType,
      pixKey: supplier.pixKey || '',
      pixKeyType: supplier.pixKeyType
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) {
      return;
    }

    try {
      await SupplierService.deleteSupplier(id);
      toast.success('Fornecedor excluído com sucesso');
      loadSuppliers();
    } catch (error) {
      toast.error('Erro ao excluir fornecedor');
    }
  };

  const resetForm = () => {
    setSelectedSupplier(null);
    setFormData({
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      status: 'active',
      bankName: '',
      bankBranch: '',
      bankAccount: '',
      bankAccountType: 'checking',
      pixKey: '',
      pixKeyType: undefined
    });
  };

  const handleCNPJChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      cnpj: SupplierService.formatCNPJ(value)
    }));
  };

  const handleBankBranchChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      bankBranch: SupplierService.formatBankBranch(value)
    }));
  };

  const handleBankAccountChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      bankAccount: SupplierService.formatBankAccount(value)
    }));
  };

  const handlePixKeyChange = (value: string) => {
    if (!formData.pixKeyType) return;

    setFormData(prev => ({
      ...prev,
      pixKey: SupplierService.formatPixKey(value, formData.pixKeyType)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-4"
    >
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fornecedores</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleCNPJChange(e.target.value)}
                      required
                      maxLength={18}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'active' | 'inactive') => 
                        setFormData(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Dados Bancários</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Banco</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankBranch">Agência</Label>
                      <Input
                        id="bankBranch"
                        value={formData.bankBranch}
                        onChange={(e) => handleBankBranchChange(e.target.value)}
                        required
                        maxLength={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Conta</Label>
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleBankAccountChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccountType">Tipo de Conta</Label>
                      <Select
                        value={formData.bankAccountType}
                        onValueChange={(value: 'checking' | 'savings') => 
                          setFormData(prev => ({ ...prev, bankAccountType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Corrente</SelectItem>
                          <SelectItem value="savings">Poupança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">PIX</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pixKeyType">Tipo de Chave</Label>
                      <Select
                        value={formData.pixKeyType || ''}
                        onValueChange={(value) => 
                          setFormData(prev => ({ 
                            ...prev, 
                            pixKeyType: value as Supplier['pixKeyType'],
                            pixKey: '' // Limpar a chave ao mudar o tipo
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Nenhum</SelectItem>
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="cnpj">CNPJ</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                          <SelectItem value="phone">Telefone</SelectItem>
                          <SelectItem value="random">Chave Aleatória</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.pixKeyType && (
                      <div className="space-y-2">
                        <Label htmlFor="pixKey">Chave PIX</Label>
                        <Input
                          id="pixKey"
                          value={formData.pixKey}
                          onChange={(e) => handlePixKeyChange(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      selectedSupplier ? 'Atualizar' : 'Criar'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Buscar</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar por nome ou CNPJ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={selectedStatus || ''}
              onValueChange={(value) => 
                setSelectedStatus(value as 'active' | 'inactive' | undefined)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ações</Label>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus(undefined);
                loadSuppliers();
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        <div className="border rounded-lg divide-y">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
              <div>
                <h4 className="font-medium">{supplier.name}</h4>
                <p className="text-sm text-muted-foreground">
                  CNPJ: {supplier.cnpj}
                </p>
                <p className="text-sm text-muted-foreground">
                  {supplier.email} | {supplier.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  Banco: {supplier.bankName} | Agência: {supplier.bankBranch} | Conta: {supplier.bankAccount}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded ${
                    supplier.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(supplier)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(supplier.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}

          {suppliers.length === 0 && !loading && (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum fornecedor encontrado
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
} 