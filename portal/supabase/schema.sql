-- ZBS Portal – Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Admins: list of emails that can access the admin dashboard (must sign in via Auth first)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients (customers)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  size TEXT,
  industry TEXT,
  status TEXT NOT NULL DEFAULT 'lead',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);

-- Payments / Invoices (linked to project)
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

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Admins: any authenticated user can read (to check if current user is admin)
CREATE POLICY "admins_select_authenticated"
  ON admins FOR SELECT
  TO authenticated
  USING (true);

-- Clients: admin (email in admins) can do everything
CREATE POLICY "clients_admin_all"
  ON clients FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  );

-- Clients: client can read own row only (by email)
CREATE POLICY "clients_select_own"
  ON clients FOR SELECT
  TO authenticated
  USING (email = (auth.jwt()->>'email'));

-- Projects: admin can do everything
CREATE POLICY "projects_admin_all"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  );

-- Projects: client can read projects for their client row
CREATE POLICY "projects_select_own"
  ON projects FOR SELECT
  TO authenticated
  USING (
    client_id IN (SELECT id FROM clients WHERE email = (auth.jwt()->>'email'))
  );

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Payments: admin full access
CREATE POLICY "payments_admin_all"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admins a WHERE a.email = (auth.jwt()->>'email'))
  );

-- Payments: client can read payments for their projects
CREATE POLICY "payments_select_own"
  ON payments FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id IN (
        SELECT id FROM clients WHERE email = (auth.jwt()->>'email')
      )
    )
  );

-- Seed one admin (replace with your email; you must sign up in Auth first or invite user)
-- INSERT INTO admins (email) VALUES ('admin@zonebrozstudios.com') ON CONFLICT (email) DO NOTHING;
