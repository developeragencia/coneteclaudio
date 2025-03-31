import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Loader2, Download, Upload, FileText, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';
import { FCAService, FCAReport, FCAFile } from '@/services/fca.service';

export function FCAPanel() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedClient, setSelectedClient] = useState<string>();
  const [selectedOperation, setSelectedOperation] = useState<'entrada' | 'saida' | 'todos'>('todos');
  const [reports, setReports] = useState<FCAReport[]>([]);
  const [files, setFiles] = useState<FCAFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReports();
    loadFiles();
  }, [selectedClient]);

  const loadReports = async () => {
    try {
      const data = await FCAService.getReports(selectedClient);
      setReports(data);
    } catch (error) {
      toast.error('Erro ao carregar relatórios');
    }
  };

  const loadFiles = async () => {
    try {
      const data = await FCAService.getFiles(selectedClient);
      setFiles(data);
    } catch (error) {
      toast.error('Erro ao carregar arquivos');
    }
  };

  const handleGenerateReport = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error('Selecione um período');
      return;
    }

    if (!selectedClient) {
      toast.error('Selecione um cliente');
      return;
    }

    setLoading(true);
    try {
      await FCAService.generateReport({
        clientId: selectedClient,
        clientName: 'Nome do Cliente', // Você precisará obter isso do contexto ou formulário
        operationType: selectedOperation,
        startDate: dateRange.from.toISOString(),
        endDate: dateRange.to.toISOString()
      });
      
      toast.success('Relatório gerado com sucesso');
      loadReports();
    } catch (error) {
      toast.error('Erro ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedClient) {
      toast.error('Selecione um cliente');
      return;
    }

    setLoading(true);
    try {
      await FCAService.uploadFile(
        file,
        selectedClient,
        'Nome do Cliente' // Você precisará obter isso do contexto ou formulário
      );
      
      toast.success('Arquivo enviado com sucesso');
      loadFiles();
    } catch (error) {
      toast.error('Erro ao enviar arquivo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await FCAService.deleteReport(reportId);
      toast.success('Relatório excluído com sucesso');
      loadReports();
    } catch (error) {
      toast.error('Erro ao excluir relatório');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await FCAService.deleteFile(fileId);
      toast.success('Arquivo excluído com sucesso');
      loadFiles();
    } catch (error) {
      toast.error('Erro ao excluir arquivo');
    }
  };

  const filteredReports = reports.filter(report => 
    report.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(report.createdAt).toLocaleDateString().includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-4"
    >
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">FCA - Fluxo de Caixa Antecipado</h2>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList>
            <TabsTrigger value="generate">Gerar Relatório</TabsTrigger>
            <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                    <SelectItem value="cliente3">Cliente 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Operação</label>
                <Select 
                  value={selectedOperation} 
                  onValueChange={(value) => setSelectedOperation(value as 'entrada' | 'saida' | 'todos')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a operação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => {
                  setDateRange(undefined);
                  setSelectedOperation('todos');
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
              <Button onClick={handleGenerateReport} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Gerar Relatório
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                    <SelectItem value="cliente3">Cliente 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Arquivo</label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleUploadFile}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => document.querySelector('input[type="file"]')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Arquivos Enviados</h3>
              <div className="border rounded-lg divide-y">
                {files.map((file) => (
                  <div key={file.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                    <div>
                      <h4 className="font-medium">{file.fileName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Cliente: {file.clientName}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          file.status === 'processed' 
                            ? 'bg-green-100 text-green-800'
                            : file.status === 'error'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {file.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                    <SelectItem value="cliente3">Cliente 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Buscar por nome ou data" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg divide-y">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                  <div>
                    <h4 className="font-medium">Relatório FCA - {report.clientName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Gerado em: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        report.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {report.fileUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
} 