import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../store';
import { useSupabaseStore } from './useSupabaseStore';

export function useEditor() {
  const store = useStore();
  const supabaseStore = useSupabaseStore();
  const [text, setText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Carregar o conteúdo do arquivo atual quando mudar
  useEffect(() => {
    if (store.currentFile) {
      setText(store.currentFile.content);
    } else {
      setText('');
    }
  }, [store.currentFile]);

  // Salvar o conteúdo quando o texto mudar
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    const saveContent = async () => {
      if (isSaving) return;

      try {
        setIsSaving(true);

        if (text.trim() !== '') {
          if (!store.currentFile) {
            // Criar novo arquivo
            const file = await supabaseStore.createFile(
              'Sem título',
              text,
              store.currentFolderId
            );
            store.setCurrentFile({
              id: file.id,
              name: file.name,
              path: file.path,
              content: file.content || '',
              parentId: file.parent_id,
              createdAt: file.created_at,
              updatedAt: file.updated_at
            });
          } else {
            // Atualizar arquivo existente
            await supabaseStore.updateFile(store.currentFile.id, {
              content: text,
              updated_at: new Date().toISOString()
            });
          }
        }
      } catch (error) {
        console.error('Error saving content:', error);
      } finally {
        setIsSaving(false);
      }
    };

    const timeoutId = setTimeout(saveContent, 1000);
    return () => clearTimeout(timeoutId);
  }, [text, store.currentFile, store.currentFolderId, isInitialized, isSaving]);

  // Funções de gerenciamento de arquivos
  const handleNewFile = useCallback(async () => {
    try {
      const file = await supabaseStore.createFile(
        'Sem título',
        '',
        store.currentFolderId
      );
      store.setCurrentFile({
        id: file.id,
        name: file.name,
        path: file.path,
        content: file.content || '',
        parentId: file.parent_id,
        createdAt: file.created_at,
        updatedAt: file.updated_at
      });
      setText('');
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }, [store.currentFolderId]);

  const handleSaveFile = useCallback(async (name?: string) => {
    try {
      if (!store.currentFile) {
        const file = await supabaseStore.createFile(
          name || 'Sem título',
          text,
          store.currentFolderId
        );
        store.setCurrentFile({
          id: file.id,
          name: file.name,
          path: file.path,
          content: file.content || '',
          parentId: file.parent_id,
          createdAt: file.created_at,
          updatedAt: file.updated_at
        });
      } else {
        await supabaseStore.updateFile(store.currentFile.id, {
          content: text,
          name: name || store.currentFile.name,
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }, [store.currentFile, store.currentFolderId, text]);

  const handleSaveFileAs = useCallback(async (name: string) => {
    await handleSaveFile(name);
  }, [handleSaveFile]);

  const handleDuplicateFile = useCallback(async () => {
    if (!store.currentFile) return;

    try {
      const file = await supabaseStore.createFile(
        `${store.currentFile.name} (cópia)`,
        store.currentFile.content,
        store.currentFile.parentId
      );
      store.setCurrentFile({
        id: file.id,
        name: file.name,
        path: file.path,
        content: file.content || '',
        parentId: file.parent_id,
        createdAt: file.created_at,
        updatedAt: file.updated_at
      });
    } catch (error) {
      console.error('Error duplicating file:', error);
    }
  }, [store.currentFile]);

  const handleDeleteFile = useCallback(async () => {
    if (!store.currentFile) return;

    try {
      await supabaseStore.deleteFile(store.currentFile.id);
      store.setCurrentFile(null);
      setText('');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }, [store.currentFile]);

  const handleRenameFile = useCallback(async (newName: string) => {
    try {
      if (!store.currentFile) {
        await handleSaveFile(newName);
      } else {
        await supabaseStore.updateFile(store.currentFile.id, {
          name: newName,
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  }, [store.currentFile, handleSaveFile]);

  return {
    text,
    setText,
    currentFile: store.currentFile,
    currentFolderId: store.currentFolderId,
    isLoading: supabaseStore.isLoading,
    error: supabaseStore.error,
    handleNewFile,
    handleSaveFile,
    handleSaveFileAs,
    handleDuplicateFile,
    handleDeleteFile,
    handleRenameFile
  };
}
