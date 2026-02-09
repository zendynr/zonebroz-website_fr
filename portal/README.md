# ZBS Portal

ZoneBroz Studios Admin Dashboard and Client Portal. Backend: **Supabase** (auth + database).

## Set up with Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com). In **Settings → API**, note your project URL and your **Publishable key** (recommended for client-side use with RLS) or legacy anon key.

2. **Environment**  
   In the project root, copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL` — your project URL (e.g. `https://xxxx.supabase.co`)
   - `VITE_SUPABASE_PUBLISHABLE_KEY` — your Publishable key (recommended), or `VITE_SUPABASE_ANON_KEY` — your anon key

3. **Database schema**  
   In the Supabase dashboard, open **SQL Editor** and run one of:
   - **`supabase/schema-all-features.sql`** — full schema: admins, clients, projects, payments, **files**, and **messaging** (conversations + messages), with RLS. Use this for all portal features (payments, files, messaging, projects).
   - **`supabase/schema.sql`** — minimal: admins, clients, projects, payments only.

4. **Auth settings**  
   In Supabase **Authentication → Providers**, enable **Email**. For magic-link (client portal), email confirmations can be disabled in **Auth → Email Templates** if you want instant links.

5. **First admin**  
   - Sign up once with your admin email (e.g. via the admin login screen or Supabase **Authentication → Users → Add user**).
   - In **SQL Editor**, run:  
     `INSERT INTO admins (email) VALUES ('your-admin@email.com') ON CONFLICT (email) DO NOTHING;`  
   Then sign in to the admin dashboard with that email and password.

**If you get "Failed to fetch" when signing in:** The app cannot reach Supabase. (1) Ensure `.env` is in the project root (next to `package.json`) with your real `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (or `VITE_SUPABASE_ANON_KEY`) from **Settings → API**. (2) Restart the dev server after changing `.env` (`Ctrl+C` then `npm run dev`). (3) In the Supabase dashboard, if the project is **paused** (free tier), click **Restore project**. (4) Open the browser DevTools (F12) → Network tab and retry sign-in to see the failing request and exact error.

6. **First client**  
   Add a client from the admin dashboard (Clients → Add Client) with name, contact, and **email**. Create a Supabase Auth user with that email (Authentication → Users → Add user) and set a password so the client can sign in to the portal with email and password.

7. **Test client (optional)**  
   Run **`supabase/seed-test-client.sql`** in the Supabase SQL Editor to create a test client (`testclient@example.com`) and one demo project. Create an Auth user for that email with a password, then sign in at the client portal with email and password.

8. **Profile pictures (avatar uploads)**  
   For uploads to work you must create the bucket and run the Storage policies:

   - **Create the bucket:** In Supabase go to **Storage** → **New bucket**. Name: **`avatars`**. Turn **Public** ON (so profile images can load). Save.
   - **Add policies:** In **SQL Editor**, run the “STORAGE: avatars bucket” block from **`supabase/sql-editor-commands.sql`** (the three `CREATE POLICY` statements on `storage.objects` for `avatars_authenticated_insert`, `avatars_authenticated_update`, and `avatars_select_public`). That allows authenticated users (admin and clients) to upload and update, and everyone to read.

   If you skip this, avatar upload will fail with an error; the app will show a message reminding you to create the bucket and run the policy SQL.

## Run locally

```bash
npm install
npm run dev
```

Then open:

- **Admin dashboard:** http://localhost:5173/
- **Client portal:** http://localhost:5173/client.html

*(If 5173 is in use, Vite will use the next port — check the terminal.)*

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

## Serving at zonebrozstudios.com/portal (single Netlify site)

The portal is built with `base: "/portal/"` so it can be served under **/portal** on your main site.

**1. Build the portal (this repo)**  
From this repo: `npm ci && npm run build`. Output is in `dist/` (index.html, client.html, assets/). All paths in the built files are under `/portal/`.

**2. In your main site repo (zonebrozstudios.com on Netlify)**  
- Add this portal as a **subfolder** (e.g. `portal/`) in the main site repo, or clone/copy it there.
- In your **build command**, after building the main site, build the portal and copy its output into your publish directory:
  - `cd portal && npm ci && npm run build`
  - Copy `portal/dist/*` into your main site’s publish directory under **portal/** (e.g. if publish is `public`, you want `public/portal/index.html`, `public/portal/client.html`, `public/portal/assets/...`).
- **Publish directory:** Your main site’s output (e.g. `public` or `dist`) so it contains the main site at root and `portal/` with the portal files.
- Optional: if Netlify returns 404 for paths under `/portal`, add a redirect so `/portal` and `/portal/*` fall back to `/portal/index.html` (e.g. in `_redirects` or `netlify.toml`).

**3. URLs**  
- Admin: **https://zonebrozstudios.com/portal/** (or `/portal/index.html`)  
- Client: **https://zonebrozstudios.com/portal/client.html**

## Project layout

- `zonebrozstudios-admin-dashboard.jsx` — Admin panel (Supabase auth + clients/projects)
- `zonebrozstudios-client-portal.jsx` — Client portal (Supabase magic link + projects)
- `src/supabase.js` — Supabase client
- `supabase/schema.sql` — Tables and RLS for Supabase
