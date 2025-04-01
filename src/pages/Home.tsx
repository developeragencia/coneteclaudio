import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BarChart3, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import MainNav from '@/components/navigation/MainNav';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Análise Inteligente",
      description: "Análise automatizada de documentos fiscais para identificação de créditos."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com a mais alta tecnologia de criptografia."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Recuperação Rápida",
      description: "Processo otimizado para recuperação de créditos em tempo recorde."
    }
  ];

  const benefits = [
    "Economia de tempo e recursos",
    "Maior precisão na análise fiscal",
    "Acompanhamento em tempo real",
    "Suporte especializado",
    "Dashboard intuitivo",
    "Relatórios detalhados"
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      {/* Header/Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <AnimatedLogo className="mx-auto mb-8" width={280} height={84} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mb-6">
              Recuperação de Créditos IRRF/PJ
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Automatize e simplifique o processo de recuperação de créditos tributários para sua empresa com nossa plataforma inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group"
                onClick={() => navigate('/login')}
              >
                Acessar Sistema
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511999999999', '_blank')}
              >
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-muted/30" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-background p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" id="sobre">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma solução completa para maximizar a recuperação de créditos tributários da sua empresa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-t border-primary/10" id="contato">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Comece a recuperar seus créditos hoje mesmo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Nossa equipe está pronta para ajudar sua empresa a recuperar créditos tributários de forma eficiente e segura.
            </p>
            <Button
              size="lg"
              className="group"
              onClick={() => navigate('/login')}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <AnimatedLogo width={120} height={36} />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Todos os direitos reservados
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-primary transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 