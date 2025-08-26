import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Group, Text, Button, Container } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useMessages, useSendMessage } from '../../api/queries';
import { currentWorkspaceState, messagesState } from '../../store/atoms';
import { ChatMessage as MessageType } from '../../types';
import ChatSidebar from './components/ChatSidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Preloader from '../../components/ui/Preloader';

const ChatPage: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  const messages = useRecoilValue(messagesState);
  const setMessages = useSetRecoilState(messagesState);
  const sendMessage = useSendMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with demo messages
  useEffect(() => {
    if (messages.length === 0) {
      const demoMessages: MessageType[] = [
        {
          id: '1',
          content: `Hello! I'm your AI assistant for the "${currentWorkspace?.name || 'workspace'}" workspace. I can help you find information, answer questions, and provide insights based on your uploaded documents. How can I assist you today?`,
          role: 'assistant',
          timestamp: new Date(),
          workspaceId: workspaceId || '',
        },
      ];
      setMessages(demoMessages);
    }
  }, [messages.length, setMessages, currentWorkspace?.name, workspaceId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!workspaceId) {
    navigate('/');
    return null;
  }

  if (!currentWorkspace) {
    return <Preloader message="Loading workspace..." />;
  }

  const handleSendMessage = async (content: string) => {
    try {
      const newMessages = await sendMessage.mutateAsync({ 
        content, 
        workspaceId: workspaceId 
      });
      setMessages(prev => [...prev, ...newMessages]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div 
      className="h-screen flex"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <ChatSidebar workspaceId={workspaceId} />
      
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism border-b border-white/20 px-4 py-4 lg:px-6"
        >
          <Group justify="space-between">
            <Group gap="md">
              <Button
                onClick={() => navigate('/')}
                variant="subtle"
                leftSection={<IconArrowLeft size={20} />}
                className="liquid-button lg:flex"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                Back to Workspaces
              </Button>
              
              <div className="text-center lg:text-left">
                <Text size="lg" fw={600} className="text-white">
                  {currentWorkspace.name}
                </Text>
                <Text size="sm" className="text-white/70">
                  AI Assistant • {messages.length} messages
                </Text>
              </div>
            </Group>
          </Group>
        </motion.header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <Container size="lg" className="px-4 py-6 lg:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-0"
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))}
              
              {sendMessage.isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-6"
                >
                  <div className="flex items-start space-x-3 max-w-4xl">
                    <div className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse" />
                    </div>
                    <div className="glass-morphism rounded-2xl px-6 py-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            <div ref={messagesEndRef} />
          </Container>
        </div>

        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={sendMessage.isPending}
        />
      </div>
    </div>
  );
};

export default ChatPage;