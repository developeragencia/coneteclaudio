
import React from 'react';
import { BookOpen } from 'lucide-react';

const DocumentationHeader = () => {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Documentação do Sistema</h2>
        </div>
        <p className="text-muted-foreground">
          Documentação completa sobre as funcionalidades e recursos do sistema.
        </p>
      </div>
    </div>
  );
};

export default DocumentationHeader;
