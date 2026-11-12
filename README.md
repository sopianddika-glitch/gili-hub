# Gili Hub

A modular foundation for a local discovery and island services platform focused on Gili Trawangan, Lombok, Indonesia. English is the initial interface language; Indonesian is a future phase.

This is project initialization only: a responsive landing page, explicit inactive category/search previews, shared design foundation, and an application health endpoint. There are no business records, reviews, reservations, payments, authentication, maps, or external service connections.

## Requirements and installation

- Node.js 24 LTS (`.nvmrc`); validated with 24.22.1.
- npm 11 or later; lockfile generated with 11.9.0.
- Git; validated with 2.52.0 on Debian 13 Linux.

```bash
cd gili-hub
npm ci
npm run dev
```

Open http://localhost:3000 in the same machine/environment where Next.js runs. When this repository runs in a remote cloud workspace, localhost on your own computer points to your computer, not this workspace. Use a working forwarded preview, or download the source and run the commands locally. A browser panel queued by the app does not prove port forwarding is working. No environment variables are needed. `.env.example` documents the current configuration policy. When an integration needs configuration, copy it to `.env.local` and use real credentials only there. All `.env*` files are ignored except `.env.example`. Never place secrets in `NEXT_PUBLIC_` variables.

Use `http://localhost:3000` for development. In this environment the HMR WebSocket connects on `localhost`, but the `127.0.0.1` alias produces an invalid handshake in Chromium. Ordinary HTTP endpoints work on both addresses; the production preview has no HMR dependency.

In a restricted environment with an unwritable home directory, prefix package installation with `NPM_CONFIG_CACHE=/tmp/gili-npm-cache`. This is an environment workaround, not a project requirement.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js development server |
| `npm run typecheck` | Generate Next route types, then run strict TypeScript checks |
| `npm run lint` | Run Next.js, accessibility, React and TypeScript lint rules with zero warnings allowed |
| `npm run build` | Create production build with Turbopack |
| `npm start` | Serve the production build, after building |

`npm run dev -- --hostname 0.0.0.0` exposes development preview to the development environment. For a port conflict use `npm run dev -- --port 3001`.

## Stack and compatibility

Next.js 16.4.6 (App Router), React 19.3.0, TypeScript 5 with strict mode, Tailwind CSS 4.3.3, Lucide React, and ESLint flat configuration. The official create-next-app 16.4.6 template was used with npm, TypeScript, Tailwind, ESLint, `src/`, and the `@/*` alias.

Next.js requires Node >=20.9. This project selects Node 24 LTS for a reproducible baseline. ESLint 9.39.5 is retained because the current Next React/accessibility/import lint plugins declare ESLint 9 support, while ESLint 10 produces incompatible peer dependencies. Review the full plugin stack together before upgrading ESLint. `package-lock.json` records the exact dependency graph.

Reference checked during setup: https://nextjs.org/docs/app/getting-started/installation and the version-matched guides bundled under `node_modules/next/dist/docs/`. See `AGENTS.md` before changing framework code.

## Project structure

```text
gili-hub/
├── docs/                         # Initialization report
├── public/images/                # Local decorative image and source notes
├── src/
│   ├── app/
│   │   ├── api/health/route.ts    # GET application liveness endpoint
│   │   ├── globals.css           # Tailwind tokens, base styles, shared classes
│   │   ├── icon.svg              # Brand app icon
│   │   ├── layout.tsx            # Metadata, local fonts, accessible document shell
│   │   └── page.tsx              # Landing composition
│   ├── assets/fonts/             # Self-hosted DM Sans and OFL license
│   ├── components/
│   │   ├── ui/                   # Reusable presentation primitives (Container)
│   │   ├── layout/               # Site header and footer
│   │   └── shared/               # Shared brand component
│   ├── features/
│   │   ├── places/               # Reserved directory domain
│   │   ├── categories/           # Category navigation preview
│   │   ├── search/               # Disabled search preview
│   │   └── maps/                 # Reserved map integration boundary
│   ├── lib/                      # Future shared helpers and provider adapters
│   ├── types/                    # Provider-independent shared domain types
│   ├── data/                     # Static category taxonomy only
│   ├── config/                   # Public site configuration
│   └── hooks/                    # Reserved reusable client hooks
├── .env.example
├── .gitignore
├── .nvmrc
├── AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts                  # Generated locally; ignored in Git
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

Reserved folders contain short README files so Git preserves the intended architecture without speculative implementations.

## Architecture and conventions

- `app/` handles routing and composition. `components/` owns reusable presentation. `features/` owns domain-specific UI and, when needed, domain rules and data access.
- Add repositories/provider adapters inside each domain when implementing persistence. Keep business rules in feature services, separate from both React presentation and provider-specific queries. Route Handlers should validate requests and call those services; they should not duplicate business logic.
- Use Server Components by default. Add `use client` only for state, event handlers, custom hooks, or browser APIs. The mobile menu uses native `details`/`summary`; application components currently need no client state.
- Future database, auth and storage clients belong on the server behind feature repositories/adapters. Do not import them directly into UI. Add runtime environment validation and authorization together with the actual integration.
- Future MapLibre browser rendering stays inside `features/maps` behind a small Client Component. Pass typed location data into it; no map library is installed now.
- Shared types remain independent of a specific data provider. Avoid abstraction layers until an implemented feature needs them.
- Use named exports, descriptive kebab-case file names, typed props, and semantic HTML. Shared spacing comes from Tailwind's spacing scale and the responsive `Container`; colors and typography are centralized in `globals.css`.
- English strings currently live near their presentation. Introduce an English/Indonesian message catalog and locale routing before multilingual feature work; no unnecessary translation dependency is installed.

## Design and accessibility

Sand, ocean, seafoam, and coral tokens; self-hosted DM Sans; mobile-first layouts; semantic landmarks; labelled search input; skip link; visible keyboard focus; reduced-motion support; and native mobile navigation. Search and all eight category tiles are disabled and labelled as previews/coming soon. The map and business registration are explicitly planned. No fake business information, medical contacts, ferry timetables, ratings, or coordinates are included.

The hero photo is decorative mood imagery, not verified local evidence. Its source and license are documented in `public/images/README.md`; replace it with a verified licensed Gili photograph before launch. Fonts are licensed under SIL OFL; see `src/assets/fonts/OFL.txt`. Fonts/images are served locally without browser requests to a third-party provider.

## Health endpoint

```bash
curl -i http://localhost:3000/api/health
```

Expected status `200`, `Cache-Control: no-store`, and JSON:

```json
{"status":"ok","service":"gili-hub"}
```

This is process liveness only. It does not check a database or external services. Unsupported methods return Next.js's `405` response.

## Security and deployment

Type checking and linting are not bypassed. Security response headers include `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Frame-Options: DENY`; the framework signature header is disabled. Secret environment files, dependencies, build outputs, and local test artifacts are ignored. No credentials are required or present in the application.

The starter sets `robots` to `noindex, nofollow` intentionally. At public launch set the canonical production URL, metadata base, verified social imagery, robots policy, and sitemap. Configure a CSP for the actual production integrations rather than inventing one now.

Deploy later with a Next.js-compatible host such as Vercel, using Node 24, `npm ci`, and `npm run build`. A Node host runs `npm start`; this is not a static-only export because `/api/health` is a server endpoint. No deployment, GitHub remote creation, or push is performed in this phase.

## Validation

Run the following after dependency or source changes:

```bash
npm run typecheck
npm run lint
npm run build
npm run dev
```

Check `/`, `/api/health`, desktop/mobile layout, native mobile menu, skip link, overflow, local image loading, and preview control states. The recorded setup results are in `docs/initialization-report.md`.

## Recommended development order

1. Define category/place schemas, content ownership, verification rules, and source provenance; include criteria for emergency and transport information.
2. Design database migrations, public read policies, admin/business roles, authorization, and storage permissions; then integrate Supabase.
3. Build a read-only directory and place details using verified records, with empty/loading/error states.
4. Add validated search, categories, pagination and filters, then the MapLibre island map.
5. Add authentication and administration, followed by business ownership and management workflows.
6. Add booking inquiries/external reservation links; design moderation before adding reviews and ratings.
7. Add Indonesian localization, monitoring, performance/accessibility checks, and deployment automation before launch. Design payments separately if needed.
