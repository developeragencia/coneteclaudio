
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Users, ShieldCheck, KeyRound } from 'lucide-react';

const UsersContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Usuários</CardTitle>
        <CardDescription>
          Documentação completa sobre o módulo de usuários, perfis e permissões
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Users className="size-5 text-primary" />
                Visão Geral do Módulo de Usuários
              </h3>
              <p>
                O módulo de Gestão de Usuários permite controlar o acesso ao sistema, definir permissões e 
                gerenciar os perfis de usuários. Este módulo é essencial para manter a segurança e o controle 
                de acesso às informações do sistema.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <User className="size-5 text-primary" />
                Perfis de Usuários
              </h3>
              <p>
                O sistema possui diferentes perfis de usuários, cada um com permissões específicas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Administrador:</span> Acesso completo a todas as funcionalidades e configurações do sistema.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Gerente:</span> Acesso à gestão de usuários, clientes e relatórios, sem acesso às configurações avançadas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Analista:</span> Acesso à identificação de créditos, processamento de dados e relatórios básicos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Cliente:</span> Acesso limitado ao dashboard, relatórios e informações específicas de sua conta.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Suporte:</span> Acesso a ferramentas de suporte e ajuda a usuários.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                Permissões e Controles de Acesso
              </h3>
              <p>
                As permissões no sistema são baseadas em papéis (roles) e podem ser configuradas em diversos níveis:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Permissões por módulo:</span> Determina quais módulos cada perfil pode acessar.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Permissões por funcionalidade:</span> Controla quais funções específicas podem ser executadas.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Permissões por cliente:</span> Restringe o acesso a informações de clientes específicos.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Permissões de leitura/escrita:</span> Define se o usuário pode apenas visualizar ou também editar dados.
                </li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <KeyRound className="size-5 text-primary" />
                Segurança e Autenticação
              </h3>
              <p>
                O sistema implementa diversas camadas de segurança para proteger os dados e o acesso:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Autenticação de dois fatores (2FA):</span> Adiciona uma camada extra de segurança no login.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Expiração de sessão:</span> Configuração do tempo de inatividade para encerramento automático da sessão.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Bloqueio de IP:</span> Proteção contra tentativas de acesso não autorizado.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Registro de atividades:</span> Trilhas de auditoria para todas as ações realizadas no sistema.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Política de senhas:</span> Exigências para senhas fortes e períodos de atualização.
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UsersContent;
