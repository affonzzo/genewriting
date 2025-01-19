export type WritingMode = 'planning' | 'free' | 'bomb' | 'line' | 'chat' | 'agent';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}