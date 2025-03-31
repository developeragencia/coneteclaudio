import {
  LayoutDashboard,
  FileSpreadsheet,
  Receipt,
  FileCheck,
  Settings,
  Users,
  Building2,
  FileBarChart
} from 'lucide-react';

export const mainMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
    description: 'Visualize métricas e indicadores importantes'
  },
  {
    title: 'FCA',
    icon: FileBarChart,
    href: '/admin/fca',
    description: 'Gestão do Fluxo de Caixa Antecipado'
  },
  {
    title: 'Relatórios Fiscais',
    icon: FileSpreadsheet,
    href: '/admin/fiscal-reports',
    description: 'Gere e gerencie relatórios fiscais'
  },
  {
    title: 'Comprovantes de Retenção',
    icon: Receipt,
    href: '/admin/retention-receipts',
    description: 'Gerencie comprovantes de retenção'
  },
  {
    title: 'Auditoria e Retenção',
    icon: FileCheck,
    href: '/admin/auditoria',
    description: 'Auditoria e gestão de retenções'
  },
  {
    title: 'Clientes',
    icon: Users,
    href: '/admin/clients',
    description: 'Gerencie os clientes do sistema'
  },
  {
    title: 'Fornecedores',
    icon: Building2,
    href: '/admin/suppliers',
    description: 'Gerencie os fornecedores do sistema'
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/admin/settings',
    description: 'Configure as opções do sistema'
  }
]; 