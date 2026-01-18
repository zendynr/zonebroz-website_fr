-- ZoneBroz Portal Database Schema for Supabase
-- Run this in your Supabase SQL Editor: SQL Editor → New Query → Paste → Run

-- ============================================================================
-- ENABLE EXTENSIONS
-- ============================================================================

-- Enable UUID extension for generating IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CUSTOMERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Progress',
  scope_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INVOICES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  pdf_url TEXT,
  issued_at DATE NOT NULL,
  due_at DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- THREADS TABLE (Message Threads)
-- ============================================================================

CREATE TABLE IF NOT EXISTS threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('customer', 'admin')),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- REQUESTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('report', 'change', 'quote', 'quality')),
  category TEXT NOT NULL,
  details JSONB, -- Store flexible details (notes, complexity scores, etc.)
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Review', 'Done', 'Abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ADMIN NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kind TEXT NOT NULL CHECK (kind IN ('request', 'invoice', 'message', 'system')),
  title TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  related_id UUID, -- ID of related entity (request, invoice, thread, etc.)
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Customer lookups
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_threads_customer_id ON threads(customer_id);
CREATE INDEX IF NOT EXISTS idx_requests_customer_id ON requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_customer_id ON admin_notifications(customer_id);

-- Project lookups
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_threads_project_id ON threads(project_id);

-- Message lookups
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Status lookups
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Notification lookups
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_kind ON admin_notifications(kind);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CUSTOMER POLICIES (Customers can only see their own data)
-- ============================================================================

-- Customers table: Customers see only their own record
CREATE POLICY "Customers can view own profile"
  ON customers FOR SELECT
  USING (auth.uid()::text = (SELECT auth.uid() FROM auth.users WHERE email = customers.email LIMIT 1)::text);

-- Projects: Customers see only their own projects
CREATE POLICY "Customers can view own projects"
  ON projects FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Invoices: Customers see only their own invoices
CREATE POLICY "Customers can view own invoices"
  ON invoices FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Threads: Customers see only their own threads
CREATE POLICY "Customers can view own threads"
  ON threads FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Messages: Customers see messages in their own threads
CREATE POLICY "Customers can view own messages"
  ON messages FOR SELECT
  USING (
    thread_id IN (
      SELECT id FROM threads WHERE customer_id IN (
        SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

-- Requests: Customers see only their own requests
CREATE POLICY "Customers can view own requests"
  ON requests FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Customers can create their own requests
CREATE POLICY "Customers can create own requests"
  ON requests FOR INSERT
  WITH CHECK (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- ============================================================================
-- ADMIN POLICIES (Admins can see everything)
-- ============================================================================

-- Function to check if user is admin
-- Note: You'll need to implement admin role checking in your auth system
-- This is a placeholder - adjust based on your admin authentication setup

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  -- Check if user has admin role
  -- This depends on how you implement admin roles in Supabase Auth
  -- For now, we'll use a simple email check or role claim
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND (raw_user_meta_data->>'role' = 'admin' OR email LIKE '%@zonebroz.com')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Admins can view all customers
CREATE POLICY "Admins can view all customers"
  ON customers FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all projects
CREATE POLICY "Admins can view all projects"
  ON projects FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all invoices
CREATE POLICY "Admins can view all invoices"
  ON invoices FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all threads
CREATE POLICY "Admins can view all threads"
  ON threads FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
  ON messages FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all requests
CREATE POLICY "Admins can view all requests"
  ON requests FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can view all notifications
CREATE POLICY "Admins can view all notifications"
  ON admin_notifications FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_threads_updated_at BEFORE UPDATE ON threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON admin_notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA (Optional - for testing)
-- ============================================================================

-- You can insert test data here if needed
-- Or use the Supabase dashboard to insert data manually
