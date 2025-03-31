import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  BarChart,
  PieChart,
  LineChart,
  Calendar as CalendarIcon,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const InteractiveDashboardPanel: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [selectedClient, setSelectedClient] = useState<string>('todos');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular carregamento
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Interativo</h1>
        <p className="text-muted-foreground">
          Visualize e analise dados em tempo real com gráficos interativos e filtros personalizáveis.
        </p>
      </motion.div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>
            Personalize a visualização dos dados
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
              <label className="text-sm font-medium">Tipo de Operação</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as operações</SelectItem>
                  <SelectItem value="creditos">Créditos</SelectItem>
                  <SelectItem value="debitos">Débitos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex items-end gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <Tabs defaultValue="bar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bar" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Barras
          </TabsTrigger>
          <TabsTrigger value="pie" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Pizza
          </TabsTrigger>
          <TabsTrigger value="line" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Linha
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Tipo de Operação</CardTitle>
              <CardDescription>
                Distribuição de operações por tipo no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Gráfico de Barras</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Cliente</CardTitle>
              <CardDescription>
                Proporção de operações por cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Gráfico de Pizza</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Temporal</CardTitle>
              <CardDescription>
                Evolução das operações ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Gráfico de Linha</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Operações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.234</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.234.567,89</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+3 novos clientes no período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% em relação ao período anterior</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveDashboardPanel; 