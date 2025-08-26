import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Workspace, ChatSession, ChatMessage } from '../types';
import { mockWorkspaces, mockChatSessions, mockMessages } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async (): Promise<Workspace[]> => {
      await delay(1000);
      return mockWorkspaces;
    },
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newWorkspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>) => {
      await delay(1500);
      const workspace: Workspace = {
        ...newWorkspace,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return workspace;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workspace: Workspace) => {
      await delay(1000);
      return { ...workspace, updatedAt: new Date() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};

export const useChatSessions = (workspaceId: string) => {
  return useQuery({
    queryKey: ['chatSessions', workspaceId],
    queryFn: async (): Promise<ChatSession[]> => {
      await delay(500);
      return mockChatSessions.filter(session => session.workspaceId === workspaceId);
    },
  });
};

export const useMessages = (sessionId: string) => {
  return useQuery({
    queryKey: ['messages', sessionId],
    queryFn: async (): Promise<ChatMessage[]> => {
      await delay(500);
      return mockMessages;
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, workspaceId }: { content: string; workspaceId: string }) => {
      await delay(1500);
      const userMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        content,
        role: 'user',
        timestamp: new Date(),
        workspaceId,
      };
      
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        content: `I understand your question about "${content}". Based on the documents in this workspace, I can help you find the relevant information. This is a demo response.`,
        role: 'assistant',
        timestamp: new Date(),
        workspaceId,
      };
      
      return [userMessage, assistantMessage];
    },
    onSuccess: (messages) => {
      queryClient.setQueryData(['messages'], (oldData: ChatMessage[] | undefined) => {
        return [...(oldData || []), ...messages];
      });
    },
  });
};