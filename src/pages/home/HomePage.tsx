import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Container, Title, Text, TextInput, Button, Group, Grid, SimpleGrid } from '@mantine/core';
import { IconPlus, IconSearch, IconFilter } from '@tabler/icons-react';
import { useWorkspaces } from '../../api/queries';
import { currentWorkspaceState } from '../../store/atoms';
import { Workspace } from '../../types';
import WorkspaceCard from './components/WorkspaceCard';
import GlassCard from '../../components/ui/GlassCard';
import Preloader from '../../components/ui/Preloader';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const setCurrentWorkspace = useSetRecoilState(currentWorkspaceState);
  const { data: workspaces, isLoading, error } = useWorkspaces();

  const handleEditWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    navigate(`/edit/${workspace.id}`);
  };

  const handleChatWithWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    navigate(`/chat/${workspace.id}`);
  };

  const filteredWorkspaces = workspaces?.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return <Preloader message="Loading workspaces..." />;
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <GlassCard className="p-8 text-center">
          <Text size="xl" fw={600} className="text-white mb-2">
            Error Loading Workspaces
          </Text>
          <Text className="text-white/80">
            Please try refreshing the page
          </Text>
        </GlassCard>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pt-20 pb-8"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Title order={1} size="h1" className="text-white mb-2">
            Your AI Workspaces
          </Title>
          <Text size="lg" className="text-white/80">
            Manage and access your AI-powered document workspaces
          </Text>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <Group justify="space-between" align="center">
              <div className="flex-1 max-w-md">
                <TextInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workspaces..."
                  leftSection={<IconSearch size={16} />}
                  styles={{
                    input: {
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.6)',
                      },
                    },
                  }}
                />
              </div>
              
              <Group gap="md">
                <Button
                  variant="subtle"
                  leftSection={<IconFilter size={16} />}
                  className="liquid-button"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  Filter
                </Button>
                
                <Button
                  onClick={() => navigate('/create')}
                  leftSection={<IconPlus size={16} />}
                  className="liquid-button"
                  style={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  New Workspace
                </Button>
              </Group>
            </Group>
          </GlassCard>
        </motion.div>

        {/* Workspaces Grid */}
        {filteredWorkspaces.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="xl"
            >
              {filteredWorkspaces.map((workspace, index) => (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <WorkspaceCard
                    workspace={workspace}
                    onEdit={handleEditWorkspace}
                    onChat={handleChatWithWorkspace}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <GlassCard className="p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconPlus size={32} className="text-white" />
              </div>
              <Title order={3} className="text-white mb-4">
                {searchQuery ? 'No workspaces found' : 'No workspaces yet'}
              </Title>
              <Text className="text-white/80 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Create your first workspace to get started with AI-powered document analysis'
                }
              </Text>
              {!searchQuery && (
                <Button
                  onClick={() => navigate('/create')}
                  leftSection={<IconPlus size={16} />}
                  className="liquid-button"
                  style={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Create Your First Workspace
                </Button>
              )}
            </GlassCard>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;