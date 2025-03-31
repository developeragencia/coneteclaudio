import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formSchema = z.object({
  cliente_id: z.string().min(1, 'ID do cliente obrigatório'),
  data_inicio: z.string().min(1, 'Data inicial obrigatória'),
  data_fim: z.string().min(1, 'Data final obrigatória'),
  tipo_relatorio: z.enum(['detalhado', 'resumido'], {
    required_error: 'Selecione o tipo de relatório'
  })
});

interface RelatorioRetencoesProps {
  onGerarRelatorio: (dados: z.infer<typeof formSchema>) => Promise<void>;
  isLoading: boolean;
}

export const RelatorioRetencoes: React.FC<RelatorioRetencoesProps> = ({
  onGerarRelatorio,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_inicio: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'),
      data_fim: format(new Date(), 'yyyy-MM-dd'),
      tipo_relatorio: 'detalhado'
    }
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await onGerarRelatorio(data);
  };

  return (
    <Card className="p-6">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="data_inicio">Data Inicial</Label>
            <Input
              id="data_inicio"
              type="date"
              {...register('data_inicio')}
            />
            {errors.data_inicio && (
              <p className="text-sm text-red-500">{errors.data_inicio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_fim">Data Final</Label>
            <Input
              id="data_fim"
              type="date"
              {...register('data_fim')}
            />
            {errors.data_fim && (
              <p className="text-sm text-red-500">{errors.data_fim.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tipo de Relatório</Label>
          <Select
            value={watch('tipo_relatorio')}
            onValueChange={(value) => setValue('tipo_relatorio', value as 'detalhado' | 'resumido')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detalhado">Detalhado</SelectItem>
              <SelectItem value="resumido">Resumido</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipo_relatorio && (
            <p className="text-sm text-red-500">{errors.tipo_relatorio.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Gerando relatório...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Gerar Relatório
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}; 