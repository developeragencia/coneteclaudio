
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, Calculator, FileSearch, DatabaseIcon, ArrowDownUp } from 'lucide-react';

const CreditsContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créditos Tributários</CardTitle>
        <CardDescription>
          Documentação completa sobre o módulo de créditos tributários, recuperação e processamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <CreditCard className="size-5 text-primary" />
                Visão Geral do Módulo de Créditos
              </h3>
              <p>
                O módulo de Créditos Tributários é o coração do sistema, responsável pela gestão completa 
                do processo de identificação, cálculo, recuperação e acompanhamento de créditos tributários 
                para os clientes. Este módulo integra múltiplas funcionalidades para garantir precisão e 
                eficiência na administração fiscal.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <FileSearch className="size-5 text-primary" />
                Identificação de Créditos
              </h3>
              <p>
                O sistema realiza a identificação automatizada de créditos tributários a partir de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Análise de documentos fiscais:</span> Notas fiscais, declarações e outros documentos relevantes.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Verificação de legislação:</span> Compatibilidade com as normas fiscais vigentes.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Histórico tributário:</span> Análise do histórico fiscal do cliente para identificar padrões e oportunidades.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cruzamento de dados:</span> Comparação entre diferentes fontes de informação para detectar inconsistências.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Calculator className="size-5 text-primary" />
                Cálculos e Processamento
              </h3>
              <p>
                Após a identificação, o sistema realiza cálculos precisos para determinar o valor dos créditos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cálculos de IRRF:</span> Imposto de Renda Retido na Fonte para pessoas jurídicas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cálculos de PIS/COFINS:</span> Programa de Integração Social e Contribuição para Financiamento da Seguridade Social.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Correção monetária:</span> Atualização de valores com base na taxa SELIC.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Análise de viabilidade:</span> Cálculo do potencial de recuperação versus custos envolvidos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Simulações:</span> Projeções de diferentes cenários para tomada de decisão.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <ArrowDownUp className="size-5 text-primary" />
                Recuperação de Créditos
              </h3>
              <p>
                O módulo permite o acompanhamento completo do processo de recuperação:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Geração de documentos:</span> Criação automática de documentos para solicitação de créditos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Acompanhamento de processos:</span> Monitoramento do status de cada solicitação.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Gestão de prazos:</span> Controle de datas importantes e alertas automáticos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Compensação tributária:</span> Ferramentas para utilização dos créditos em compensações fiscais.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <DatabaseIcon className="size-5 text-primary" />
                Importação e Processamento de Dados
              </h3>
              <p>
                O sistema oferece recursos avançados para importação e processamento de dados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Importação de documentos fiscais:</span> Notas fiscais eletrônicas, arquivos XML, SPED Fiscal e outros formatos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Processamento em lote:</span> Análise simultânea de múltiplos documentos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Validação automática:</span> Verificação de consistência dos dados importados.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Extração inteligente:</span> Identificação automática de informações relevantes em documentos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Integração com sistemas contábeis:</span> Conexão com ERPs e sistemas de contabilidade.
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CreditsContent;
