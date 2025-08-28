import React from 'react';
import { PaperProps } from '@mantine/core';
import { Card } from '@mantine/core';

interface GlassCardProps extends Omit<PaperProps, 'children'> {
  children: React.ReactNode;
  hover?: boolean;
  darkMode?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
}) => {
  return (
    <Card
      className={className}
      withBorder
      radius="lg"
      shadow="xl"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;