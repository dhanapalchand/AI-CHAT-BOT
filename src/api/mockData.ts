import { Workspace, ChatSession, ChatMessage } from '../types';

export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Marketing documents, campaigns, and brand guidelines',
    files: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Engineering Docs',
    description: 'Technical documentation, API specs, and development guides',
    files: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    name: 'HR Policies',
    description: 'Employee handbook, policies, and procedures',
    files: [],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    workspaceId: '1',
    title: 'Marketing Strategy Discussion',
    messages: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    workspaceId: '2',
    title: 'API Documentation Query',
    messages: [],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hello! How can I help you with your marketing documents today?',
    role: 'assistant',
    timestamp: new Date('2024-01-20T10:00:00'),
    workspaceId: '1',
  },
  {
    id: '2',
    content: 'Can you summarize the Q4 marketing campaign results?',
    role: 'user',
    timestamp: new Date('2024-01-20T10:01:00'),
    workspaceId: '1',
  },
  {
    id: '3',
    content: 'Based on the documents in your workspace, the Q4 marketing campaign showed excellent results with a 34% increase in engagement and 28% boost in conversions compared to Q3.',
    role: 'assistant',
    timestamp: new Date('2024-01-20T10:02:00'),
    workspaceId: '1',
  },
];