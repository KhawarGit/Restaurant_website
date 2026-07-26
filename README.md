<div align="center">

# 🌴 KK Grove

### Tropical-luxury restaurant website **+** full restaurant operations system

A production-style Next.js app that pairs a polished public dining website with a
complete back-office: **smart reservations, online ordering, payments, feedback,
and live manager / waiter / chef dashboards.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

> [!NOTE]
> **KK Grove is a fictional brand** built for a personal/portfolio project. It is
> loosely modelled on a Karachi fine-dining venue. All imagery uses free Unsplash
> placeholders and the phone number is a demo value.

---

## ✨ Highlights

- 🎨 **Design-led marketing site** — animated hero, photo-spotlight interactive menu, gallery, testimonials, and a Google-Maps location.
- 🧠 **Smart table allocation** — a rules engine assigns the best-fit table by party size, seating preference, and availability (with graceful waitlisting).
- 🛎️ **Omnichannel ordering** — dine-in, takeaway & delivery in a single cart flow with tax and **online or cash payment**.
- 📊 **Role-based staff console** — live, auto-refreshing dashboards for **Manager**, **Waiter**, and **Chef** (Kitchen Display System).
- 💬 **WhatsApp notifications** — every reservation, order, and low rating generates a ready-to-send `wa.me` deep-link for the manager.
- ⭐ **Customer satisfaction loop** — multi-criteria feedback with automatic manager alerts on low scores.
- 💾 **Zero-config data layer** — a file-backed store seeds itself; swap for a real DB without changing the API contracts.

---

## 🗺️ Table of Contents

- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Staff Console Access](#-staff-console-access)
- [Feature Tour](#-feature-tour)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧰 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 14** (App Router, Route Handlers) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** + custom design tokens |
| Fonts | Playfair Display + Inter (`next/font`) |
| State | React hooks (`useCart`, `usePoll` polling) |
| Persistence | Upstash/Vercel KV Redis when configured, else local JSON file / in-memory |
| Auth | Role-based PIN + HTTP-only cookie |

No external UI or database dependencies — everything runs with a single `npm install`.

---

## 🚀 Quick Start

**Prerequisites:** Node.js 18.17+ (Node 20/22 recommended).

```bash
# 1. Clone
git clone https://github.com/<your-username>/kk-grove.git
cd kk-grove

# 2. Install
npm install

# 3. Run the dev server
npm run dev
```

Open **http://localhost:3000** for the website, and **http://localhost:3000/staff**
for the operations console.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint the project |

---

## 🔐 Staff Console Access

Visit `/staff`, then sign in with a demo PIN:

| Role | PIN | Dashboard |
|------|:---:|-----------|
| 👔 **Manager** | `1111` | Revenue & KPIs, reservations, live orders, notification feed (with WhatsApp links), floor status, feedback & satisfaction score |
| 🧑‍🍳 **Waiter** | `2222` | Floor map, order-taking (dine-in/takeaway/delivery), active-order actions, take payment |
| 🔥 **Chef** | `3333` | Kitchen Display System — *New → Preparing → Ready* columns with late-ticket alerts |

> 💡 **Try the live loop:** open the Manager dashboard in one tab, place an order
> from `/order` in another, and watch it appear in real time — then advance it
> through the kitchen from the Chef view.

---

## 🧭 Feature Tour

### Public website
- **Home / About / Menu / Contact** — responsive, animated, SEO-ready.
- **Menu** (`/menu`) — sticky scroll-spy category nav, photo spotlights, dietary filters, and chef's-pick highlighting.
- **Reservations** — booking form that returns a smart-assigned table (or waitlist) plus a WhatsApp confirmation link.
- **Order Online** (`/order`) — dine-in / takeaway / delivery, live cart with 13% tax, cash or online payment.
- **Feedback** (`/feedback`) — star ratings for food, service & ambiance.

### Smart table allocation
`lib/allocate.ts` is a deterministic rules engine that:
1. filters to tables that seat the whole party (best-fit, least wasted seats),
2. honours the guest's indoor/garden preference when possible,
3. skips tables already booked within a 90-minute turn window, and
4. waitlists gracefully when nothing fits.

### WhatsApp notifications
Each event builds a prefilled `wa.me` deep-link and a manager notification.
For fully-automatic delivery, set `WHATSAPP_API_URL` + `WHATSAPP_TOKEN`
(WhatsApp Cloud API / Twilio) — see `lib/notify.ts`.

---

## 📂 Project Structure

```
app/
├── page.tsx              # Home
├── about/ menu/ contact/ # Marketing pages
├── order/ feedback/      # Online ordering & satisfaction
├── staff/                # login, manager, waiter, chef (with role guards)
└── api/                  # Route handlers (see API reference)
components/
├── sections/             # Marketing sections (Hero, About, Menu, …)
├── staff/                # StaffShell + Manager/Waiter/Chef dashboards
└── order/                # OrderExperience
lib/
├── site.ts menu.ts       # Content & config
├── types.ts db.ts        # Domain types + file-backed store
├── allocate.ts notify.ts # Smart seating + WhatsApp
├── auth.ts               # Role/PIN auth
└── useCart.ts usePoll.ts statusStyles.ts
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|:----:|---------|
| `POST` | `/api/reserve` | — | Create a reservation + smart-assign a table |
| `GET` | `/api/reservations` | 🔒 | List reservations |
| `PATCH` | `/api/reservations/[id]` | 🔒 | Update status (confirm / seat / cancel) |
| `GET` `POST` | `/api/orders` | 🔒 / — | List orders / create an order |
| `PATCH` | `/api/orders/[id]` | 🔒 | Update order or payment status |
| `GET` | `/api/tables` · `PATCH /api/tables/[id]` | 🔒 | Floor status |
| `GET` `POST` | `/api/feedback` | 🔒 / — | List (with average) / submit feedback |
| `GET` `PATCH` | `/api/notifications` | 🔒 | Feed / mark read |
| `POST` | `/api/payments` | — | Mock payment gateway |
| `POST` | `/api/auth/login` · `/api/auth/logout` | — | Staff session |

🔒 = requires a staff session cookie.

---

## ⚙️ Configuration

Optional environment variables (create `.env.local`):

```bash
# Enable automatic WhatsApp sending (otherwise wa.me links are used)
WHATSAPP_API_URL=https://graph.facebook.com/v20.0/<phone-id>/messages
WHATSAPP_TOKEN=your_token
```

Editable content lives in plain TypeScript:
- **Restaurant info** → `lib/site.ts` (name, phone, hours, socials, manager WhatsApp)
- **Menu, prices, deals** → `lib/menu.ts`
- **Tables & seating** → `lib/db.ts` (seed)
- **Staff PINs** → `lib/auth.ts`

---

## ☁️ Deployment

Deploys to **Vercel** out of the box:

1. Push this repo to GitHub.
2. Import it on [vercel.com](https://vercel.com/new).
3. Deploy — no configuration needed.

> 💾 **For persistent data**, connect **Upstash for Redis** (Vercel Storage tab →
> Marketplace → Free plan). It injects `KV_REST_API_URL` / `KV_REST_API_TOKEN` and
> the app switches to durable Redis automatically — no code changes.
> Without it, data is in-memory on serverless (fine for a demo, resets on cold starts).
>
> 📘 Full step-by-step in **[DOCS.md](DOCS.md)** — dashboards, env vars & deployment.

---

## 🛣️ Roadmap

- [ ] Live customer order-status tracker (order code → real-time progress)
- [ ] Menu & table management inside the manager dashboard
- [ ] QR-code table ordering
- [ ] Real payment gateway (Stripe / Safepay) + WhatsApp Cloud API
- [ ] Persistent database + real staff accounts
- [ ] Analytics (sales trends, popular items)

---

## 📝 Notes & Disclaimers

- **Payments and automatic WhatsApp sending are functional mocks** — wire real providers where flagged in the code.
- **Auth uses demo PINs** — replace with hashed accounts / OAuth before any real deployment.
- Fictional brand; imagery is from [Unsplash](https://unsplash.com/).

---

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

Built by **Khawar Khan** · Made with Next.js & Tailwind CSS

⭐ If you find this useful, consider starring the repo!

</div>
