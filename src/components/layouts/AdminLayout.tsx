import { Outlet, useNavigate } from 'react-router-dom';
import { MainMenu } from '@/components/admin/MainMenu';
import { UserMenu } from '@/components/admin/UserMenu';
import { useAuth } from '@/hooks/useAuth';

export function AdminLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <MainMenu />
        <div className="mt-auto border-t p-4">
          <UserMenu user={user} onSignOut={handleSignOut} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="h-14 border-b bg-card px-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 