import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
