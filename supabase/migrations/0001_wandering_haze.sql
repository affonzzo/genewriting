/*
  # Initial Schema Setup

  1. New Tables
    - `beta_users`
      - `id` (uuid, primary key) - Matches auth.users id
      - `email` (text, unique)
      - `name` (text)
      - `status` (text) - beta, active, inactive
      - `created_at` (timestamp)
      - `last_login` (timestamp)
      - `settings` (jsonb) - User preferences and settings
    
  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
    - Policies for admin access
*/

-- Create beta_users table
CREATE TABLE IF NOT EXISTS beta_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  name text,
  status text DEFAULT 'beta' CHECK (status IN ('beta', 'active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  settings jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE beta_users ENABLE ROW LEVEL SECURITY;

-- Policies for beta_users
CREATE POLICY "Users can read own data"
  ON beta_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON beta_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO beta_users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();