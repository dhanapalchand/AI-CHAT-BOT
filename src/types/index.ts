export interface Workspace {
  id: string;
  name: string;
  description: string;
  files: File[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  workspaceId: string;
}

export interface ChatSession {
  id: string;
  workspaceId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}