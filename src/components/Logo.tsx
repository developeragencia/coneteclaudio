import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export function Logo({ className, animate = true }: LogoProps) {
  const triangleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <motion.div 
      className={cn('relative w-[200px] h-[200px]', className)}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
    >
      {/* Logo container */}
      <div className="relative w-full h-full">
        {/* Triângulos escuros */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`dark-${i}`}
            custom={i}
            variants={triangleVariants}
            className="absolute bg-gray-800"
            style={{
              width: '60px',
              height: '60px',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              transform: `rotate(${60 * i}deg) translate(30px, 30px)`
            }}
          />
        ))}

        {/* Triângulos claros */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`light-${i}`}
            custom={i + 4}
            variants={triangleVariants}
            className="absolute bg-white"
            style={{
              width: '60px',
              height: '60px',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              transform: `rotate(${60 * i + 30}deg) translate(60px, 30px)`
            }}
          />
        ))}
      </div>

      {/* Texto "ADVOGADOS ASSOCIADOS" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -bottom-8 left-0 right-0 text-center text-lg font-semibold tracking-wider"
      >
        ADVOGADOS ASSOCIADOS
      </motion.div>
    </motion.div>
  );
} 