import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

interface AnimatedLogoProps {
  className?: string;
  width?: number;
  height?: number;
  hovering?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = "",
  width = 150,
  height = 40,
  hovering = false
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={hovering ? { scale: 1.05 } : undefined}
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: 0 }}
          animate={hovering ? { rotate: 360 } : undefined}
          transition={{ duration: 2, repeat: hovering ? Infinity : 0, ease: "linear" }}
        >
          <Database className="h-8 w-8 text-primary" />
        </motion.div>
        
        <div className="flex flex-col">
          <span className="font-bold text-foreground">
            Sistemas
          </span>
          <span className="text-sm font-medium text-primary/90">
            Claudio Figueiredo
          </span>
        </div>
    </div>
    </motion.div>
  );
};

export default React.memo(AnimatedLogo);
