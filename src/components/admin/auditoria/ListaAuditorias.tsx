import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface ListaAuditoriasProps {
  auditorias: Auditoria[];
  isLoading: boolean;
}

export const ListaAuditorias: React.FC<ListaAuditoriasProps> = ({
  auditorias,
  isLoading
}) => {
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR });
  };

  const formatarCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'text-yellow-600 bg-yellow-100';
      case 'aprovado':
        return 'text-green-600 bg-green-100';
      case 'rejeitado':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Carregando auditorias...</div>
        </div>
      </Card>
    );
  }

  if (auditorias.length === 0) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Nenhuma auditoria encontrada.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data Auditoria</TableHead>
              <TableHead>CNPJ Fornecedor</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead className="text-right">Valor Original</TableHead>
              <TableHead className="text-right">Valor Retido</TableHead>
              <TableHead className="text-right">Alíquota</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditorias.map((auditoria) => (
              <TableRow key={auditoria.id}>
                <TableCell>{formatarData(auditoria.data_auditoria)}</TableCell>
                <TableCell>{formatarCNPJ(auditoria.fornecedor_cnpj)}</TableCell>
                <TableCell>{formatarData(auditoria.data_pagamento)}</TableCell>
                <TableCell className="text-right">{formatarValor(auditoria.valor_original)}</TableCell>
                <TableCell className="text-right">{formatarValor(auditoria.valor_retido)}</TableCell>
                <TableCell className="text-right">{auditoria.aliquota_retencao}%</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auditoria.status)}`}>
                    {auditoria.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}; 