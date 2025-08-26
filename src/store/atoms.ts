import { atom } from 'recoil';
import { Workspace, ChatSession, ChatMessage } from '../types';

export const workspacesState = atom<Workspace[]>({
  key: 'workspacesState',
  default: [],
});

export const currentWorkspaceState = atom<Workspace | null>({
  key: 'currentWorkspaceState',
  default: null,
});

export const chatSessionsState = atom<ChatSession[]>({
  key: 'chatSessionsState',
  default: [],
});

export const currentChatSessionState = atom<ChatSession | null>({
  key: 'currentChatSessionState',
  default: null,
});

export const messagesState = atom<ChatMessage[]>({
  key: 'messagesState',
  default: [],
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export const sidebarOpenState = atom<boolean>({
  key: 'sidebarOpenState',
  default: true,
});