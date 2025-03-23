
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, RotateCcw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const domain = window.location.hostname;
  
  useEffect(() => {
    console.error(
      "Erro 404: Usuário tentou acessar uma rota inexistente:",
      location.pathname,
      "no domínio:",
      domain
    );
  }, [location.pathname, domain]);

  const handleBackToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Ops! Página não encontrada</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          A página que você está procurando em <span className="font-medium">sistemasclaudiofigueiredo.com.br</span> não existe ou foi removida.
        </p>
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={handleBackToAdmin} 
            className="w-full"
            variant="default"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para o Painel Admin
          </Button>
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Voltar para página anterior
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Ir para Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
