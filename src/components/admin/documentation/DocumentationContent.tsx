
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Users, CreditCard, Shield, Settings, BarChart, 
  Calculator, FileText, Paintbrush, Database, Code, Github, Code2 
} from 'lucide-react';
import DocumentationHeader from './DocumentationHeader';
import { cn } from '@/lib/utils';
import OverviewContent from './tabs/OverviewContent';
import UsersContent from './tabs/UsersContent';
import CreditsContent from './tabs/CreditsContent';
import AuditsContent from './tabs/AuditsContent';
import ReportsContent from './tabs/ReportsContent';
import SettingsContent from './tabs/SettingsContent';

const APP_VERSION = "1.0.0";
const TECH_STACK = "React, TypeScript, Tailwind CSS, Shadcn/UI";

const DocumentationContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <DocumentationHeader />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="bg-background sticky top-0 z-10 pb-3 pt-1">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full h-auto bg-muted/60 backdrop-blur">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span className="hidden md:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="size-4" />
              <span className="hidden md:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span className="hidden md:inline">Créditos</span>
            </TabsTrigger>
            <TabsTrigger value="audits" className="flex items-center gap-2">
              <Shield className="size-4" />
              <span className="hidden md:inline">Auditorias</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="size-4" />
              <span className="hidden md:inline">Relatórios</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="size-4" />
              <span className="hidden md:inline">Configurações</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <OverviewContent />
        </TabsContent>

        <TabsContent value="users">
          <UsersContent />
        </TabsContent>

        <TabsContent value="credits">
          <CreditsContent />
        </TabsContent>
        
        <TabsContent value="audits">
          <AuditsContent />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsContent />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsContent />
        </TabsContent>
      </Tabs>
      
      <Card className="border-dashed border-muted-foreground/30">
        <CardFooter className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Versão {APP_VERSION}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              <Github className="size-3 mr-1" />
              {TECH_STACK}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentationContent;
