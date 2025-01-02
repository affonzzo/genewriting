import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase/client';
import { Document } from '../types';
import debounce from 'lodash/debounce';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setDocuments(data.map(doc => ({
        ...doc,
        createdAt: new Date(doc.created_at),
        updatedAt: new Date(doc.updated_at)
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const saveDocument = async (title: string, content: string): Promise<Document | null> => {
    clearError();
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{ title, content }])
        .select()
        .single();

      if (error) throw error;

      const newDoc: Document = {
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setDocuments(prev => [newDoc, ...prev]);
      return newDoc;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save document');
      return null;
    }
  };

  const updateDocument = debounce(async (id: string, updates: Partial<Document>): Promise<boolean> => {
    clearError();
    try {
      // Optimistic update
      setDocuments(prev => prev.map(doc => 
        doc.id === id 
          ? { ...doc, ...updates, updatedAt: new Date() }
          : doc
      ));

      const { error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id);

      if (error) {
        // Rollback on error
        await fetchDocuments();
        throw error;
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      return false;
    }
  }, 500);

  const deleteDocument = async (id: string): Promise<boolean> => {
    clearError();
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      return false;
    }
  };

  return {
    documents,
    loading,
    error,
    clearError,
    refreshDocuments: fetchDocuments,
    saveDocument,
    updateDocument,
    deleteDocument
  };
}