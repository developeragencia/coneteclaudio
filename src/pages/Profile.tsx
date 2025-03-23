import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileForm from '@/components/profile/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { useExportUserData, useImportUserData } from '@/hooks/useProfile';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const exportData = useExportUserData();
  const importData = useImportUserData();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          importData.mutate(data);
        } catch (error) {
          console.error('Erro ao importar dados:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Perfil</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="data">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Exportar dados</h3>
                <p className="text-muted-foreground mb-4">
                  Faça o download de todos os seus dados em formato JSON.
                </p>
                <Button
                  variant="outline"
                  onClick={() => exportData.mutate()}
                  disabled={exportData.isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar dados
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Importar dados</h3>
                <p className="text-muted-foreground mb-4">
                  Importe seus dados previamente exportados.
                </p>
                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    id="import-input"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('import-input')?.click()}
                    disabled={importData.isLoading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Importar dados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile; 