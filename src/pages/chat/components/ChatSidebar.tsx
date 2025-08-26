import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, TextInput, Text, Group, Stack, ActionIcon } from '@mantine/core';
import { IconPlus, IconSearch, IconMessageCircle, IconX, IconMenu2 } from '@tabler/icons-react';
import { sidebarOpenState, currentWorkspaceState } from '../../../store/atoms';
import { useChatSessions } from '../../../api/queries';
import GlassCard from '../../../components/ui/GlassCard';

interface ChatSidebarProps {
  workspaceId: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ workspaceId }) => {
  const sidebarOpen = useRecoilValue(sidebarOpenState);
  const setSidebarOpen = useSetRecoilState(sidebarOpenState);
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  const { data: chatSessions } = useChatSessions(workspaceId);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 glass-morphism rounded-2xl"
      >
        {sidebarOpen ? <IconX size={24} className="text-white" /> : <IconMenu2 size={24} className="text-white" />}
      </button>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 glass-dark border-r border-white/10 z-50 flex flex-col"
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <Group justify="space-between" mb="md">
                <Text fw={600} className="text-white truncate">
                  {currentWorkspace?.name || 'Chat'}
                </Text>
                <ActionIcon
                  onClick={() => setSidebarOpen(false)}
                  variant="subtle"
                  className="lg:hidden text-white"
                >
                  <IconX size={20} />
                </ActionIcon>
              </Group>
              
              <Button
                fullWidth
                leftSection={<IconPlus size={20} />}
                className="liquid-button"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                New Chat
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <TextInput
                placeholder="Search conversations..."
                leftSection={<IconSearch size={16} />}
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                    },
                  },
                }}
              />
            </div>

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <Button
                  fullWidth
                  variant="subtle"
                  className="liquid-button"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: 'rgb(239, 68, 68)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  Recent Chat
                </Button>
              </div>

              <Stack gap="xs">
                {chatSessions?.map((session) => (
                  <Button
                    key={session.id}
                    variant="subtle"
                    justify="flex-start"
                    leftSection={<IconMessageCircle size={16} />}
                    className="liquid-button"
                    style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {session.title}
                  </Button>
                )) || (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Button
                      key={i}
                      variant="subtle"
                      justify="flex-start"
                      leftSection={<IconMessageCircle size={16} />}
                      className="liquid-button"
                      style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      Chat {i + 1}
                    </Button>
                  ))
                )}
              </Stack>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-white/10">
              <Group gap="md">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Text size="sm" fw={500} className="text-white">U</Text>
                </div>
                <div className="flex-1">
                  <Text size="sm" fw={500} className="text-white">User</Text>
                  <Text size="xs" className="text-white/60">Organization</Text>
                </div>
              </Group>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatSidebar;