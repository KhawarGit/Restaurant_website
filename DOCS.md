# 📖 KK Grove — Usage & Deployment Guide

A short guide to (1) opening the staff dashboards and (2) deploying to Vercel.

---

## 1. Accessing the dashboards

All staff dashboards live under **`/staff`** and are protected by a PIN login.

### Steps

1. Start the app (`npm run dev`) and go to **`http://localhost:3000/staff`**
   — you'll be redirected to the login screen (`/staff/login`).
2. Enter a **4-digit PIN** (or tap a quick-access button in the demo panel).
3. You'll land on the dashboard for that role.

### Roles, PINs & URLs

| Role | PIN | Direct URL | What you can do |
|------|:---:|------------|-----------------|
| 👔 **Manager** | `1111` | `/staff/manager` | See revenue/KPIs, reservations, live orders, notifications (WhatsApp links), floor status, feedback |
| 🧑‍🍳 **Waiter** | `2222` | `/staff/waiter` | View the floor map, take dine-in/takeaway/delivery orders, mark served, take payment |
| 🔥 **Chef** | `3333` | `/staff/chef` | Kitchen Display — move tickets *New → Preparing → Ready* |

> Typing a direct URL (e.g. `/staff/manager`) while signed out redirects you to
> the login. Signing in as one role and opening another role's page redirects
> you to your own dashboard (the Manager can view all three).

### See it working end-to-end (live demo loop)

1. Open **`/staff/manager`** in one browser tab (PIN `1111`).
2. In another tab, place an order from **`/order`** — choose delivery, add items, place it.
3. Watch the order appear in the Manager's **Live Orders** and a new **Notification** pop in (dashboards auto-refresh every few seconds).
4. Open **`/staff/chef`** (PIN `3333`) and advance the ticket through the kitchen.
5. Make a booking on the home page (`/#reserve`) → it shows up under **Reservations** with a smart-assigned table and a WhatsApp link.

### Signing out / changing PINs

- **Sign out:** the button in the top-right of any dashboard.
- **Change the PINs:** edit `PINS` in [`lib/auth.ts`](lib/auth.ts).

---

## 2. Deploying to Vercel

This is a standard Next.js 14 app — Vercel needs **zero build configuration**.

### Step-by-step

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "KK Grove"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kk-grove.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to **https://vercel.com/new** and pick your GitHub repo.
   - Framework preset is auto-detected as **Next.js**.
   - Build command `next build` and output are set automatically — **leave defaults**.

3. **Add environment variables** *(all optional — the app runs without them)*
   - For **persistent data**, connect Supabase — see
     [Data persistence](#-data-persistence--connect-supabase-recommended) below.
   - For **auto-WhatsApp**, add `WHATSAPP_API_URL` + `WHATSAPP_TOKEN`.
   - Set them under **Project → Settings → Environment Variables** for the
     **Production** (and optionally Preview) environment, then redeploy.

4. **Deploy** — click **Deploy**. Your site goes live at
   `https://<project>.vercel.app`. The dashboards are at `/staff`.

### Where do env vars go? {#where-do-env-vars-go}

| Environment | Where to put them |
|-------------|-------------------|
| **Local dev** | Create a file named **`.env.local`** in the project root (same folder as `package.json`) — copy the keys you need from [`.env.example`](.env.example). Never commit it — it's git-ignored. |
| **Vercel (production)** | **Vercel Dashboard → your project → Settings → Environment Variables** — add each key/value there, *not* in a committed file. |

> `.env.example` is committed as a template (no real secrets). `.env` / `.env.local`
> are ignored by git (see `.gitignore`) so your Supabase key never reaches GitHub.

---

## 💾 Data persistence — connect Supabase (recommended)

The app auto-selects storage, in this priority order:

| Priority | Backend | When | Behaviour |
|:---:|---------|------|-----------|
| 1 | **Supabase (Postgres)** | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set | ✅ Durable, real database, shared across all instances |
| 2 | **Redis** (Upstash/Vercel KV) | Redis env vars set, no Supabase | ✅ Durable, shared across all instances |
| 3 | **Local file** | dev, nothing configured | Saves to `.data/db.json` |
| 4 | **In-memory** | Vercel, nothing configured | Works, but **resets on cold starts** (Vercel's FS is read-only) |

You only need to configure **one** of these — Supabase is recommended since it's
a real free-tier Postgres database.

### Enable Supabase (free, ~3 minutes)

1. **Create a project** at [supabase.com](https://supabase.com) (free tier).
2. **Run the schema**: open your project's **SQL Editor**, paste the contents
   of [`supabase/schema.sql`](supabase/schema.sql) from this repo, and click **Run**.
   This creates one table (`kk_store`) that the app reads/writes from.
3. **Copy your keys**: in your Supabase project, go to
   **Settings → API** and copy:
   - **Project URL** → this is `SUPABASE_URL`
   - **`service_role` secret** (not the `anon`/`public` key!) → this is `SUPABASE_SERVICE_ROLE_KEY`
4. **Add them as env vars** — see [where to add env vars](#where-do-env-vars-go)
   below. Locally: paste into `.env.local`. On Vercel: **Project → Settings →
   Environment Variables**.
5. **Redeploy** (or restart `npm run dev` locally). The app detects the vars
   and switches to Supabase automatically — no code changes needed.

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security and has full
> read/write access to your project. Keep it a **server-only** env var (never
> prefix it `NEXT_PUBLIC_`, never commit it) — the app only uses it inside
> API route handlers, which run server-side.

### Alternative: Redis

If you'd rather use Upstash/Vercel KV instead, see the `KV_REST_API_URL` /
`KV_REST_API_TOKEN` section in [`.env.example`](.env.example) — same idea,
just skip step with Supabase vars and Redis becomes priority #1 automatically.

---

## 🧰 Quick reference

| | |
|---|---|
| Website | `/` |
| Menu / Order / Feedback | `/menu` · `/order` · `/feedback` |
| Portfolios | `/portfolios` (Modern, Minimal, Fancy, Bold) |
| Staff login | `/staff/login` |
| Manager / Waiter / Chef | `/staff/manager` · `/staff/waiter` · `/staff/chef` |
| Demo PINs | `1111` · `2222` · `3333` |
| Edit PINs | `lib/auth.ts` |
| Edit content/menu | `lib/site.ts` · `lib/menu.ts` |
| Supabase schema | `supabase/schema.sql` |
| Env template (local: copy to `.env.local`) | `.env.example` |
