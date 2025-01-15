export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      files: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          content: string
          path: string
          parent_id: string | null
          user_id: string
          is_folder: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          content?: string
          path: string
          parent_id?: string | null
          user_id: string
          is_folder?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          content?: string
          path?: string
          parent_id?: string | null
          user_id?: string
          is_folder?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string | null
          avatar_url: string | null
          website: string | null
          root_folder_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          root_folder_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          root_folder_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
