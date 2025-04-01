import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 