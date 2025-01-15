export interface Note {
  id: string;
  title: string;
  content: string;
  path: string;
  tags: string[];
  links: string[]; // IDs of linked notes
  createdAt: Date;
  updatedAt: Date;
  properties?: Record<string, any>; // Metadados flexíveis
}

export interface NoteBlock {
  id: string;
  content: string;
  children: NoteBlock[];
  properties?: Record<string, any>;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  children: Array<Folder | Note>;
}

export type NoteTreeItem = Note | Folder;

export interface NoteGraph {
  nodes: Note[];
  edges: Array<{
    source: string;
    target: string;
    type: 'link' | 'reference' | 'tag';
  }>;
}
