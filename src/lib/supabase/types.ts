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
      beta_users: {
        Row: {
          id: string
          email: string
          name: string | null
          status: 'beta' | 'active' | 'inactive'
          created_at: string
          last_login: string | null
          settings: Json
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          status?: 'beta' | 'active' | 'inactive'
          created_at?: string
          last_login?: string | null
          settings?: Json
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          status?: 'beta' | 'active' | 'inactive'
          created_at?: string
          last_login?: string | null
          settings?: Json
        }
      }
    }
  }
}