import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'dashboard'
  },
  {
    title: 'Segurança e Auditoria',
    items: [
      {
        title: 'Auditoria e Retenção',
        href: '/admin/auditoria',
        icon: 'audit'
      },
      {
        title: 'Logs do Sistema',
        href: '/admin/logs',
        icon: 'logs'
      },
      {
        title: 'Configurações',
        href: '/admin/configuracoes',
        icon: 'settings'
      }
    ]
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <Sidebar menuItems={menuItems} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 