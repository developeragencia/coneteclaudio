import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FileText,
  Download,
  Filter,
  RefreshCw,
  FileSpreadsheet,
  FilePdf,
  FileJson,
  Printer
} from 'lucide-react';

const FiscalReportsPanel: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [selectedClient, setSelectedClient] = useState<string>('todos');
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simular geração de relatório
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Relatórios Fiscais</h1>
        <p className="text-muted-foreground">
          Gere relatórios fiscais detalhados para análise e tomada de decisões estratégicas.
        </p>
      </motion.div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Configurações
          </CardTitle>
          <CardDescription>
            Configure os parâmetros do relatório
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <div className="flex items-center gap-2">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  locale={ptBR}
                  className="rounded-md border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cliente</label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os clientes</SelectItem>
                  <SelectItem value="ativos">Clientes ativos</SelectItem>
                  <SelectItem value="inativos">Clientes inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Formato de Exportação</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex items-end">
              <Button 
                className="w-full"
                onClick={handleGenerateReport}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Relatórios */}
      <Tabs defaultValue="fiscal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fiscal" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Fiscal
          </TabsTrigger>
          <TabsTrigger value="contabil" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Contábil
          </TabsTrigger>
          <TabsTrigger value="gerencial" className="flex items-center gap-2">
            <FilePdf className="h-4 w-4" />
            Gerencial
          </TabsTrigger>
          <TabsTrigger value="consolidado" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            Consolidado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fiscal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Fiscal</CardTitle>
              <CardDescription>
                Relatórios detalhados sobre impostos, tributos e obrigações fiscais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Apuração de Impostos
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Demonstrativo de Tributos
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Obrigações Acessórias
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Retenções na Fonte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contabil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Contábil</CardTitle>
              <CardDescription>
                Relatórios contábeis e demonstrações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Balanço Patrimonial
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    DRE
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Fluxo de Caixa
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Balancete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gerencial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Gerencial</CardTitle>
              <CardDescription>
                Relatórios gerenciais para tomada de decisão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FilePdf className="h-4 w-4 mr-2" />
                    Análise de Desempenho
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FilePdf className="h-4 w-4 mr-2" />
                    Indicadores Financeiros
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FilePdf className="h-4 w-4 mr-2" />
                    Projeções
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FilePdf className="h-4 w-4 mr-2" />
                    Análise de Custos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consolidado" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Consolidado</CardTitle>
              <CardDescription>
                Relatórios consolidados com visão geral do negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileJson className="h-4 w-4 mr-2" />
                    Consolidação Fiscal
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileJson className="h-4 w-4 mr-2" />
                    Consolidação Contábil
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileJson className="h-4 w-4 mr-2" />
                    Consolidação Gerencial
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileJson className="h-4 w-4 mr-2" />
                    Visão Integrada
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ações Rápidas */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Baixar Último Relatório
        </Button>
        <Button variant="outline" className="flex-1">
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
      </div>
    </div>
  );
};

export default FiscalReportsPanel;
