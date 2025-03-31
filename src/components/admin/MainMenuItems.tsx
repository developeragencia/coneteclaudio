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
import { useNavigate } from 'react-router-dom';

export function MainMenuItems() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      description: 'Visão geral do sistema',
      icon: 'LayoutDashboard',
      href: '/admin/dashboard',
      color: 'blue',
    },
    {
      title: 'Usuários',
      description: 'Gerenciar usuários do sistema',
      icon: 'Users',
      href: '/admin/users',
      color: 'green',
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes',
      icon: 'Building',
      href: '/admin/clients',
      color: 'purple',
    },
    {
      title: 'Fornecedores',
      description: 'Gerenciar fornecedores',
      icon: 'Building2',
      href: '/admin/suppliers',
      color: 'orange',
    }
  ];

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <button
          key={item.href}
          onClick={() => handleNavigate(item.href)}
          className="p-4 rounded-lg border hover:border-primary transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className={`text-${item.color}-500`}>{item.icon}</span>
            <div className="text-left">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

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