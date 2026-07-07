# Purrst Step 🐾

**Team Name:** Team Bubu Dubu  
**Team ID:** `TK2T1NK6`  
**Project Name:** Purrst Step — A Cat-Care Ecosystem

Purrst Step is a cat-care learning and adoption platform that helps beginner cat parents learn safety, care, adoption, and marketplace basics through an interactive story-based experience.

The app includes a cat-only social community feed for photos, tips, adoption posts, donation updates, and cat-care content. It also includes a 2D point-and-click learning game where players rescue Mello, meet the Wisp guide, and complete care lessons through an **Observe → Learn → Interpret → Solve** flow.

For this hackathon, we built one complete lesson room to showcase the game mechanics, lesson design, backend progress saving, and lesson unlock flow. Additional lesson cards show the future learning path.

The app also includes cat-coat-inspired themes, dark mode, profiles, notifications, adoption listings, and a marketplace.

---

## 🔗 Live Demo

**Frontend (Vercel):** https://purrst-step-4iv6-2otafsl9l-venetia-smith1.vercel.app/  

**Backend Health Check:** https://purrststep-backend.onrender.com/health

> The backend API is deployed on Render and is consumed by the frontend. The `/health` endpoint is provided only to verify that the backend service is running.

---

## Demo Login

Dear judges, please use the normal **Sign In** form with the credentials below:

```txt
Email: judge@purrststep.demo
Password: PurrstStep@123
```

This is a demo account with safe sample data only.

---

## ✨ What It Does

Purrst Step turns “how do I take care of a cat?” into a guided, gamified journey.

- **🎮 Story-driven learning** — Rescue Mello the kitten on a stormy night, meet the Wisp, and complete Lesson 1: cat surrounding safety.
- **🧩 Interactive lesson puzzle** — Close the noisy window, make the box cozy, help Mello feel safe, collect the Safety Key, and unlock the next lesson.
- **🏠 Adoption** — Browse adoption listings and save favorites.
- **🛒 Marketplace** — Browse cat food, toys, and supplies; favorite items and place buy / donate / claim requests.
- **💬 Social feed** — View cat-care posts, generated visuals, comments, likes, and community-style updates.
- **🔔 Notifications** — View per-user activity and achievement notifications.
- **👤 Profile & Settings** — Manage profile, cat details, app themes, and dark mode.
- **💾 Saved progress** — Lesson progress is saved to the authenticated user account.

---

## 🎮 Game Flow

1. Mello is rescued during a storm.
2. The player meets the Wisp guide.
3. The Wisp opens the first lesson room.
4. Lesson 1 begins with a cozy cat-care introduction.
5. The player observes an unsafe room.
6. The player learns cat surrounding safety.
7. The player completes a safety puzzle:
   - close the loud window,
   - make the box cozy,
   - see Mello rest safely,
   - collect the Safety Key,
   - open the next lesson door.
8. Lesson 2 unlocks: **Safe and Dangerous Objects**.

---

## 🧱 Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, lucide-react |
| Backend | Node.js, Express 5, ES modules |
| Database & Auth | Supabase Auth, Supabase Postgres, Row-Level Security |
| Validation | Zod |
| Security | Helmet, CORS allowlist, express-rate-limit |
| Deployment | Vercel frontend, Render backend |

---

## 🔐 Security

- Supabase Auth protects private routes.
- Backend validates Supabase Bearer tokens.
- Supabase service role key is backend-only.
- Helmet is enabled.
- Express `x-powered-by` is disabled.
- CORS allowlist is configured for the deployed frontend.
- JSON request body size is limited.
- Rate limiting is enabled.
- Zod validates incoming request bodies.
- Profile and cat text fields are length-limited and hardened against simple stored-XSS patterns.
- Supabase client methods are used instead of raw SQL.
- Search input is sanitized to reduce injection and scanner warnings.
- Backend `npm audit` returned `0 vulnerabilities`.

---

## 📁 Project Structure

```txt
purrst-step/
├── front-end/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AuthTab.jsx
│   │   ├── GameScreen.jsx
│   │   ├── HomeTab.jsx
│   │   ├── MarketplaceTab.jsx
│   │   ├── NotificationsTab.jsx
│   │   ├── ProfileTab.jsx
│   │   ├── SettingsTab.jsx
│   │   ├── data/demoSocial.js
│   │   ├── lib/api.js
│   │   ├── lib/supabase.js
│   │   └── themeStyles.js
│   └── package.json
│
└── purrststep-backend/
    ├── src/
    │   ├── index.js
    │   ├── env.js
    │   ├── supabase.js
    │   ├── middleware/
    │   │   ├── requireAuth.js
    │   │   └── validate.js
    │   ├── routes/
    │   └── schemas/
    └── package.json
```

> Monorepo note: the deployable frontend is the `front-end/` Vite app. The backend is `purrststep-backend/`.

---

## 🌐 API Overview

🔒 = requires authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Service health check |
| `GET` | `/api/auth/check` 🔒 | Verify the current session |
| `POST` | `/api/auth/sync-user` 🔒 | Sync authenticated user into the database |
| `GET` | `/api/me` 🔒 | Current user profile and cat |
| `PATCH` | `/api/me/profile` 🔒 | Update profile |
| `PATCH` | `/api/me/settings` 🔒 | Update settings |
| `PATCH` | `/api/me/cat` 🔒 | Update cat details |
| `GET` | `/api/game/progress` 🔒 | Get lesson progress |
| `POST` | `/api/game/progress` 🔒 | Save lesson progress |
| `GET` | `/api/marketplace/items` | List marketplace items |
| `POST` | `/api/marketplace/items/:id/favorite` 🔒 | Favorite an item |
| `DELETE` | `/api/marketplace/items/:id/favorite` 🔒 | Unfavorite an item |
| `POST` | `/api/marketplace/items/:id/request` 🔒 | Buy / donate / claim an item |
| `GET` | `/api/adoption/listings` | List adoption listings |
| `POST` | `/api/adoption/listings/:id/favorite` 🔒 | Favorite a listing |
| `DELETE` | `/api/adoption/listings/:id/favorite` 🔒 | Unfavorite a listing |
| `GET` | `/api/notifications` 🔒 | Get notifications |
| `POST` | `/api/notifications/clear` 🔒 | Clear notifications |
| `POST` | `/api/notifications/:id/read` 🔒 | Mark notification as read |

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js 18+
- Supabase project
- Supabase URL, anon key, and service role key
- Required tables and RLS policies configured in Supabase

---

### Backend

```bash
cd purrststep-backend
npm install
npm run dev
```

Create `purrststep-backend/.env`:

```env
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Test:

```bash
curl http://localhost:8080/health
```

---

### Frontend

```bash
cd front-end
npm install
npm run dev
```

Create `front-end/.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:8080
```

Open:

```txt
http://localhost:5173
```

> Vite inlines `VITE_*` variables at build time. Restart the dev server or redeploy after changing them.

---

## ☁️ Deployment

### Backend — Render

**Root Directory:** `purrststep-backend`  
**Start Command:** `npm start`

Set these Render environment variables:

| Variable | Notes |
| --- | --- |
| `PORT` | Render provides this automatically, but keeping it configured is okay |
| `NODE_ENV` | Use `production` |
| `FRONTEND_URL` | Final Vercel frontend URL |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend-only service role key |

### Frontend — Vercel

**Root Directory:** `front-end`

Set these Vercel environment variables:

| Variable | Notes |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_API_BASE_URL` | Render backend URL, for example `https://purrststep-backend.onrender.com` |

> CORS note: the backend only accepts requests from the configured frontend origin. Use the stable Vercel URL for the demo.

---

## ✅ Final Testing Checklist

- Login works with judge credentials.
- Home feed images display.
- Dark mode text remains readable.
- Adoption and marketplace pages load.
- Profile page opens.
- Notifications load.
- Game starts correctly.
- Lesson 1 puzzle completes.
- Lesson 2 unlocks.
- Progress saves and reloads.
- Backend `/health` works.
- Frontend production build passes.

---

## 👥 Credits

Built by **Team Bubu Dubu** for the #hackthekitty hackathon.

Purrst Step was created to make cat care more approachable, interactive, and beginner-friendly.
