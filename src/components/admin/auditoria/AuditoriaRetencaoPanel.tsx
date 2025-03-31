import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ProcessarPagamentosForm } from './ProcessarPagamentosForm';
import { ListaAuditorias } from './ListaAuditorias';
import { RelatorioRetencoes } from './RelatorioRetencoes';
import { AuditoriaService } from '@/services/auditoria.service';

interface Auditoria {
  id: string;
  cliente_id: string;
  fornecedor_cnpj: string;
  data_pagamento: string;
  valor_original: number;
  valor_retido: number;
  aliquota_retencao: number;
  data_auditoria: string;
  status: string;
}

export const AuditoriaRetencaoPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [auditorias, setAuditorias] = useState<Auditoria[]>([]);
  const [activeTab, setActiveTab] = useState('processar');

  const handleProcessarPagamentos = async (clienteId: string, pagamentos: any[]) => {
    try {
      setIsLoading(true);
      const auditoriaService = new AuditoriaService();
      await auditoriaService.processarPagamentos(clienteId, pagamentos);
      toast.success('Pagamentos processados com sucesso!');
      
      // Atualiza a lista de auditorias
      const novasAuditorias = await auditoriaService.obterAuditoriasCliente(clienteId);
      setAuditorias(novasAuditorias);
      setActiveTab('auditorias');
    } catch (error) {
      console.error('Erro ao processar pagamentos:', error);
      toast.error('Erro ao processar pagamentos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGerarRelatorio = async (dados: any) => {
    try {
      setIsLoading(true);
      const auditoriaService = new AuditoriaService();
      await auditoriaService.gerarRelatorioRetencoes(
        dados.cliente_id,
        dados.data_inicio,
        dados.data_fim,
        dados.tipo_relatorio
      );
      toast.success('Relatório gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error('Erro ao gerar relatório. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="processar">Processar Pagamentos</TabsTrigger>
          <TabsTrigger value="auditorias">Auditorias</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="processar" className="mt-6">
          <ProcessarPagamentosForm
            onSubmit={handleProcessarPagamentos}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="auditorias" className="mt-6">
          <ListaAuditorias
            auditorias={auditorias}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="relatorios" className="mt-6">
          <RelatorioRetencoes
            onGerarRelatorio={handleGerarRelatorio}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}; 