
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, Calculator, FileText, Paintbrush } from 'lucide-react';
import { cn } from '@/lib/utils';

const OverviewContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Documentação do Sistema</CardTitle>
        <CardDescription>
          Visão geral das funcionalidades e recursos disponíveis no sistema de gestão de créditos tributários.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium">Introdução</h3>
              <p>O sistema de gestão de créditos tributários é uma plataforma completa para empresas contábeis e fiscais administrarem eficientemente o processo de recuperação de créditos tributários para seus clientes. O sistema automatiza a análise, identificação e recuperação de créditos, além de oferecer ferramentas robustas para auditoria, relatórios e controle de acesso.</p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-medium">Estrutura do Sistema</h3>
              <p>O sistema está estruturado em módulos principais, cada um responsável por uma área específica:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Painel Principal:</span> Visão geral do sistema, estatísticas e acesso rápido às funcionalidades mais utilizadas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Gestão de Clientes:</span> Cadastro e administração de clientes, incluindo informações fiscais e contábeis.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Créditos Tributários:</span> Módulo central para identificação, cálculo e recuperação de créditos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Auditorias:</span> Ferramentas para realização e controle de auditorias fiscais.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Relatórios:</span> Geração e visualização de relatórios detalhados sobre créditos e processos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Configurações do Sistema:</span> Personalizações, configurações de usuários e permissões.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-medium">Principais Funcionalidades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={cn("bg-muted/50 hover:bg-muted/80 transition-colors")}>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-5 text-primary" />
                      <CardTitle className="text-lg">Recuperação de Créditos</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">Automação completa do processo de identificação e recuperação de créditos tributários, com análise de documentos e cálculos precisos.</p>
                  </CardContent>
                </Card>

                <Card className={cn("bg-muted/50 hover:bg-muted/80 transition-colors")}>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Calculator className="size-5 text-primary" />
                      <CardTitle className="text-lg">Cálculos IRRF/PJ</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">Ferramentas especializadas para cálculos de IRRF para pessoas jurídicas, incluindo correções e atualizações monetárias.</p>
                  </CardContent>
                </Card>

                <Card className={cn("bg-muted/50 hover:bg-muted/80 transition-colors")}>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="size-5 text-primary" />
                      <CardTitle className="text-lg">Relatórios Fiscais</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">Geração de relatórios detalhados e personalizados para acompanhamento fiscal e tributário dos clientes.</p>
                  </CardContent>
                </Card>

                <Card className={cn("bg-muted/50 hover:bg-muted/80 transition-colors")}>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Paintbrush className="size-5 text-primary" />
                      <CardTitle className="text-lg">Editor do Site</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">Personalização completa da interface e conteúdo do site institucional, com controle total sobre a aparência e informações.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-medium">Suporte Técnico</h3>
              <p>
                O sistema conta com suporte técnico especializado, disponível através do módulo de Suporte. Para problemas 
                técnicos, dúvidas sobre funcionalidades ou solicitações de novos recursos, utilize o canal de suporte 
                para obter assistência rápida e eficiente.
              </p>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OverviewContent;
