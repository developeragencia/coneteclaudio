import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const pagamentoSchema = z.object({
  fornecedor_cnpj: z.string().min(14, 'CNPJ inválido'),
  data_pagamento: z.string().min(1, 'Data obrigatória'),
  valor: z.number().min(0.01, 'Valor deve ser maior que zero'),
  descricao: z.string().min(1, 'Descrição obrigatória'),
  numero_nota: z.string().min(1, 'Número da nota obrigatório')
});

const formSchema = z.object({
  cliente_id: z.string().min(1, 'ID do cliente obrigatório'),
  pagamentos: z.array(pagamentoSchema).min(1, 'Adicione pelo menos um pagamento')
});

interface ProcessarPagamentosFormProps {
  onSubmit: (clienteId: string, pagamentos: z.infer<typeof pagamentoSchema>[]) => Promise<void>;
  isLoading: boolean;
}

export const ProcessarPagamentosForm: React.FC<ProcessarPagamentosFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [pagamentos, setPagamentos] = useState<z.infer<typeof pagamentoSchema>[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cliente_id: '',
      pagamentos: []
    }
  });

  const handleAddPagamento = () => {
    setPagamentos([...pagamentos, {
      fornecedor_cnpj: '',
      data_pagamento: format(new Date(), 'yyyy-MM-dd'),
      valor: 0,
      descricao: '',
      numero_nota: ''
    }]);
  };

  const handleRemovePagamento = (index: number) => {
    setPagamentos(pagamentos.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data.cliente_id, pagamentos);
    reset();
    setPagamentos([]);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cliente_id">ID do Cliente</Label>
        <Input
          id="cliente_id"
          {...register('cliente_id')}
          placeholder="Digite o ID do cliente"
        />
        {errors.cliente_id && (
          <p className="text-sm text-red-500">{errors.cliente_id.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Pagamentos</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddPagamento}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Pagamento
          </Button>
        </div>

        <ScrollArea className="h-[400px] rounded-md border p-4">
          {pagamentos.map((pagamento, index) => (
            <Card key={index} className="p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`pagamento-${index}-cnpj`}>CNPJ do Fornecedor</Label>
                  <Input
                    id={`pagamento-${index}-cnpj`}
                    value={pagamento.fornecedor_cnpj}
                    onChange={(e) => {
                      const newPagamentos = [...pagamentos];
                      newPagamentos[index].fornecedor_cnpj = e.target.value;
                      setPagamentos(newPagamentos);
                    }}
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`pagamento-${index}-data`}>Data do Pagamento</Label>
                  <Input
                    id={`pagamento-${index}-data`}
                    type="date"
                    value={pagamento.data_pagamento}
                    onChange={(e) => {
                      const newPagamentos = [...pagamentos];
                      newPagamentos[index].data_pagamento = e.target.value;
                      setPagamentos(newPagamentos);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`pagamento-${index}-valor`}>Valor</Label>
                  <Input
                    id={`pagamento-${index}-valor`}
                    type="number"
                    step="0.01"
                    value={pagamento.valor}
                    onChange={(e) => {
                      const newPagamentos = [...pagamentos];
                      newPagamentos[index].valor = parseFloat(e.target.value);
                      setPagamentos(newPagamentos);
                    }}
                    placeholder="0,00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`pagamento-${index}-nota`}>Número da Nota</Label>
                  <Input
                    id={`pagamento-${index}-nota`}
                    value={pagamento.numero_nota}
                    onChange={(e) => {
                      const newPagamentos = [...pagamentos];
                      newPagamentos[index].numero_nota = e.target.value;
                      setPagamentos(newPagamentos);
                    }}
                    placeholder="Número da nota fiscal"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor={`pagamento-${index}-descricao`}>Descrição</Label>
                  <Textarea
                    id={`pagamento-${index}-descricao`}
                    value={pagamento.descricao}
                    onChange={(e) => {
                      const newPagamentos = [...pagamentos];
                      newPagamentos[index].descricao = e.target.value;
                      setPagamentos(newPagamentos);
                    }}
                    placeholder="Descrição do pagamento"
                  />
                </div>

                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePagamento(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>

        {errors.pagamentos && (
          <p className="text-sm text-red-500">{errors.pagamentos.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading || pagamentos.length === 0} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          'Processar Pagamentos'
        )}
      </Button>
    </form>
  );
}; 