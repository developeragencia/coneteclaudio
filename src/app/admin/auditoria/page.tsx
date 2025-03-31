import { AuditoriaRetencaoPanel } from '@/components/admin/auditoria/AuditoriaRetencaoPanel';

export default function AuditoriaPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Auditoria e Retenção</h1>
        <p className="text-gray-500 mt-2">
          Gerencie auditorias e retenções de pagamentos a fornecedores
        </p>
      </div>
      
      <AuditoriaRetencaoPanel />
    </div>
  );
} 