
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Bell, Globe, Shield, Paintbrush, ServerCog } from 'lucide-react';

const SettingsContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>
          Documentação completa sobre o módulo de configurações do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Settings className="size-5 text-primary" />
                Visão Geral do Módulo de Configurações
              </h3>
              <p>
                O módulo de Configurações permite personalizar e adaptar o sistema de acordo com as 
                necessidades específicas da organização. Através de diversas opções de configuração, 
                é possível otimizar o funcionamento do sistema para diferentes contextos e requisitos.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Paintbrush className="size-5 text-primary" />
                Personalização da Interface
              </h3>
              <p>
                O sistema oferece diversas opções de personalização visual:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Temas e cores:</span> Alteração de esquemas de cores e temas visuais.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Layouts:</span> Ajuste da disposição de elementos na interface.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Personalização de menus:</span> Reordenação e ocultação de itens do menu.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Dashboards personalizados:</span> Configuração de painéis específicos para diferentes usuários.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Dimensões e fontes:</span> Ajuste de tamanhos de elementos e textos.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Bell className="size-5 text-primary" />
                Configurações de Notificações
              </h3>
              <p>
                É possível configurar o sistema de notificações de maneira detalhada:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Tipos de alertas:</span> Definição de quais eventos devem gerar notificações.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Canais de notificação:</span> Escolha entre notificações no sistema, e-mails ou outras formas de alerta.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Agendamento:</span> Configuração de horários para envio de resumos e alertas periódicos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Níveis de prioridade:</span> Definição da importância de diferentes tipos de notificação.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Personalização por usuário:</span> Possibilidade de cada usuário ajustar suas preferências de notificação.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Configurações de Segurança
              </h3>
              <p>
                O sistema permite a personalização de políticas de segurança:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Política de senhas:</span> Definição de requisitos mínimos e periodicidade de atualização.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Autenticação de dois fatores:</span> Configuração de métodos 2FA e obrigatoriedade.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Tempo de sessão:</span> Ajuste do período de inatividade para encerramento automático.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Restrições de IP:</span> Definição de intervalos de IPs permitidos para acesso.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Trilhas de auditoria:</span> Configuração do nível de detalhamento dos registros de atividades.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Globe className="size-5 text-primary" />
                Configurações Regionais e Fiscais
              </h3>
              <p>
                É possível adaptar o sistema para diferentes contextos fiscais e regionais:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Moeda e formato numérico:</span> Definição de moeda padrão e formatos de apresentação de valores.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Fuso horário:</span> Ajuste de data e hora conforme a localização.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Idioma:</span> Alteração do idioma da interface e dos relatórios.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Regras fiscais:</span> Configuração de parâmetros específicos de acordo com a legislação vigente.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Alíquotas padrão:</span> Definição de valores default para diferentes tipos de impostos.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <ServerCog className="size-5 text-primary" />
                Configurações Técnicas
              </h3>
              <p>
                Administradores técnicos podem configurar aspectos avançados do sistema:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Backup e recuperação:</span> Programação de backups automáticos e políticas de retenção.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Integrações:</span> Configuração de conexões com sistemas externos e APIs.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cache e performance:</span> Ajuste de parâmetros para otimização do desempenho.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Logs do sistema:</span> Configuração de níveis de log e retenção de registros.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Limites e cotas:</span> Definição de limites para upload de arquivos, tamanho de banco de dados, etc.
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SettingsContent;
