import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  Share2,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { RetentionService } from '@/services/retention.service';
import { RetentionReceipt, RetentionFilter, RetentionType, RetentionStats } from '@/types/retention.types';

const RetentionReceiptsPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState<RetentionReceipt[]>([]);
  const [stats, setStats] = useState<RetentionStats | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [selectedType, setSelectedType] = useState<RetentionType>('irrf');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [types, setTypes] = useState<RetentionType[]>([]);
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  useEffect(() => {
    loadTypes();
    loadReceipts();
    loadStats();
  }, []);

  const loadTypes = async () => {
    try {
      const types = await RetentionService.getReceiptTypes();
      setTypes(types);
    } catch (error) {
      toast.error('Erro ao carregar tipos de retenção');
    }
  };

  const loadReceipts = async () => {
    setLoading(true);
    try {
      const filter: RetentionFilter = {
        dateRange,
        type: selectedType,
        searchTerm
      };
      const data = await RetentionService.getReceipts(filter);
      setReceipts(data);
    } catch (error) {
      toast.error('Erro ao carregar comprovantes');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const stats = await RetentionService.getStats();
      setStats(stats);
    } catch (error) {
      toast.error('Erro ao carregar estatísticas');
    }
  };

  const handleSearch = () => {
    loadReceipts();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await RetentionService.uploadReceipt(file, {
        type: selectedType || 'irrf',
        companyName: 'Nome da Empresa', // Você precisará obter isso do contexto ou formulário
        cnpj: '12345678901234' // Você precisará obter isso do contexto ou formulário
      });
      toast.success('Comprovante enviado com sucesso');
      loadReceipts();
      loadStats();
    } catch (error) {
      toast.error('Erro ao enviar comprovante');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await RetentionService.deleteReceipt(id);
      toast.success('Comprovante excluído com sucesso');
      loadReceipts();
      loadStats();
    } catch (error) {
      toast.error('Erro ao excluir comprovante');
    }
  };

  const handleProcess = async (id: string) => {
    try {
      await RetentionService.processReceipt(id);
      toast.success('Processamento iniciado');
      loadReceipts();
      loadStats();
    } catch (error) {
      toast.error('Erro ao processar comprovante');
    }
  };

  const handleValidate = async (id: string) => {
    try {
      await RetentionService.validateReceipt(id);
      toast.success('Comprovante validado com sucesso');
      loadReceipts();
      loadStats();
    } catch (error) {
      toast.error('Erro ao validar comprovante');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Comprovantes de Retenção</h1>
        <p className="text-muted-foreground">
          Gerencie todos os comprovantes de retenção em um só lugar.
        </p>
      </motion.div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
          <CardDescription>
            Localize e filtre comprovantes
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
              <label className="text-sm font-medium">Tipo de Retenção</label>
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as RetentionType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="CNPJ, Razão Social..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 flex items-end">
              <Button 
                className="w-full"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas de Conteúdo */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="processed" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Processados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Comprovantes</CardTitle>
              <CardDescription>
                Lista completa de comprovantes de retenção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Lista de Comprovantes */}
                <div className="border rounded-lg divide-y">
                  {receipts.map((receipt) => (
                    <div key={receipt.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                      <div>
                        <h4 className="font-medium">{receipt.companyName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {receipt.type.toUpperCase()} - Competência: {receipt.competence}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {receipt.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleProcess(receipt.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(receipt.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comprovantes Pendentes</CardTitle>
              <CardDescription>
                Comprovantes que aguardam processamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Arraste e solte novos comprovantes aqui ou clique para selecionar
                  </p>
                  <Button variant="outline" className="mt-4">
                    Selecionar Arquivos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comprovantes Processados</CardTitle>
              <CardDescription>
                Comprovantes já processados e validados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Lista de Comprovantes Processados */}
                <div className="border rounded-lg divide-y">
                  {receipts
                    .filter((r) => r.status === 'processed')
                    .map((receipt) => (
                      <div key={receipt.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                        <div>
                          <h4 className="font-medium">{receipt.companyName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {receipt.type.toUpperCase()} - Competência: {receipt.competence}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Validado
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ações em Lote */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Baixar Selecionados
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
        <Button variant="outline" className="flex-1" disabled>
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default RetentionReceiptsPanel;
