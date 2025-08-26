import React from 'react';
import { motion } from 'framer-motion';
import { Card, Text, Group, Button } from '@mantine/core';
import { IconEdit, IconMessageCircle, IconCalendar, IconFile } from '@tabler/icons-react';
import { Workspace } from '../../../types';
import GlassCard from '../../../components/ui/GlassCard';

interface WorkspaceCardProps {
  workspace: Workspace;
  onEdit: (workspace: Workspace) => void;
  onChat: (workspace: Workspace) => void;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onEdit, onChat }) => {
  return (
    <GlassCard hover className="h-full">
      <Card.Section className="p-6 h-full flex flex-col">
        <div className="flex-1 mb-6">
          <Group justify="space-between" mb="md">
            <Text size="xl" fw={600} c="white" className="line-clamp-2">
              {workspace.name}
            </Text>
          </Group>
          
          <Text size="sm" c="rgba(255, 255, 255, 0.8)" className="line-clamp-3 mb-4">
            {workspace.description}
          </Text>
          
          <Group gap="lg" mb="md">
            <Group gap="xs">
              <IconFile size={16} className="text-white/60" />
              <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                {workspace.files.length} files
              </Text>
            </Group>
            <Group gap="xs">
              <IconCalendar size={16} className="text-white/60" />
              <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                {new Date(workspace.updatedAt).toLocaleDateString()}
              </Text>
            </Group>
          </Group>
        </div>

        <Group grow>
          <Button
            onClick={() => onEdit(workspace)}
            variant="subtle"
            leftSection={<IconEdit size={16} />}
            className="liquid-button"
            styles={{
              root: {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Edit
          </Button>
          
          <Button
            onClick={() => onChat(workspace)}
            leftSection={<IconMessageCircle size={16} />}
            className="liquid-button"
            styles={{
              root: {
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Chat
          </Button>
        </Group>
      </Card.Section>
    </GlassCard>
  );
};

export default WorkspaceCard;