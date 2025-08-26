import React from 'react';
import { motion } from 'framer-motion';
import { Group, Text, Avatar } from '@mantine/core';
import { IconRobot, IconUser } from '@tabler/icons-react';
import { ChatMessage as MessageType } from '../../../types';

interface ChatMessageProps {
  message: MessageType;
  isLast?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <Group gap="md" align="flex-start" className={`max-w-4xl ${isUser ? 'flex-row-reverse' : ''}`}>
        <Avatar
          size="sm"
          className={isUser ? 'ml-3' : 'mr-3'}
          style={{
            background: isUser 
              ? 'linear-gradient(45deg, #667eea, #764ba2)' 
              : 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {isUser ? (
            <IconUser size={16} className="text-white" />
          ) : (
            <IconRobot size={16} className="text-white" />
          )}
        </Avatar>
        
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div 
            className={`inline-block px-6 py-4 rounded-3xl ${isUser ? 'text-white' : 'text-white'}`}
            style={{
              background: isUser
                ? 'linear-gradient(45deg, #667eea, #764ba2)'
                : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
          >
            <Text className="leading-relaxed whitespace-pre-wrap">{message.content}</Text>
          </div>
          
          <Text size="xs" className="text-white/50 mt-2 px-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </div>
      </Group>
    </motion.div>
  );
};

export default ChatMessage;