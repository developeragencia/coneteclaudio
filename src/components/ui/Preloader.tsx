import React from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  message?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-2xl"
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-4 border-primary/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-t-primary border-r-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium text-gray-700"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default React.memo(Preloader); 