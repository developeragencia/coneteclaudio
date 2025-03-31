import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Lock } from 'lucide-react';

const LoginFooter: React.FC = () => {
  return (
    <motion.div
      className="space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>Conexão segura via SSL</span>
      </div>
      
      <motion.div
        className="text-xs text-muted-foreground/80"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link 
          to="/politica-privacidade" 
          className="hover:text-primary transition-colors flex items-center justify-center space-x-1"
        >
          <span>Política de Privacidade</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </motion.div>
      
      <div className="text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Advogados Associados. Todos os direitos reservados.
      </div>
    </motion.div>
  );
};

export default LoginFooter;
