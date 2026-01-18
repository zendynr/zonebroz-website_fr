-- Add new fields to projects table for enhanced project onboarding
-- Run this in your Supabase SQL Editor: SQL Editor → New Query → Paste → Run

-- Add due_date for project timeline and milestones
ALTER TABLE projects ADD COLUMN IF NOT EXISTS due_date DATE;

-- Add scope_and_delivery_rules (separate from scope_summary)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS scope_and_delivery_rules TEXT;

-- Add team_members (stored as JSONB array for flexibility)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS team_members JSONB DEFAULT '[]'::jsonb;

-- Add notes_next_steps
ALTER TABLE projects ADD COLUMN IF NOT EXISTS notes_next_steps TEXT;

-- Add index on due_date for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_due_date ON projects(due_date) WHERE due_date IS NOT NULL;
