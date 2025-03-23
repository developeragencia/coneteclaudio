
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, FileCheck, ClipboardList, Calendar, AlertTriangle } from 'lucide-react';

const AuditsContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auditorias</CardTitle>
        <CardDescription>
          Documentação completa sobre o módulo de auditorias fiscais e tributárias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Visão Geral do Módulo de Auditorias
              </h3>
              <p>
                O módulo de Auditorias fornece ferramentas completas para planejamento, execução,
                documentação e acompanhamento de auditorias fiscais e tributárias. Este módulo
                é essencial para garantir a conformidade fiscal e a identificação de oportunidades
                de economia tributária.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Calendar className="size-5 text-primary" />
                Planejamento de Auditorias
              </h3>
              <p>
                O sistema permite o planejamento detalhado das auditorias:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Definição de escopo:</span> Delimitação clara das áreas e períodos a serem auditados.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cronograma:</span> Estabelecimento de datas para início, etapas intermediárias e conclusão.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Atribuição de auditores:</span> Designação de responsáveis para cada etapa do processo.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Lista de verificação:</span> Criação de checklists personalizados para cada tipo de auditoria.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Priorização:</span> Classificação de auditorias por nível de risco e importância.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <ClipboardList className="size-5 text-primary" />
                Execução e Documentação
              </h3>
              <p>
                Durante a realização das auditorias, o sistema oferece recursos para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Coleta de evidências:</span> Upload e organização de documentos, relatórios e comprovantes.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Registro de observações:</span> Documentação de achados e anotações durante o processo.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Testes de conformidade:</span> Verificação automatizada de conformidade com requisitos fiscais.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Análise de divergências:</span> Identificação e registro de inconsistências encontradas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Histórico de atividades:</span> Registro automático de todas as ações realizadas na auditoria.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <AlertTriangle className="size-5 text-primary" />
                Gestão de Riscos e Conformidade
              </h3>
              <p>
                O módulo inclui ferramentas específicas para avaliação e gestão de riscos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Matriz de riscos:</span> Identificação e classificação de riscos fiscais e tributários.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Avaliação de impacto:</span> Estimativa do potencial impacto financeiro de não conformidades.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Planos de mitigação:</span> Desenvolvimento de estratégias para redução de riscos identificados.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Monitoramento contínuo:</span> Acompanhamento de indicadores-chave de risco ao longo do tempo.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Alertas automáticos:</span> Notificações sobre situações de risco elevado ou prazos críticos.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <FileCheck className="size-5 text-primary" />
                Relatórios e Recomendações
              </h3>
              <p>
                Após a conclusão das auditorias, o sistema facilita:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Geração de relatórios:</span> Criação de relatórios detalhados com achados e conclusões.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Formulação de recomendações:</span> Sugestões específicas para correção de não conformidades.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Planos de ação:</span> Definição de medidas corretivas, responsáveis e prazos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Acompanhamento de implementação:</span> Monitoramento da execução das recomendações.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Documentação de resultados:</span> Registro dos benefícios obtidos após implementação das recomendações.
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AuditsContent;
