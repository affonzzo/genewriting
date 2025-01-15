import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface File {
  id: string;
  path: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
}

interface Folder {
  id: string;
  name: string;
  path: string;
  parentId: string | null;
  createdAt: string;
}

interface Store {
  currentFile: File | null;
  files: Record<string, File>;
  folders: Record<string, Folder>;
  currentFolderId: string | null;
  
  // File operations
  createFile: (parentId: string | null) => File;
  setCurrentFile: (file: File | null) => void;
  updateFileContent: (fileId: string, content: string) => void;
  saveFile: (file: File) => void;
  renameFile: (fileId: string, newName: string) => void;
  deleteFile: (fileId: string) => void;
  duplicateFile: (fileId: string) => void;
  
  // Folder operations
  setCurrentFolder: (folderId: string | null) => void;
  createFolder: (name: string, parentId: string | null) => void;
  renameFolder: (folderId: string, newName: string) => void;
  deleteFolder: (folderId: string) => void;

  // Store operations
  setFiles: (files: Record<string, File>) => void;
  setFolders: (folders: Record<string, Folder>) => void;
  reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);
const getCurrentDateTime = () => new Date().toISOString();

const initialState = {
  currentFile: null,
  files: {},
  folders: {},
  currentFolderId: null
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,

      createFile: (parentId) => {
        const id = generateId();
        const now = getCurrentDateTime();
        const untitledCount = Object.values(get().files).filter(f => f.name.startsWith('Sem título')).length;
        const name = untitledCount === 0 ? 'Sem título' : `Sem título ${untitledCount + 1}`;
        const path = parentId ? `${get().folders[parentId].path}/${name}` : name;
        
        const newFile: File = {
          id,
          path,
          name,
          content: '',
          createdAt: now,
          updatedAt: now,
          parentId
        };
        
        set(state => ({
          files: { ...state.files, [id]: newFile },
          currentFile: newFile
        }));
        
        return newFile;
      },

      setCurrentFile: (file) => set({ currentFile: file }),

      updateFileContent: (fileId, content) => {
        const now = getCurrentDateTime();
        set(state => ({
          files: {
            ...state.files,
            [fileId]: {
              ...state.files[fileId],
              content,
              updatedAt: now
            }
          },
          currentFile: state.currentFile?.id === fileId
            ? { ...state.currentFile, content, updatedAt: now }
            : state.currentFile
        }));
      },

      saveFile: (file) => set(state => ({
        files: { ...state.files, [file.id]: file }
      })),

      renameFile: (fileId, newName) => {
        const file = get().files[fileId];
        if (!file) return;

        const parentPath = file.parentId ? get().folders[file.parentId].path : '';
        const newPath = parentPath ? `${parentPath}/${newName}` : newName;

        set(state => ({
          files: {
            ...state.files,
            [fileId]: {
              ...file,
              name: newName,
              path: newPath,
              updatedAt: getCurrentDateTime()
            }
          }
        }));
      },

      deleteFile: (fileId) => set(state => {
        const { [fileId]: _, ...remainingFiles } = state.files;
        return {
          files: remainingFiles,
          currentFile: state.currentFile?.id === fileId ? null : state.currentFile
        };
      }),

      duplicateFile: (fileId) => {
        const file = get().files[fileId];
        if (!file) return;

        const id = generateId();
        const now = getCurrentDateTime();
        const baseName = file.name.replace(/ \(\d+\)$/, '');
        const duplicates = Object.values(get().files)
          .filter(f => f.name.startsWith(baseName) && f.parentId === file.parentId)
          .length;
        
        const newName = duplicates === 1 
          ? `${baseName} (2)` 
          : `${baseName} (${duplicates + 1})`;
        
        const newPath = file.parentId 
          ? `${get().folders[file.parentId].path}/${newName}` 
          : newName;

        const newFile: File = {
          ...file,
          id,
          name: newName,
          path: newPath,
          createdAt: now,
          updatedAt: now
        };

        set(state => ({
          files: { ...state.files, [id]: newFile },
          currentFile: newFile
        }));
      },

      setCurrentFolder: (folderId) => set({ currentFolderId: folderId }),

      createFolder: (name, parentId) => {
        const id = generateId();
        const parentFolder = parentId ? get().folders[parentId] : null;
        const path = parentFolder ? `${parentFolder.path}/${name}` : name;

        set(state => ({
          folders: {
            ...state.folders,
            [id]: {
              id,
              name,
              path,
              parentId,
              createdAt: getCurrentDateTime()
            }
          }
        }));
      },

      renameFolder: (folderId, newName) => {
        const folder = get().folders[folderId];
        if (!folder) return;

        const parentPath = folder.parentId ? get().folders[folder.parentId].path : '';
        const newPath = parentPath ? `${parentPath}/${newName}` : newName;
        const oldPath = folder.path;

        // Update folder and all its children (files and folders)
        set(state => {
          const updatedFolders = { ...state.folders };
          const updatedFiles = { ...state.files };

          // Update the folder itself
          updatedFolders[folderId] = {
            ...folder,
            name: newName,
            path: newPath
          };

          // Update all child folders
          Object.values(state.folders).forEach(childFolder => {
            if (childFolder.path.startsWith(oldPath + '/')) {
              const relativePath = childFolder.path.slice(oldPath.length);
              updatedFolders[childFolder.id] = {
                ...childFolder,
                path: newPath + relativePath
              };
            }
          });

          // Update all child files
          Object.values(state.files).forEach(file => {
            if (file.path.startsWith(oldPath + '/')) {
              const relativePath = file.path.slice(oldPath.length);
              updatedFiles[file.id] = {
                ...file,
                path: newPath + relativePath
              };
            }
          });

          return {
            folders: updatedFolders,
            files: updatedFiles
          };
        });
      },

      deleteFolder: (folderId) => {
        const folder = get().folders[folderId];
        if (!folder) return;

        set(state => {
          const updatedFolders = { ...state.folders };
          const updatedFiles = { ...state.files };
          const folderPath = folder.path;

          // Remove the folder and all its children
          delete updatedFolders[folderId];
          Object.entries(state.folders).forEach(([id, f]) => {
            if (f.path.startsWith(folderPath + '/')) {
              delete updatedFolders[id];
            }
          });

          // Remove all files in the folder and its subfolders
          Object.entries(state.files).forEach(([id, f]) => {
            if (f.path.startsWith(folderPath + '/')) {
              delete updatedFiles[id];
            }
          });

          return {
            folders: updatedFolders,
            files: updatedFiles,
            currentFile: state.currentFile?.path.startsWith(folderPath + '/') 
              ? null 
              : state.currentFile,
            currentFolderId: state.currentFolderId === folderId 
              ? null 
              : state.currentFolderId
          };
        });
      },

      setFiles: (files) => set({ files }),
      setFolders: (folders) => set({ folders }),
      reset: () => set(initialState)
    }),
    {
      name: 'genewriting-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
