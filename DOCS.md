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
   - For **persistent data**, connect Upstash Redis — see
     [Data persistence](#-data-persistence--enable-free-redis-recommended) below
     (it sets `KV_REST_API_URL` / `KV_REST_API_TOKEN` for you).
   - For **auto-WhatsApp**, add `WHATSAPP_API_URL` + `WHATSAPP_TOKEN`.
   - Set them under **Project → Settings → Environment Variables** for the
     **Production** (and optionally Preview) environment, then redeploy.

4. **Deploy** — click **Deploy**. Your site goes live at
   `https://<project>.vercel.app`. The dashboards are at `/staff`.

### Where do env vars go?

| Environment | Where to put them |
|-------------|-------------------|
| **Local dev** | a file named **`.env.local`** in the project root (copy from `.env.example`). Never commit it — it's git-ignored. |
| **Vercel (production)** | **Vercel Dashboard → Settings → Environment Variables** — *not* in a committed file. |

> `.env.example` is committed as a template. `.env` / `.env.local` are ignored by
> git (see `.gitignore`) so secrets never reach GitHub.

---

## 💾 Data persistence — enable free Redis (recommended)

The app has **two storage modes**, chosen automatically:

| Mode | When | Behaviour |
|------|------|-----------|
| **Local file** | dev, no Redis env vars | Saves to `.data/db.json` |
| **In-memory** | Vercel, no Redis env vars | Works, but **resets on cold starts** (Vercel's FS is read-only) |
| **Redis (durable)** | Redis env vars present | ✅ Persists everywhere, shared across all instances |

For a real deployment, connect **Upstash for Redis** — it has a **free tier**
(~10k commands/day, 256 MB) and integrates natively with Vercel.

### Enable it (free, ~2 minutes)

1. In your Vercel project, go to the **Storage** tab → **Create Database** →
   **Upstash for Redis** (in the Marketplace) → pick the **Free** plan.
   *(Or create one at [upstash.com](https://upstash.com) and copy its REST URL + token.)*
2. **Connect it to the project.** Vercel automatically injects the
   `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables.
3. **Redeploy.** That's it — the app detects the vars and switches to Redis. All
   orders, reservations, tables and feedback now persist durably.

> No code changes needed. The switch is handled in [`lib/db.ts`](lib/db.ts),
> which reads either `KV_REST_API_*` (Vercel) or `UPSTASH_REDIS_REST_*` (Upstash
> direct). To test durability locally, put the same vars in `.env.local`.

---

## 🧰 Quick reference

| | |
|---|---|
| Website | `/` |
| Menu / Order / Feedback | `/menu` · `/order` · `/feedback` |
| Staff login | `/staff/login` |
| Manager / Waiter / Chef | `/staff/manager` · `/staff/waiter` · `/staff/chef` |
| Demo PINs | `1111` · `2222` · `3333` |
| Edit PINs | `lib/auth.ts` |
| Edit content/menu | `lib/site.ts` · `lib/menu.ts` |
| Env template | `.env.example` |
