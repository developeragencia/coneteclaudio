import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginFooter from '@/components/auth/LoginFooter';
import LoginBackground from '@/components/auth/LoginBackground';
import LoginLoadingState from '@/components/auth/LoginLoadingState';
import useLoginCheck from '@/hooks/useLoginCheck';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Login = () => {
  const { initializing } = useLoginCheck();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Using navigate instead of window.location for better performance
    navigate('/admin', { replace: true });
  };

  return (
    <AnimatePresence mode="wait">
      {initializing ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginLoadingState />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginBackground />
          
          <motion.div 
            className="relative w-full max-w-md z-10"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="shadow-xl border-primary/10 overflow-hidden bg-white/95 backdrop-blur-md dark:bg-background/80 transition-all duration-300 hover:shadow-primary/5">
              <motion.div variants={contentVariants}>
                <CardHeader className="space-y-1 text-center">
                  <LoginHeader />
                </CardHeader>
              </motion.div>

              <motion.div variants={contentVariants}>
                <CardContent>
                  <LoginForm onSuccess={handleLoginSuccess} />
                </CardContent>
              </motion.div>

              <motion.div variants={contentVariants}>
                <CardFooter className="flex justify-center text-center">
                  <LoginFooter />
                </CardFooter>
              </motion.div>
            </Card>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
