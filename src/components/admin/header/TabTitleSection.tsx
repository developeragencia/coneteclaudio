
import React from 'react';
import { motion } from 'framer-motion';
import HeaderIcon from './HeaderIcon';
import { LucideIcon } from 'lucide-react';

interface TabTitleSectionProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const TabTitleSection = ({ Icon, title, description }: TabTitleSectionProps) => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={childVariants}
      className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/40"
    >
      <div className="flex items-center gap-2 mb-1">
        <HeaderIcon Icon={Icon} />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default TabTitleSection;
