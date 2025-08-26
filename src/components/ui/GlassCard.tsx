import React from 'react';
import { motion } from 'framer-motion';
import { Paper } from '@mantine/core';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  darkMode?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = false, darkMode = false }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Paper
        className={`${darkMode ? 'glass-dark' : 'glass-morphism'} rounded-3xl border-0 h-full`}
        style={{
          background: darkMode 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default GlassCard;