# TEMPLATE-AUDIT.md

An audit of how easy it is to start a new project with **nextjs-intdev-services-auth-payments**, covering the full developer experience from clone to running application.

Anything that is fixed in here should be removed from the list.

---

## Template Readiness Score

**Current confidence that this template is ready for a new developer to clone, build a front-end, and take full advantage of api.internet.dev: 95%**

| Category                | Score | Notes                                                                    |
| ----------------------- | ----- | ------------------------------------------------------------------------ |
| First-run experience    | 92%   | Clone to running in 30s, minimal deps, `.env.example` included          |
| Auth working out of box | 85%   | Email/password works, OAuth needs keys                                   |
| API integration layer   | 90%   | `getData()` passes through API error responses with messages             |
| Developer ergonomics    | 75%   | `useViewer()` hook available, cookie name centralized                    |
| Code hygiene            | 95%   | Hardcoded strings moved to constants, debug logs removed, CI updated     |
| Documentation           | 88%   | AGENTS.md + README now comprehensive                                     |
| Deployment readiness    | 90%   | CI matches runtime Node version, `.env.example` present                  |

---

## Ranked Issues by Impact

Every issue below includes the percentage gain toward 100% readiness if fixed. Issues are ordered from highest to lowest impact.

### #9 — No centralized error/loading state pattern

- **Current readiness gain if fixed: +3%**
- **Problem:** Each component invents its own loading and error state. `ModalAuthentication` uses `const [loading, setLoading] = React.useState(false)` with `alert()` for errors. `PageSectionUpgrade` uses `window.confirm()` and `alert()`. There's no shared pattern for showing loading spinners, error messages, or success feedback.
- **Impact:** Every new feature reinvents the wheel. Inconsistent UX across the app. `alert()` and `window.confirm()` are acceptable for a demo but not for a real front-end.
- **Fix:** Establish a feedback pattern — either extend the modal system with toast/notification support, or add a simple status message component.

---

### #10 — No example of a protected page or tier-gated feature

- **Current readiness gain if fixed: +2%**
- **Problem:** The template has one page (`index.tsx`). It checks tiers (`isVerified`, `isPaying`, etc.) but doesn't demonstrate how to gate a page or feature behind a tier. A new developer has to figure out the redirect-or-render pattern themselves.
- **Impact:** First thing most developers will need. Without an example, they'll implement it differently each time.
- **Fix:** Add a second page (e.g., `pages/dashboard.tsx`) that redirects unauthenticated users and shows tier-specific content.

---

## Impact Summary

| Fix                    | Gain | Cumulative | Effort                                    |
| ---------------------- | ---- | ---------- | ----------------------------------------- |
| #9 Error/loading pattern  | +3%  | 98%        | Medium — design decision + implementation |
| #10 Protected page example | +2%  | 100%       | Low — one new page file                   |

**Fixing these two remaining issues would bring the template from 95% to 100%.**

---

## First-Run Experience

### Clone to Running App

| Step                          | Time     | Friction                   |
| ----------------------------- | -------- | -------------------------- |
| Clone repository              | ~10s     | None                       |
| `cp .env.example .env`        | ~2s      | None                       |
| `npm install`                 | ~15s     | None — only 3 runtime deps |
| `npm run dev`                 | ~3s      | None                       |
| Open `http://localhost:10000` | Instant  | None                       |
| **Total (without .env)**      | **~30s** | **Very low**               |

**Verdict:** Excellent. The minimal dependency count (next, react, react-dom) means fast installs and no version conflicts. The app starts and renders immediately.

### First Interaction

Without `.env` keys configured:

- The page loads and displays pricing tiers — works
- Theme switching — works
- Font switching — works
- Sign in with email/password — works (creates account or authenticates)
- Sign in with OAuth — fails silently (AES decryption error on redirect)
- Password recovery — fails (requires AES keys for encrypted email)

**Verdict:** Good. Core email/password auth works immediately. OAuth requires additional setup but the failure mode could be more informative.

---

## Environment Setup

### Current State

The template requires two environment variables:

```sh
API_AES_KEY=xxxxx
API_IV_KEY=xxxxx
```

A `.env.example` file is included with comments explaining what the keys are for.

**Remaining issues:**

1. **No validation on startup** — If keys are missing, the app starts fine but OAuth/password-reset silently fail. The error only surfaces when `Server.encrypt()` or `Server.decrypt()` is called and throws.

2. **Key acquisition friction** — README says "ask someone on the INTDEV team" which is a blocker for external developers. Consider documenting what the keys are for and whether developers can generate their own for local development.

---

## Documentation Quality

### Before This Audit

| Document   | Lines | Quality                                       |
| ---------- | ----- | --------------------------------------------- |
| README.md  | 34    | Basic — setup steps only, no feature overview |
| AGENTS.md  | —     | Did not exist                                 |
| LICENSE.md | 21    | Complete (MIT)                                |

### After This Audit

| Document          | Lines     | Quality                                           |
| ----------------- | --------- | ------------------------------------------------- |
| README.md         | ~70       | Good — features, setup, architecture, links       |
| AGENTS.md         | ~400      | Comprehensive — conventions, flows, all endpoints |
| TEMPLATE-AUDIT.md | This file | Meta-documentation                                |

---

## Code Quality & Patterns

### Strengths

1. **Minimal dependencies** — Only 3 runtime deps. No version hell, no supply chain risk, no bundle bloat.
2. **Consistent patterns** — All API calls go through `getData()`, all components follow the same structure, all styling uses CSS Modules.
3. **Working auth modal** — Full sign-in/sign-out flow with email, Google, Apple, and Bluesky ready to go.
4. **Theme system** — 5 built-in themes with CSS custom properties. Easy to extend.
5. **Component library** — Button, Input, TextArea, Select, Checkbox, ActionItem, Loader, Navigation, modals — covers most form needs.
6. **Server-side session validation** — `getServerSideProps` + `Server.setup()` is a solid pattern for authenticated pages.
7. **TypeScript** — Strict null checks enabled, path aliases configured.
8. **ViewerContext** — `useViewer()` hook provides `viewer` and `sessionKey` to any component without prop drilling.
9. **Centralized constants** — Cookie name, password reset source, and API URL are all in `common/constants.ts`.

---

## Feature Coverage vs. Backend API

### What the template demonstrates

| Feature                        | UI  | Query Function      | Working         |
| ------------------------------ | --- | ------------------- | --------------- |
| Email/password auth            | Yes | Yes                 | Yes             |
| OAuth (Google, Apple, Bluesky) | Yes | N/A (redirect)      | Yes (with keys) |
| Sign out                       | Yes | N/A (cookie remove) | Yes             |
| Password recovery              | Yes | Yes                 | Yes (with keys) |
| View pricing tiers             | Yes | N/A (static)        | Yes             |
| Subscribe (Stripe redirect)    | Yes | N/A (link)          | Yes             |
| Add payment method             | Yes | Yes                 | Yes             |
| Send payment                   | Yes | Yes                 | Yes             |
| View payment method            | Yes | Yes                 | Yes             |
| Theme switching                | Yes | N/A                 | Yes             |

### What the backend supports but the template doesn't demonstrate

| Feature            | Query Function Added | UI  | Priority for Starter                 |
| ------------------ | -------------------- | --- | ------------------------------------ |
| Email verification | Yes                  | No  | High — users can't verify emails     |
| Set username       | Yes                  | No  | High — needed for public profiles    |
| Credit balance     | Yes                  | No  | Medium — useful for token-gated apps |
| Send credits       | Yes                  | No  | Medium — peer-to-peer transfers      |
| Organizations      | Yes                  | No  | Medium — team/workspace features     |
| Likes              | Yes                  | No  | Low — social feature                 |
| Events             | Yes                  | No  | Low — scheduling feature             |
| Marketplace/cart   | No                   | No  | Low — e-commerce feature             |
| Inventory          | No                   | No  | Low — asset management               |
| File uploads       | No (query exists)    | No  | Medium — no upload UI                |

### Recommendation

Consider adding minimal UI for the **high priority** items:

- A verification code input after sign-up (the API sends verification emails automatically)
- A username field in the authenticated view
- A credit balance display for paying users

These would make the template demonstrate the full user lifecycle: sign up → verify email → set username → subscribe → use credits.

---

## Template Customization Guide

### What a developer must change to use this template for their own project

| Item                   | File                       | What to Change                             |
| ---------------------- | -------------------------- | ------------------------------------------ |
| App name               | `package.json`             | `name` field                               |
| Page title/description | `pages/index.tsx`          | `<Page title=... description=... url=...>` |
| OAuth redirect         | `common/constants.ts`      | `OAUTH_REDIRECT_SIGNATURE`                 |
| Cookie name            | `common/constants.ts`      | `COOKIE_NAME`                              |
| Password reset source  | `common/constants.ts`      | `PASSWORD_RESET_SOURCE`                    |
| Stripe links           | `common/constants.ts`      | `LINKS` object                             |
| Subscription tiers     | `common/constants.ts`      | `Tiers`, `Payments`, `Payouts` objects     |
| Pricing display        | `components/PageSectionUpgrade.tsx` | Tier names, prices, descriptions  |
| Navigation links       | `system/Navigation.tsx`    | Logo href, nav items                       |
| Favicons               | `public/`                  | Replace icon files                         |
| Terms/Privacy links    | `components/PageSectionUpgrade.tsx` | Policy URLs                      |

### What a developer should NOT change

- `common/server.ts` — AES encryption functions (shared across INTDEV apps)
- `modules/aes.js` — Encryption library
- `modules/cookies.ts` — Cookie management
- `modules/cors.ts` — CORS middleware
- The `getData()` helper pattern in `common/queries.ts`

---

## Deployment Readiness

| Aspect                | Status     | Notes                                                |
| --------------------- | ---------- | ---------------------------------------------------- |
| Production build      | Works      | `npm run build` succeeds                             |
| Port configuration    | 10000      | Render.com compatible                                |
| Environment variables | 2 required | Simple, `.env.example` provided                      |
| CI/CD                 | Exists     | GitHub Actions for build, deploy, DNS (Node 18)      |
| Static assets         | Present    | Favicons, app icon                                   |
| SEO                   | Basic      | `<Page>` component sets meta tags                    |
| CORS                  | Configured | API routes have CORS middleware                      |
| Security              | Good       | Secure cookies, AES encryption, no secrets in client |

---

## Comparison with www-users-garden and www-txt-dev

| Aspect            | This Template                   | www-users-garden     | www-txt-dev          |
| ----------------- | ------------------------------- | -------------------- | -------------------- |
| Purpose           | Starter template                | Dashboard product    | Writing tool product |
| Auth demo         | Full (email + OAuth + payments) | Full (email + OAuth) | Full (email + OAuth) |
| Payment demo      | Yes (Stripe tiers + charges)    | Integrated           | Integrated           |
| Component count   | ~15                             | ~40+                 | ~58+                 |
| Dependencies      | 3                               | ~4                   | ~8 (Slate.js)        |
| Router            | Pages Router                    | Pages Router         | App Router           |
| Onboarding docs   | AGENTS.md + README              | AGENTS.md + README   | AGENTS.md + README   |
| Template-specific | Uses GitHub template feature    | No                   | No                   |

**Key advantage of this template:** It intentionally keeps things minimal so developers start with a clean foundation rather than needing to strip out product-specific code.
