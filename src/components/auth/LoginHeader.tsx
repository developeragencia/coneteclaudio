import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';

const LoginHeader: React.FC = () => {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center">
        <AnimatedLogo width={200} height={60} className="text-primary" />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          Bem-vindo de volta!
        </h2>
        <p className="text-sm text-muted-foreground">
          Faça login para acessar o painel administrativo
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginHeader;
