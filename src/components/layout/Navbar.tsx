import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Group, Button, Text } from '@mantine/core';
import { IconRobot, IconPlus, IconHome } from '@tabler/icons-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Workspaces', icon: IconHome },
    { path: '/create', label: 'Create', icon: IconPlus },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-morphism border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Group justify="space-between" h={64}>
          <Link to="/" className="flex items-center space-x-3 no-underline">
            <IconRobot size={32} className="text-white" />
            <Text size="xl" fw={700} className="text-white">
              AI Workspace
            </Text>
          </Link>

          <Group gap="xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  variant={isActive ? "filled" : "subtle"}
                  leftSection={<Icon size={16} />}
                  className={`liquid-button ${isActive ? 'bg-white/20' : ''}`}
                  style={{
                    color: 'white',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Group>
        </Group>
      </div>
    </motion.nav>
  );
};

export default Navbar;