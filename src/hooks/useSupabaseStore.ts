import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type SupabaseFile = Database['public']['Tables']['files']['Row'];

export function useSupabaseStore() {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar arquivos do usuário
  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: files, error: filesError } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('path');

      if (filesError) throw filesError;

      // Converter arquivos do Supabase para o formato do store
      const folders: Record<string, any> = {};
      const documents: Record<string, any> = {};

      files.forEach(file => {
        if (file.is_folder) {
          folders[file.id] = {
            id: file.id,
            name: file.name,
            path: file.path,
            parentId: file.parent_id,
            createdAt: file.created_at
          };
        } else {
          documents[file.id] = {
            id: file.id,
            name: file.name,
            path: file.path,
            content: file.content,
            parentId: file.parent_id,
            createdAt: file.created_at,
            updatedAt: file.updated_at
          };
        }
      });

      // Atualizar o store
      store.setFiles(documents);
      store.setFolders(folders);

    } catch (err) {
      console.error('Error loading files:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar arquivo no Supabase
  const createFile = useCallback(async (
    name: string,
    content: string,
    parentId: string | null,
    isFolder: boolean = false
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Construir o path
      let path = name;
      if (parentId) {
        const { data: parent } = await supabase
          .from('files')
          .select('path')
          .eq('id', parentId)
          .single();
        if (parent) {
          path = `${parent.path}/${name}`;
        }
      }

      const { data, error } = await supabase
        .from('files')
        .insert({
          name,
          content: isFolder ? null : content,
          path,
          parent_id: parentId,
          user_id: user.id,
          is_folder: isFolder
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned');

      // Atualizar o store local
      if (isFolder) {
        store.setFolders({
          ...store.folders,
          [data.id]: {
            id: data.id,
            name: data.name,
            path: data.path,
            parentId: data.parent_id,
            createdAt: data.created_at
          }
        });
      } else {
        store.setFiles({
          ...store.files,
          [data.id]: {
            id: data.id,
            name: data.name,
            path: data.path,
            content: data.content,
            parentId: data.parent_id,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          }
        });
      }

      return data;
    } catch (err) {
      console.error('Error creating file:', err);
      throw err;
    }
  }, []);

  // Atualizar arquivo no Supabase
  const updateFile = useCallback(async (
    id: string,
    updates: Partial<Database['public']['Tables']['files']['Update']>
  ) => {
    try {
      const { data, error } = await supabase
        .from('files')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned');

      // Atualizar o store local
      if (data.is_folder) {
        store.setFolders({
          ...store.folders,
          [data.id]: {
            id: data.id,
            name: data.name,
            path: data.path,
            parentId: data.parent_id,
            createdAt: data.created_at
          }
        });
      } else {
        store.setFiles({
          ...store.files,
          [data.id]: {
            id: data.id,
            name: data.name,
            path: data.path,
            content: data.content,
            parentId: data.parent_id,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          }
        });
      }

      return data;
    } catch (err) {
      console.error('Error updating file:', err);
      throw err;
    }
  }, []);

  // Deletar arquivo no Supabase
  const deleteFile = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Atualizar o store local
      if (store.folders[id]) {
        const { [id]: _, ...remainingFolders } = store.folders;
        store.setFolders(remainingFolders);
      } else {
        const { [id]: _, ...remainingFiles } = store.files;
        store.setFiles(remainingFiles);
      }
    } catch (err) {
      console.error('Error deleting file:', err);
      throw err;
    }
  }, []);

  // Carregar arquivos quando o usuário mudar
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        loadFiles();
      } else if (event === 'SIGNED_OUT') {
        store.setFiles({});
        store.setFolders({});
      }
    });

    // Carregar arquivos inicialmente
    loadFiles();

    return () => subscription.unsubscribe();
  }, [loadFiles]);

  return {
    isLoading,
    error,
    createFile,
    updateFile,
    deleteFile,
    loadFiles
  };
}
