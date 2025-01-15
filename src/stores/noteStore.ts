import { create } from 'zustand';
import { Note, Folder, NoteGraph } from '../types/note';

interface NoteStore {
  // Estado
  currentNote: Note | null;
  notes: Note[];
  folders: Folder[];
  graph: NoteGraph;
  
  // Ações
  setCurrentNote: (note: Note | null) => void;
  createNote: (note: Partial<Note>) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  createFolder: (folder: Partial<Folder>) => Promise<Folder>;
  moveNote: (noteId: string, newPath: string) => Promise<void>;
  
  // Pesquisa e Filtros
  searchNotes: (query: string) => Promise<Note[]>;
  getNotesByTag: (tag: string) => Note[];
  getLinkedNotes: (noteId: string) => Note[];
  
  // Sincronização
  syncNotes: () => Promise<void>;
  exportNotes: () => Promise<string>; // JSON
  importNotes: (data: string) => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  currentNote: null,
  notes: [],
  folders: [],
  graph: { nodes: [], edges: [] },
  
  setCurrentNote: (note) => set({ currentNote: note }),
  
  createNote: async (noteData) => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: noteData.title || 'Untitled',
      content: noteData.content || '',
      path: noteData.path || '/',
      tags: noteData.tags || [],
      links: noteData.links || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...noteData
    };
    
    set((state) => ({
      notes: [...state.notes, note]
    }));
    
    return note;
  },
  
  updateNote: async (id, updates) => {
    let updatedNote: Note | null = null;
    
    set((state) => {
      const notes = state.notes.map((note) => {
        if (note.id === id) {
          updatedNote = {
            ...note,
            ...updates,
            updatedAt: new Date()
          };
          return updatedNote;
        }
        return note;
      });
      
      return { notes };
    });
    
    if (!updatedNote) {
      throw new Error('Note not found');
    }
    
    return updatedNote;
  },
  
  deleteNote: async (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id)
    }));
  },
  
  createFolder: async (folderData) => {
    const folder: Folder = {
      id: crypto.randomUUID(),
      name: folderData.name || 'New Folder',
      path: folderData.path || '/',
      children: folderData.children || []
    };
    
    set((state) => ({
      folders: [...state.folders, folder]
    }));
    
    return folder;
  },
  
  moveNote: async (noteId, newPath) => {
    set((state) => ({
      notes: state.notes.map((note) => 
        note.id === noteId 
          ? { ...note, path: newPath, updatedAt: new Date() }
          : note
      )
    }));
  },
  
  searchNotes: async (query) => {
    const { notes } = get();
    const searchTerms = query.toLowerCase().split(' ');
    
    return notes.filter((note) => {
      const content = note.content.toLowerCase();
      const title = note.title.toLowerCase();
      return searchTerms.every((term) => 
        content.includes(term) || title.includes(term)
      );
    });
  },
  
  getNotesByTag: (tag) => {
    const { notes } = get();
    return notes.filter((note) => note.tags.includes(tag));
  },
  
  getLinkedNotes: (noteId) => {
    const { notes } = get();
    const note = notes.find((n) => n.id === noteId);
    if (!note) return [];
    
    return notes.filter((n) => 
      note.links.includes(n.id) || n.links.includes(noteId)
    );
  },
  
  syncNotes: async () => {
    // TODO: Implementar sincronização com localStorage/IndexedDB
  },
  
  exportNotes: async () => {
    const { notes, folders } = get();
    return JSON.stringify({ notes, folders });
  },
  
  importNotes: async (data) => {
    try {
      const { notes, folders } = JSON.parse(data);
      set({ notes, folders });
    } catch (error) {
      console.error('Failed to import notes:', error);
      throw error;
    }
  }
}));
