import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function ScrollRevealSection({
  children,
  id,
  className = '',
  delay = 0
}: ScrollRevealSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ 
        opacity: 0, 
        y: 36, 
        filter: 'blur(10px)' 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)' 
      }}
      viewport={{ 
        once: true, 
        amount: 0.15,
        margin: '0px 0px -60px 0px'
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] // smooth cubic-bezier curve
      }}
    >
      {children}
    </motion.div>
  );
}
