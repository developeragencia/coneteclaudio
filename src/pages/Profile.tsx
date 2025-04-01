import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || ''} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium mb-2">Função</h3>
                <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Permissões</h3>
                <div className="flex flex-wrap gap-2">
                  {user?.permissions?.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 