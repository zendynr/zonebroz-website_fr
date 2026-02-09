-- =============================================================================
-- ZBS PORTAL – RUN THIS IN SUPABASE SQL EDITOR
-- =============================================================================
--
-- 1. Open your Supabase project → SQL Editor → New query
-- 2. Paste this entire file
-- 3. Click Run (or press Ctrl+Enter / Cmd+Enter)
--
-- This creates: admins, clients, projects, payments, files, conversations,
-- messages, and all RLS policies. Safe to run on a new project or when
-- tables already exist (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
--
-- After running, add your admin email (see bottom of file).
--
-- =============================================================================

-- ── TABLES ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  size TEXT,
  industry TEXT,
  status TEXT NOT NULL DEFAULT 'lead',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS avatar_url TEXT;

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INT NOT NULL DEFAULT 0,
  deadline DATE,
  budget NUMERIC DEFAULT 0,
  paid NUMERIC DEFAULT 0,
  assignee TEXT,
  service TEXT,
  priority TEXT DEFAULT 'medium',
  description TEXT,
  milestones JSONB DEFAULT '[]',
  developers JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
-- Required for "Current developers" on project page; if you get 400 when adding developers, run the line below:
ALTER TABLE projects ADD COLUMN IF NOT EXISTS developers JSONB DEFAULT '[]';

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  due_date DATE,
  method TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON payments(project_id);

CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'doc',
  size_text TEXT,
  uploaded_by TEXT,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_files_project_id ON files(project_id);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id)
);
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON conversations(client_id);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  text TEXT NOT NULL,
  is_from_client BOOLEAN NOT NULL DEFAULT false,
  file_id UUID REFERENCES files(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);

-- Add file_id to messages (required if table was created earlier without this column)
ALTER TABLE messages ADD COLUMN IF NOT EXISTS file_id UUID REFERENCES files(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_messages_file_id ON messages(file_id);

-- Developer profiles (admin-managed; assignable to projects)
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'Developer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE developers ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ── ENABLE RLS ─────────────────────────────────────────────────────────────

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;

-- ── POLICIES ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "admins_select_authenticated" ON admins;
CREATE POLICY "admins_select_authenticated"
  ON admins FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "clients_admin_all" ON clients;
CREATE POLICY "clients_admin_all"
  ON clients FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "clients_select_own" ON clients;
CREATE POLICY "clients_select_own"
  ON clients FOR SELECT TO authenticated
  USING (email = (auth.jwt()->>'email'));

DROP POLICY IF EXISTS "clients_update_own" ON clients;
CREATE POLICY "clients_update_own"
  ON clients FOR UPDATE TO authenticated
  USING (email = (auth.jwt()->>'email'))
  WITH CHECK (email = (auth.jwt()->>'email'));

DROP POLICY IF EXISTS "projects_admin_all" ON projects;
CREATE POLICY "projects_admin_all"
  ON projects FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "projects_select_own" ON projects;
CREATE POLICY "projects_select_own"
  ON projects FOR SELECT TO authenticated
  USING (client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "payments_admin_all" ON payments;
CREATE POLICY "payments_admin_all"
  ON payments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "payments_select_own" ON payments;
CREATE POLICY "payments_select_own"
  ON payments FOR SELECT TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id IN (
        SELECT id FROM clients WHERE email = (auth.jwt()->>'email')
      )
    )
  );

DROP POLICY IF EXISTS "files_admin_all" ON files;
CREATE POLICY "files_admin_all"
  ON files FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "files_select_own" ON files;
CREATE POLICY "files_select_own"
  ON files FOR SELECT TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id IN (
        SELECT id FROM clients WHERE email = (auth.jwt()->>'email')
      )
    )
  );

DROP POLICY IF EXISTS "files_client_insert" ON files;
CREATE POLICY "files_client_insert"
  ON files FOR INSERT TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE client_id IN (
        SELECT id FROM clients WHERE email = (auth.jwt()->>'email')
      )
    )
  );

DROP POLICY IF EXISTS "conversations_admin_all" ON conversations;
CREATE POLICY "conversations_admin_all"
  ON conversations FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "conversations_client_own" ON conversations;
CREATE POLICY "conversations_client_own"
  ON conversations FOR ALL TO authenticated
  USING (client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email')))
  WITH CHECK (client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "messages_admin_all" ON messages;
CREATE POLICY "messages_admin_all"
  ON messages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

DROP POLICY IF EXISTS "messages_client_own" ON messages;
CREATE POLICY "messages_client_own"
  ON messages FOR ALL TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM conversations
      WHERE client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email'))
    )
  )
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations
      WHERE client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email'))
    )
  );

DROP POLICY IF EXISTS "developers_admin_all" ON developers;
CREATE POLICY "developers_admin_all"
  ON developers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')))
  WITH CHECK (EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email')));

-- Clients can read developers (to show team on project)
DROP POLICY IF EXISTS "developers_select_authenticated" ON developers;
CREATE POLICY "developers_select_authenticated"
  ON developers FOR SELECT TO authenticated USING (true);

-- ── STORAGE: avatars bucket (for developer & client profile pictures) ──
-- Create the bucket (so profile picture uploads work). If this fails, create it in Dashboard: Storage → New bucket → name: avatars → Public: ON
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "avatars_authenticated_insert" ON storage.objects;
CREATE POLICY "avatars_authenticated_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "avatars_authenticated_update" ON storage.objects;
CREATE POLICY "avatars_authenticated_update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars')
  WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "avatars_select_public" ON storage.objects;
CREATE POLICY "avatars_select_public"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'avatars');

-- ── STORAGE: portal-files bucket (client/admin file uploads; admin download) ──
-- Create the bucket in Dashboard: Storage → New bucket → name: portal-files → Public: OFF
-- Then run the policies below so authenticated users (admin + clients) can upload and download.

DROP POLICY IF EXISTS "portal_files_authenticated_select" ON storage.objects;
CREATE POLICY "portal_files_authenticated_select"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'portal-files');

DROP POLICY IF EXISTS "portal_files_authenticated_insert" ON storage.objects;
CREATE POLICY "portal_files_authenticated_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portal-files');

DROP POLICY IF EXISTS "portal_files_authenticated_update" ON storage.objects;
CREATE POLICY "portal_files_authenticated_update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portal-files')
  WITH CHECK (bucket_id = 'portal-files');

-- ── ADD YOUR ADMIN EMAIL (run this after the above, replace with your email) ──
-- INSERT INTO admins (email) VALUES ('your-admin@example.com') ON CONFLICT (email) DO NOTHING;
