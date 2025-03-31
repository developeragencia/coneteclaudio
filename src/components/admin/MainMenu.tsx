import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Building2,
  ChevronRight 
} from 'lucide-react';

export function MainMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      description: 'Visão geral do sistema',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      title: 'Usuários',
      description: 'Gerenciar usuários do sistema',
      icon: Users,
      path: '/admin/users',
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes',
      icon: Building,
      path: '/admin/clients',
    },
    {
      title: 'Fornecedores',
      description: 'Gerenciar fornecedores',
      icon: Building2,
      path: '/admin/suppliers',
    },
  ];

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <nav className="grid gap-2 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.path}
            variant={isActive ? "secondary" : "ghost"}
            className={`w-full justify-start gap-2 ${isActive ? 'bg-primary/10' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
          </Button>
        );
      })}
    </nav>
  );
} 