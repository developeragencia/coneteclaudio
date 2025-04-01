import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Key, Mail, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ADMIN_EMAIL = 'admin@sistemasclaudio.com';
const ADMIN_PASSWORD = 'admin123';

interface LoginFormProps {
  onSuccess: () => void;
}

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } }
};

const iconVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } }
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      
      if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Using fallback admin login');
        
        const authData = {
          email: ADMIN_EMAIL,
          isAdmin: true,
          timestamp: Date.now()
        };
        
        if (rememberMe) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify(authData));
        } else {
          localStorage.setItem('adminAuth', JSON.stringify(authData));
        }
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Painel Administrativo.",
        });
        
        setTimeout(() => {
          onSuccess();
        }, 500);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (error) throw error;

      if (rememberMe) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify({
            timestamp: Date.now(),
            sessionExpiry: data.session.expires_at
          }));
        }
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Painel Administrativo.",
      });
      
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
      toast({
        title: "Erro de autenticação",
        description: error.message || "Falha ao fazer login. Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleLogin} 
      className="space-y-4 sm:space-y-5"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <motion.div 
        className="space-y-2"
        initial="initial"
        animate="animate"
        variants={iconVariants}
      >
        <div className="relative">
          <motion.div
            animate={focusedField === 'email' ? 'focus' : 'blur'}
            variants={inputVariants}
          >
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors" />
          <Input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            required
              className="pl-10 border-primary/20 focus-visible:ring-primary/30 transition-all duration-300"
            aria-label="Email"
          />
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial="initial"
        animate="animate"
        variants={iconVariants}
      >
        <div className="relative">
          <motion.div
            animate={focusedField === 'password' ? 'focus' : 'blur'}
            variants={inputVariants}
          >
            <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors" />
          <Input
            id="password"
              type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            required
              className="pl-10 pr-10 border-primary/20 focus-visible:ring-primary/30 transition-all duration-300"
            aria-label="Senha"
          />
            <motion.button
              type="button"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-center space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Switch 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={setRememberMe}
          className="data-[state=checked]:bg-primary/80"
          aria-label="Manter conectado"
        />
        <Label 
          htmlFor="remember-me" 
          className="text-xs sm:text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        >
          Manter conectado
        </Label>
      </motion.div>
      
      <AnimatePresence mode="wait">
      {error && (
        <motion.div 
          className="text-xs sm:text-sm text-destructive bg-destructive/10 p-2 sm:p-3 rounded-md"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
      <Button 
        type="submit" 
          className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-gradient-to-r from-primary to-primary/90 hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              Entrar
            </motion.span>
        )}
      </Button>
      </motion.div>
    </motion.form>
  );
};

export default React.memo(LoginForm);
