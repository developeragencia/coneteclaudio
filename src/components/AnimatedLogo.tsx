import React from 'react';
import { motion } from 'framer-motion';

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  }
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

interface AnimatedLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = "",
  width = 150,
  height = 40
}) => {
  return (
    <motion.div
      className={className}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 600 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triângulos animados */}
        <motion.path
          d="M80 20L140 120H20L80 20Z"
          fill="currentColor"
          variants={pathVariants}
          className="text-primary"
        />
        <motion.path
          d="M180 20L240 120H120L180 20Z"
          fill="currentColor"
          variants={pathVariants}
          className="text-primary/80"
        />
        <motion.path
          d="M280 20L340 120H220L280 20Z"
          fill="currentColor"
          variants={pathVariants}
          className="text-primary/60"
        />

        {/* Texto "ADVOGADOS ASSOCIADOS" */}
        <motion.text
          x="380"
          y="80"
          className="text-4xl font-bold text-foreground"
          style={{ fontFamily: 'system-ui' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          ADVOGADOS
        </motion.text>
        <motion.text
          x="380"
          y="110"
          className="text-2xl text-muted-foreground"
          style={{ fontFamily: 'system-ui' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          ASSOCIADOS
        </motion.text>
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;
