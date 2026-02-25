# nextjs-intdev-services-auth-payments

The official starter template for building applications on the [Internet Development Studio Company](https://internet.dev) API. Provides working implementations of authentication, payments, and user management — ready to clone and build on.

### What's Included

- **Authentication** — Email/password login and account creation, OAuth (Google, Apple, Bluesky), session management via cookies, password recovery
- **Payments** — Stripe subscription tiers (Free, Professional, Co-working, Partner), payment method management, direct charges
- **File Uploads** — S3 and Google Cloud Storage via presigned URLs (15MB max)
- **Content** — Documents and posts/threads CRUD operations
- **UI System** — Themed component library (5 themes), modal system, form elements, typography, SVG icons
- **Server-Side Rendering** — `getServerSideProps` with session validation on every page load

### Setup

Requires Node.js >= 18.

```sh
git clone https://github.com/internet-development/nextjs-intdev-services-auth-payments.git
cd nextjs-intdev-services-auth-payments
npm install
```

Create a `.env` file:

```sh
API_AES_KEY=xxxxx
API_IV_KEY=xxxxx
```

These keys enable OAuth and password recovery. Contact the [INTDEV team](https://company.internet.dev) for the correct values. Email/password authentication works without them.

```sh
npm run dev
```

Open `http://localhost:10000`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server on port 10000 |
| `npm run build` | Production build |
| `npm start` | Production server on port 10000 |
| `npm run lint` | Run Next.js linter |

### Architecture

This is a **frontend-only application**. All data persists on the backend API at `https://api.internet.dev` ([source](https://github.com/internet-development/apis)). The template communicates via HTTP requests with `X-API-KEY` headers and manages sessions through browser cookies.

```
pages/          → Next.js pages and API routes
components/     → Page-level feature components
system/         → Reusable design system (buttons, inputs, modals, typography)
common/         → Shared utilities (API queries, constants, server helpers)
modules/        → Low-level modules (cookies, encryption, CORS)
```

### OAuth Configuration

To enable OAuth for your deployment, set `OAUTH_REDIRECT_SIGNATURE` in `common/constants.ts` and submit a PR to the [APIs repository](https://github.com/internet-development/apis) to register your redirect URL.

### Documentation

- **[AGENTS.md](./AGENTS.md)** — Comprehensive developer guide: conventions, architecture, API endpoints, and extension patterns
- **[TEMPLATE-AUDIT.md](./TEMPLATE-AUDIT.md)** — Template usability audit and improvement recommendations

### Related Repositories

- [internet-development/apis](https://github.com/internet-development/apis) — Backend API source code
- [internet-development/nextjs-sass-starter](https://github.com/internet-development/nextjs-sass-starter) — Minimal Next.js starter (no auth/payments)

### Contact

Questions? Reach out on Twitter: [@wwwjim](https://www.twitter.com/wwwjim) or [@internetxstudio](https://x.com/internetxstudio).

### License

MIT — Internet Development Studio Company
