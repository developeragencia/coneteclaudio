
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, PieChart, LineChart, FileText, Download } from 'lucide-react';

const ReportsContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Documentação completa sobre o módulo de relatórios e dashboards interativos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <BarChart className="size-5 text-primary" />
                Visão Geral do Módulo de Relatórios
              </h3>
              <p>
                O módulo de Relatórios fornece ferramentas avançadas para visualização, análise e 
                exportação de dados do sistema. Através de dashboards interativos e relatórios 
                personalizáveis, é possível obter insights valiosos sobre créditos tributários, 
                auditorias e desempenho do sistema.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <LineChart className="size-5 text-primary" />
                Dashboard Interativo
              </h3>
              <p>
                O dashboard interativo oferece visualizações dinâmicas dos dados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Gráficos em tempo real:</span> Visualizações atualizadas automaticamente conforme novos dados são inseridos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Filtros dinâmicos:</span> Possibilidade de filtrar dados por período, cliente, tipo de crédito e outros critérios.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Indicadores-chave:</span> Exibição de KPIs relevantes para o negócio.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Comparativos:</span> Análises comparativas entre períodos, clientes ou tipos de crédito.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Personalização:</span> Configuração de dashboards específicos para diferentes perfis de usuário.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                Relatórios Detalhados
              </h3>
              <p>
                O sistema oferece diversos tipos de relatórios especializados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios fiscais:</span> Documentos detalhados sobre créditos, compensações e recuperações.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios de auditoria:</span> Resumos e detalhamentos de auditorias realizadas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios de clientes:</span> Informações sobre o portfólio de clientes e suas atividades.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios de desempenho:</span> Métricas sobre a performance do sistema e dos usuários.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios regulatórios:</span> Documentos formatados para atender requisitos legais.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <PieChart className="size-5 text-primary" />
                Análises e Visualizações
              </h3>
              <p>
                O módulo inclui ferramentas poderosas para análise de dados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Gráficos diversos:</span> Barras, linhas, pizza, área, dispersão e outros tipos de visualização.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Mapas de calor:</span> Identificação visual de padrões e concentrações nos dados.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Análises de tendência:</span> Projeções e identificação de tendências ao longo do tempo.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Análises de anomalias:</span> Detecção de valores atípicos e situações incomuns.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cruzamento de dados:</span> Correlação entre diferentes conjuntos de informações.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Download className="size-5 text-primary" />
                Exportação e Compartilhamento
              </h3>
              <p>
                Os relatórios e visualizações podem ser facilmente exportados e compartilhados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Múltiplos formatos:</span> Exportação para PDF, Excel, CSV, imagens e outros formatos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Agendamento:</span> Programação de envio automático de relatórios por e-mail.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Compartilhamento seguro:</span> Controle de acesso a relatórios compartilhados.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Impressão otimizada:</span> Formatação especial para impressão de alta qualidade.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Integração externa:</span> Possibilidade de incorporar relatórios em outros sistemas.
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReportsContent;
