import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { Document } from '../types';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
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
    };

    fetchDocuments();
  }, []);

  // Save document
  const saveDocument = async (title: string, content: string): Promise<Document | null> => {
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

  // Update document
  const updateDocument = async (id: string, updates: Partial<Document>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.map(doc => 
        doc.id === id 
          ? { ...doc, ...updates, updatedAt: new Date() }
          : doc
      ));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      return false;
    }
  };

  // Delete document
  const deleteDocument = async (id: string): Promise<boolean> => {
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
    saveDocument,
    updateDocument,
    deleteDocument
  };
}