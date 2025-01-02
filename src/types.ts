export type WritingMode = 'free' | 'bomb' | 'line' | 'feedback';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}