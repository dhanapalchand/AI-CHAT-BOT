import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Group, Textarea, Button, ActionIcon, Container } from '@mantine/core';
import { IconSend, IconPaperclip } from '@tabler/icons-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div 
      className="border-t border-white/20 p-4"
      style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)' }}
    >
      <Container size="lg">
        <form onSubmit={handleSubmit}>
          <Group align="flex-end" gap="md">
            <div className="flex-1">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Message your workspace assistant..."
                autosize
                minRows={1}
                maxRows={6}
                rightSection={
                  <ActionIcon
                    variant="subtle"
                    onClick={() => {/* Handle file attachment */}}
                    className="text-white/60 hover:text-white"
                  >
                    <IconPaperclip size={20} />
                  </ActionIcon>
                }
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '24px',
                    color: 'white',
                    fontSize: '16px',
                    padding: '16px 20px',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                    },
                    '&:focus': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
          
            <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            size="lg"
            className="liquid-button"
            style={{
              background: !message.trim() || isLoading 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '24px',
              padding: '16px',
            }}
          >
            <IconSend size={20} />
          </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default ChatInput;