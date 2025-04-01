import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-gray-700">Carregando...</p>
      </motion.div>
    </div>
  );
} 