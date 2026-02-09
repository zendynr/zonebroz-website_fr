-- Test client for the client portal
-- Run this in Supabase SQL Editor after running schema.sql
-- Then open the client portal, enter the email below, and use "Send Magic Link"

INSERT INTO clients (name, contact, email, phone, size, industry, status)
VALUES (
  'Test Company (Demo)',
  'Jane Demo',
  'testclient@example.com',
  '+27 82 000 0000',
  '1-10',
  'Technology',
  'active'
)
ON CONFLICT (email) DO NOTHING;

-- Optional: add a test project for this client (only if none exists yet)
INSERT INTO projects (client_id, name, status, progress, deadline, budget, paid, assignee, service, priority, description, milestones)
SELECT c.id, 'Demo Website', 'in-progress', 25, (CURRENT_DATE + 30), 15000, 3750, 'Unassigned', 'Web Development', 'medium', 'Sample project for testing.', '[{"n":"Kickoff","s":"complete","d":"2026-01-01"},{"n":"Design","s":"in-progress","d":"2026-02-15"},{"n":"Launch","s":"pending","d":"2026-03-15"}]'::jsonb
FROM clients c
WHERE c.email = 'testclient@example.com'
  AND NOT EXISTS (SELECT 1 FROM projects p WHERE p.client_id = c.id AND p.name = 'Demo Website')
LIMIT 1;
