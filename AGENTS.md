# AGENTS.md

## Project Overview

**nextjs-intdev-services-auth-payments** is the official starter template for building applications on the Internet Development Studio Company's API infrastructure. It provides working implementations of authentication (email/password + OAuth), Stripe-based payments and subscriptions, file uploads, and content management — all wired to the shared backend at `https://api.internet.dev`.

This is the recommended starting point for new projects. Clone it, configure your environment, and build on top of the existing patterns.

- **License:** MIT (Copyright Internet Development Studio Company)
- **API Backend:** `https://api.internet.dev` ([source](https://github.com/internet-development/apis))
- **Live Example:** `https://payments.internet.dev`

---

## Tech Stack

- **Next.js** ^16 with Pages Router
- **React** ^19 with function components
- **TypeScript** ^5.9 (strict mode off, strictNullChecks on)
- **CSS Modules** (`.module.css`) for component-scoped styling
- **No state management library** — React Context + local state only
- **No database or ORM** — all data persists on the backend API
- **No external auth library** — authentication handled directly via API
- **No payment SDK bundled** — Stripe integration via hosted URLs and API calls

---

## Directory Structure

```
pages/                  → Next.js pages (file-based routing)
  ├── index.tsx         → Main page (auth example + pricing tiers)
  ├── oauth.tsx         → OAuth callback handler
  ├── _app.tsx          → App wrapper (providers, global styles)
  ├── _document.tsx     → Document layout
  └── api/              → Next.js API routes
      ├── index.ts      → Root API endpoint
      └── aes.ts        → AES encryption demo endpoint
components/             → Page-level feature components
  ├── Page.tsx          → SEO/meta tag wrapper
  ├── PageSectionUpgrade.tsx → Pricing tiers + payment UI
  └── Providers.tsx     → Context providers wrapper
system/                 → Reusable design system components
  ├── Button.tsx        → Button (visual, loading, href variants)
  ├── Input.tsx         → Text input
  ├── TextArea.tsx      → Textarea
  ├── Select.tsx        → Dropdown select
  ├── Checkbox.tsx      → Checkbox
  ├── ActionItem.tsx    → Interactive list item
  ├── Loader.tsx        → Loading spinner
  ├── Navigation.tsx    → Top navigation bar
  ├── ThinAppLayout.tsx → Minimal app layout wrapper
  ├── modals/           → Modal system
  │   ├── GlobalModalManager.tsx  → Modal renderer
  │   ├── ModalContext.tsx        → Modal state (React Context)
  │   ├── ModalAuthentication.tsx → Sign in / sign out modal
  │   ├── ModalForgotPassword.tsx → Password recovery modal
  │   └── ModalNavigation.tsx     → Mobile nav / font picker modal
  ├── svg/              → SVG icon components
  │   └── social/       → OAuth provider icons (Google, Apple, Bluesky, X)
  ├── typography/       → Text components (H1-H6, P, SubTitle, etc.)
  │   ├── index.tsx     → General typography
  │   └── forms.tsx     → Form-specific typography (FormHeading, InputLabel, etc.)
  └── detectors/
      └── OutsideElementEvent.tsx → Click-outside detector
common/                 → Shared utilities and configuration
  ├── constants.ts      → User tiers, payment amounts, API base URL, Stripe links
  ├── queries.ts        → All API query functions
  ├── server.ts         → Server-side utilities (AES encryption, CORS, session setup)
  ├── utilities.ts      → General helpers (isEmpty, createSlug, classNames, etc.)
  └── hooks.ts          → Custom React hooks (useDebouncedCallback)
modules/                → Low-level utility modules
  ├── aes.js            → AES-256-CTR encryption library
  ├── cookies.ts        → Client-side cookie management
  ├── cors.ts           → CORS middleware
  ├── object-assign.ts  → Object utilities
  └── vary.ts           → HTTP Vary header handling
public/                 → Static assets (favicons, app icon)
.github/                → CI/CD workflows (build, deploy, DNS verification)
```

---

## Path Aliases

Defined in `tsconfig.json`. Always use these aliases instead of relative paths.

| Alias | Maps To |
|---|---|
| `@root/*` | `./*` |
| `@system/*` | `./system/*` |
| `@common/*` | `./common/*` |
| `@components/*` | `./components/*` |
| `@pages/*` | `./pages/*` |
| `@modules/*` | `./modules/*` |
| `@data/*` | `./data/*` |
| `@demos/*` | `./demos/*` |

---

## Component Conventions

### File Naming

- Components: `PascalCase.tsx` (e.g., `PageSectionUpgrade.tsx`)
- Styles: `PascalCase.module.css` co-located with component
- Component name matches file name exactly

### Component Structure

```tsx
import styles from '@components/ComponentName.module.css';
import * as React from 'react';

export default function ComponentName(props) {
  return <div className={styles.root}>Content</div>;
}
```

### Key Patterns

- Always use `export default function` for components
- Always use `import * as React from 'react'` (not `import React from 'react'`)
- Always import utilities as namespace: `import * as Utilities from '@common/utilities'`
- Always import constants as namespace: `import * as Constants from '@common/constants'`
- Always import queries as namespace: `import * as Queries from '@common/queries'`
- Props are passed directly (not destructured in function signature)
- No prop spreading — pass props explicitly
- Use `React.useState` and `React.useEffect` (not destructured imports)

### Comments

- Use `// NOTE(username)` for explanatory notes
- Use `// TODO(username)` for planned work
- Keep comments minimal; code should be self-explanatory

---

## Styling Conventions

### CSS Modules

Every component has a co-located `.module.css` file. Styles are locally scoped.

### Global Styles

- `global.css` — CSS reset, color palette, theme variables, typography scale
- `fonts.css` — Font-face definitions

### CSS Class Naming

Use camelCase within CSS modules:

- `.root` — Top-level element
- `.container` — Layout wrapper
- `.content` — Content area
- `.header` / `.footer` — Header/footer sections
- `.button` — Button elements
- `.input` — Form elements
- `.row`, `.column` — Grid layout

### Theme System

Five themes set via `body` class: `theme-light` (default), `theme-dark`, `theme-daybreak`, `theme-blue`, `theme-neon-green`.

All colors use CSS custom properties:

| Variable | Purpose |
|---|---|
| `--theme-background` | Main background |
| `--theme-text` | Text color |
| `--theme-border` | Border color |
| `--theme-primary` | Primary action color |
| `--theme-button` / `--theme-button-text` | Button styling |
| `--theme-success` / `--theme-error` | Status colors |
| `--theme-foreground` | Primary foreground |
| `--theme-foreground-secondary` | Secondary foreground |

### Typography Scale

```
--type-scale-1: 3.815rem  →  --type-scale-7: 1rem
--type-scale-fixed-large: 20px  →  --type-scale-fixed-label: 10px
```

### Font Families

- `--font-family` — System sans-serif stack
- `--font-family-mono` — Consolas, monaco, monospace
- `--font-family-serif` — Georgia, Times New Roman
- `--font-family-controls` — SFMonoSquare-Regular, Consolas

### Borders

Use `box-shadow` instead of `border` for theme-aware borders:

```css
box-shadow: 0 0 0 1px var(--theme-border);
```

### Transitions

Standard transition: `transition: 200ms ease all;`

### Spacing

Multiples of 4: `4px, 6px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 128px`. Most common is `24px`.

---

## Authentication Flow

### Email/Password

1. User opens `ModalAuthentication` via Navigation "Sign in" button
2. User enters email and password
3. Client calls `POST /api/users/authenticate` via `Queries.onPublicUserAuthenticate()`
4. If the email doesn't exist, the API creates the account automatically
5. On success, the API returns a `user` object with a `key` (API key)
6. Client stores the key in a `sitekey` cookie via `Cookies.set('sitekey', key, { secure: true })`
7. Page reloads; `getServerSideProps` reads the cookie and calls `PUT /api/users/viewer` to validate the session

### OAuth (Google, Apple, Bluesky)

1. User clicks an OAuth button in `ModalAuthentication`
2. Browser navigates to `https://api.internet.dev/authenticate-{provider}?domain={OAUTH_REDIRECT_SIGNATURE}`
3. After provider auth, the API encrypts the user's API key and redirects to `/oauth?key={encrypted}`
4. `oauth.tsx` decrypts the key server-side using `Server.decrypt()`
5. Client stores the decrypted key in the `sitekey` cookie
6. Browser redirects to `/`

### Session Validation (Server-Side)

```tsx
export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);
  return { props: { sessionKey, viewer } };
}
```

`Server.setup()` reads the `sitekey` cookie and calls `PUT /api/users/viewer` with the `X-API-KEY` header to validate and return the user object.

### Sign Out

Remove the `sitekey` cookie via `Cookies.remove('sitekey')` and reload the page.

---

## Payments Flow (Stripe)

### Subscription Tiers

| Tier | Price | Level | Monthly Credits |
|---|---|---|---|
| Free | $0/mo | 0–10 | — |
| Professional (PAYING) | $8.99/mo | 20 | 1,500 |
| General Co-working | $404/mo | 30 | 45,000 |
| Partner | $2,790/mo | 40 | 45,000 |

### Subscribing

1. User clicks "Get started" on a tier in `PageSectionUpgrade`
2. Browser navigates to Stripe hosted payment link (from `Constants.LINKS`) with `?prefilled_email=`
3. Stripe handles payment collection
4. Stripe webhook on the API backend upgrades the user's tier

### Adding a Payment Method

1. Client calls `Queries.onGetStripePaymentURL()` → `POST /api/users/viewer/generate-add-payment-method-url`
2. API returns a hosted Stripe URL for adding a card
3. User visits the URL and adds their payment method

### Sending a Payment

```tsx
const response = await Queries.onSendAmountCents({ amount: 1000, key: sessionKey });
```

Calls `POST /api/users/viewer/pay-provider-amount-cents` with amount in cents.

### Viewing Current Payment Method

```tsx
const card = await Queries.onGetStripePaymentMethod({ key: sessionKey });
// card.data.card.last4 → "4242"
```

---

## API Integration

### Request Pattern

All API calls go through `common/queries.ts` using the shared `getData()` helper:

```tsx
const response = await fetch(route, {
  method: 'POST',
  headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
```

### Query Function Naming

Functions follow `on[Action]` naming convention: `onPublicUserAuthenticate`, `onGetStripePaymentURL`, `onUserCreatePost`, etc.

### All Available Query Functions

**Authentication & Users**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onPublicUserAuthenticate` | `POST /api/users/authenticate` | Email/password login or register |
| `onPublicUserForgotPassword` | `POST /api/users/reset-password` | Request password reset |
| `onUserChangePassword` | `POST /api/users/update-viewer-password` | Change password |
| `onUserRegenerateAPIKey` | `POST /api/users/regenerate-key` | Generate new API key |
| `onUserVerifyEmail` | `POST /api/users/verify` | Verify email with verification code |
| `onUserVerifyResend` | `POST /api/users/verify-resend` | Resend verification email |
| `onSetUsername` | `POST /api/users/update-viewer-username` | Set or change username |
| `onGetPublicUserByUsername` | `POST /api/users/public/get-by-username` | Look up public user profile |

**Payments & Subscriptions**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onGetStripePaymentURL` | `POST /api/users/viewer/generate-add-payment-method-url` | Get Stripe payment setup URL |
| `onGetStripePaymentMethod` | `POST /api/users/viewer/get-current-payment-method` | Get current card on file |
| `onSendAmountCents` | `POST /api/users/viewer/pay-provider-amount-cents` | Charge payment method |
| `onUserUnsubscribeServices` | `POST /api/users/subscriptions/unsubscribe` | Cancel subscription |
| `onGetSubscriptions` | `GET /api/users/subscriptions` | List all available subscriptions |

**Credits & Tokens**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onGetCreditsBalance` | `GET /api/credits/balance` | Check token balance |
| `onGetCreditsPricing` | `GET /api/credits/pricing` | Get API pricing directory |
| `onGetCreditsTransactions` | `GET /api/credits` | List credit transactions |
| `onSendCredits` | `POST /api/credits/send` | Transfer tokens to another user |

**Organizations**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onGetAllOrganizations` | `GET /api/organizations` | List all organizations |
| `onGetViewerOrganizations` | `GET /api/users/viewer/organizations` | List viewer's organizations |
| `onOrganizationCreate` | `POST /api/organizations/create` | Create organization |
| `onOrganizationAddUser` | `POST /api/organizations/users/add` | Add user to organization |

**Data & Files**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onUserListData` | `POST /api/data` | List user's data |
| `onUserDeleteData` | `POST /api/data/delete` | Delete data entry |
| `onUserUploadDataS3` | `POST /api/data/generate-presigned-url` | Upload file via S3 presigned URL |
| `onUserUploadDataGCS` | `POST /api/data/generate-presigned-url-gcs` | Upload file via GCS presigned URL |

**Documents**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onRefreshDocuments` | `POST /api/documents` | List documents |
| `onGetDocumentById` | `GET /api/documents/:id` | Get single document |
| `onUserCreateDocument` | `POST /api/documents/create` | Create document |
| `onDeleteDocumentById` | `POST /api/documents/delete` | Delete document |
| `onUpdateDocumentById` | `POST /api/documents/update` | Update document |

**Posts & Threads**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onRefreshPosts` | `POST /api/posts` | List posts |
| `onUserCreatePost` | `POST /api/posts/create` | Create post |
| `onUserCreateThread` | `POST /api/posts/create` | Create thread |
| `onUserDeletePost` | `POST /api/posts/delete` | Delete post |
| `onUserListThreads` | `POST /api/posts/all-threads` | List all threads |
| `onUserListThreadReplies` | `POST /api/posts/all-thread-replies` | Get thread replies |

**Likes**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onCreateLike` | `POST /api/likes/create` | Like content |
| `onDeleteLike` | `POST /api/likes/delete` | Remove a like |
| `onGetViewerLikes` | `GET /api/users/viewer/likes` | List viewer's likes |

**Events**

| Function | API Endpoint | Purpose |
|---|---|---|
| `onGetEvents` | `GET /api/events` | List events |
| `onCreateEvent` | `POST /api/events/create` | Create event |
| `onDeleteEvent` | `POST /api/events/delete` | Delete event |

### Backend API Endpoints Not Yet Wrapped

These endpoints exist on `api.internet.dev` but don't have query functions in this template yet. Add them to `common/queries.ts` as needed:

| Endpoint | Purpose |
|---|---|
| `PUT /api/users/viewer` | Get authenticated user (used in `server.ts` directly) |
| `GET /api/marketplace/cart` | Get shopping cart |
| `POST /api/marketplace/cart/add` | Add item to cart |
| `POST /api/marketplace/cart/remove` | Remove item from cart |
| `POST /api/marketplace/checkout` | Process checkout (Stripe or tokens) |
| `GET /api/marketplace/orders` | List orders |
| `GET /api/inventory` | List inventory items |
| `POST /api/inventory/claim` | Claim inventory item (tier-gated) |
| `POST /api/events/update` | Update event |
| `GET /api/events/conflicts` | Check event time conflicts |
| `POST /api/organizations/update` | Update organization |
| `POST /api/organizations/users/promote` | Promote user in organization |
| `POST /api/organizations/users/remove` | Remove user from organization |

---

## User Tiers

Defined in `common/constants.ts`:

| Level | Tier | Description |
|---|---|---|
| 0 | UNVERIFIED | New account, email not verified |
| 10 | VERIFIED | Email verified |
| 20 | PAYING | $8.99/month subscriber |
| 30 | GENERAL_CO_WORKING | $404/month subscriber |
| 40 | PARTNER | $2,790/month subscriber |
| 100 | ADMIN | Platform administrator |

### Checking User Tier in Components

```tsx
const isVerified = viewer && Number(viewer.level) >= Constants.Users.tiers.VERIFIED;
const isPaying = viewer && Number(viewer.level) >= Constants.Users.tiers.PAYING;
```

---

## Modal System

- `ModalProvider` (in `Providers.tsx`) — React Context for modal state management
- `GlobalModalManager` — Renders the active modal; place once in your page tree
- `useModals()` hook — Returns `{ open, close, active }`
- Modals are mutually exclusive — opening a new modal closes the previous one
- Close animation support via `ModalRef.getUnmountDelayMS()`

### Opening a Modal

```tsx
const modals = useModals();
modals.open(ModalAuthentication);
modals.open(ModalNavigation, { parentId: 'button-id' });
```

### Creating a New Modal

```tsx
import { ModalComponent, useModals } from '@root/system/modals/ModalContext';

const MyModal: ModalComponent<MyModalProps> = (props) => {
  return (
    <div>
      <p>Modal content</p>
      <button onClick={() => props.onClose()}>Close</button>
    </div>
  );
};

export default MyModal;
```

---

## OAuth Redirect Configuration

To add OAuth support for your deployment, you must register your redirect signature in the API's `constants.ts`:

1. Set `OAUTH_REDIRECT_SIGNATURE` in `common/constants.ts` to a unique string for your app
2. Submit a PR to [internet-development/apis](https://github.com/internet-development/apis) adding your redirect URL to the OAuth constants
3. Reference: [apis/common/constants.ts](https://github.com/internet-development/apis/blob/main/common/constants.ts)

---

## Server-Side Encryption

AES-256-CTR encryption is used for sensitive cross-domain payloads (e.g., OAuth key exchange).

- `Server.encrypt(message)` — Encrypts a string to hex
- `Server.decrypt(hex)` — Decrypts hex back to string
- Requires `API_AES_KEY` and `API_IV_KEY` environment variables
- Keys are shared across all INTDEV applications — do not rotate without coordination

---

## File Uploads

Max file size: 15MB (`Constants.MAX_SIZE_BYTES = 15728640`).

### S3 Upload

```tsx
const result = await Queries.onUserUploadDataS3({ domain: 'your-domain', file, key: sessionKey });
```

### GCS Upload

```tsx
const result = await Queries.onUserUploadDataGCS({ domain: 'your-domain', file, key: sessionKey });
```

Both functions request a presigned URL from the API, then PUT the file directly to the storage provider.

---

## Environment Variables

Required in `.env` for full functionality:

```sh
API_AES_KEY=xxxxx    # AES encryption key (get from INTDEV team)
API_IV_KEY=xxxxx     # Initialization vector key (get from INTDEV team)
```

Without these keys, OAuth and password recovery will not work. Email/password authentication will still function.

---

## Code Formatting

Prettier configuration (`.prettierrc`):

- Print width: 9999 (no line wrapping)
- 2-space indent, no tabs
- Single quotes, semicolons
- Trailing commas: ES5
- Bracket spacing: enabled

---

## Development Commands

```sh
npm install          # Install dependencies
npm run dev          # Dev server on port 10000
npm run build        # Production build
npm start            # Production server on port 10000
npm run lint         # Run Next.js linter
```

Port 10000 is used for Render.com compatibility.

---

## Extending This Template

### Adding a New Page

1. Create `pages/your-page.tsx`
2. Use `getServerSideProps` with `Server.setup(context)` for authenticated pages
3. Wrap content in `<Page>` for SEO and `<Navigation>` for the nav bar
4. Include `<GlobalModalManager />` for modal support

### Adding a New API Query

1. Add your function to `common/queries.ts`
2. Follow the `on[Action]` naming convention
3. Use the `getData()` helper with the appropriate qualifier

```tsx
export async function onGetCreditsBalance({ key }) {
  const route = `${Constants.API}/credits/balance`;
  const body = {};
  return await getData({ route, key, body });
}
```

### Adding a New Modal

1. Create `system/modals/ModalYourFeature.tsx`
2. Implement the `ModalComponent<YourProps>` type
3. Use `props.onClose()` for dismissal
4. Open via `modals.open(ModalYourFeature, { ...props })`

### Adding a New System Component

1. Create `system/YourComponent.tsx` and `system/YourComponent.module.css`
2. Use theme variables for colors
3. Follow the existing component patterns (PascalCase, default export, props not destructured)

---

## Key Rules

1. **No relative imports** — Always use path aliases (`@system/`, `@components/`, `@common/`, etc.)
2. **No SASS/SCSS** — Use plain CSS with CSS Modules (`.module.css`)
3. **No external state management** — Use React Context + useState only
4. **No CSS-in-JS libraries** — Use CSS Modules for all styling
5. **No new dependencies** without explicit approval
6. **Pages Router** — This template uses the Pages Router, not App Router
7. **Props over context** — Pass data through props; reserve context for global concerns (modals)
8. **Server-side auth** — Use `getServerSideProps` with `Server.setup()` for session handling
9. **Theme-aware styling** — Use CSS custom properties (`--theme-*`) for all colors
10. **API-first architecture** — No local database; all data flows through `api.internet.dev`
