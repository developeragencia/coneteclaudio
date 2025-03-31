import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';

const LoginBackground: React.FC = () => {
  return (
    <>
      {/* Grid pattern background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      </div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right blob */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 -top-48 -right-48 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Bottom left blob */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-secondary/10 -bottom-48 -left-48 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Center floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.2 
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 } 
          }}
          className="cursor-pointer"
        >
          <AnimatedLogo />
        </motion.div>
      </div>

      {/* Light effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full bg-gradient-to-tr from-transparent via-primary/5 to-transparent"
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </>
  );
};

export default LoginBackground;
