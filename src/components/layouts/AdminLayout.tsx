import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/admin/Sidebar';

export function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background p-4">
        <Outlet />
      </main>
    </div>
  );
} 