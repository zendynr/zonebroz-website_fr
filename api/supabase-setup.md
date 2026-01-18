# Supabase Setup Guide

This guide will help you set up Supabase for the Portal backend integration, step by step.

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project Name: `zonebroz-portal` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

3. Update `api/supabase-config.js`:
   ```javascript
   window.SUPABASE_CONFIG = {
     SUPABASE_URL: 'https://xxxxx.supabase.co', // Paste your Project URL
     SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Paste your anon key
   };
   ```

## Step 3: Set Up Database Schema

Run the SQL commands in `api/supabase-schema.sql` in your Supabase SQL Editor.

Go to **SQL Editor** → **New Query** → Paste SQL → **Run**

## Step 4: Set Up Row Level Security (RLS)

RLS policies are included in the schema SQL. After running the schema:

1. Go to **Authentication** → **Policies**
2. Verify policies are created for each table
3. Test policies work correctly

## Step 5: Set Up Authentication

Supabase Auth is built-in. We'll use:
- Email/Password authentication
- JWT tokens for session management

## Step 6: Test Connection

Open the portal in your browser and check the console:
- Should see "Supabase client initialized"
- No errors about missing configuration

## Next Steps

After setup is complete:
1. ✅ Configure Supabase credentials
2. ✅ Create database schema
3. ✅ Set up authentication
4. ✅ Migrate PortalStore to use Supabase
5. ✅ Test all CRUD operations

## Troubleshooting

### "Supabase configuration not set"
- Make sure you've updated `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `api/supabase-config.js`

### "Supabase JS SDK not loaded"
- Check that the Supabase script tag is in `portal.html`
- Verify CDN is accessible

### Authentication errors
- Check that email confirmation is configured in Supabase Auth settings
- Verify RLS policies allow authenticated users to read/write data
