import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AnimatedLogo width={200} height={60} className="text-primary mb-8" />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </motion.div>
      </motion.div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 -top-48 -right-48 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-secondary/5 -bottom-48 -left-48 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </div>
  );
};

export default LoadingState;
