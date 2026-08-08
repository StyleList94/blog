# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Serve the production build
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm lint         # oxlint
pnpm lint:fix     # oxlint --fix
pnpm format       # oxfmt
pnpm format:check # oxfmt --check
pnpm typegen      # Generate Next.js typed routes
```

Run a single test file:

```bash
pnpm vitest run src/components/__tests__/post-card.test.tsx
```

## Architecture

Next.js 16 App Router blog with React 19 and Tailwind CSS 4.

```text
src/
├── app/           # App Router (pages, layouts, metadata)
│   ├── (main)/    # Main route group
│   ├── post/      # Blog post dynamic routes (+ loading.tsx shell)
│   └── *.ts(x)    # error, not-found, robots, sitemap, rss.xml/route
├── assets/        # Fonts (local Pretendard woff2 files)
├── components/    # React components with colocated __tests__/
├── hooks/         # Custom React hooks
├── lib/           # Utilities and services
│   └── services/  # Data fetching (post service)
├── providers/     # App/animation providers (next-themes, LazyMotion)
├── styles/        # Global CSS (Tailwind theme, font variables)
└── types/         # Shared type definitions (Post, PostList)
posts/             # Markdown posts with gray-matter frontmatter
```

## Key Patterns

**UI components**: `@stylelist94/nine-beauty-actress` provides layout primitives (header, footer containers) and toggle components.

**Blog posts**: Markdown files in `/posts` with frontmatter (title, description, date, lastModified, series). Loaded through `import.meta.glob` in `src/lib/services/post.ts` (no filesystem access), parsed with gray-matter, rendered with react-markdown + rehype plugins.

**Cache Components**: Enabled via `cacheComponents` in `next.config.ts`. Every post is prerendered by `generateStaticParams`; unknown slugs get the App Shell from `src/app/post/[slug]/loading.tsx`.

**Build config** (`next.config.ts`): `reactCompiler` runs through Turbopack's Rust port, so no Babel plugin is needed. `experimental.useTypeScriptCli` is required for TypeScript 7 — without it `next build` skips type checking, since TS7 ships no JS compiler API.

**Path alias**: `@/*` maps to `./src/*`

**Images**: Hosted on Cloudinary (`res.cloudinary.com/stylish-storage`)

**Code highlighting**: Shiki with transformers in `code-block.tsx`

**Fonts**: Pretendard (local, sans) and Geist Mono (Google, mono/display). Defined in `src/assets/fonts/index.ts`, mapped to CSS variables in `src/styles/global.css`.

**Metadata**: Centralized in `src/lib/metadata.ts` (`metadataContext`). OG/Twitter images are file-based (`src/app/opengraph-image.png`, `src/app/twitter-image.png`).

**Brand text**: `stylish.log` appears in the footer (`src/components/brand-link.tsx`), not-found, and error pages with identical styling (`font-display text-base`, `.log` in `text-sm`). On Hangul Day the footer swaps it for `맵시.일기`.

## Testing

Vitest + @testing-library/react. Test files colocated in `__tests__/` next to components.

To inspect a loading shell, open Next.js DevTools → Navigation Inspector → _Pause on navigations_, then reload or click a link. Requires `cacheComponents`, which is already on.

## Code Style

oxlint (`.oxlintrc.json`) + oxfmt. Pre-commit runs lint-staged via Husky.

Route handlers are exempt from `import/prefer-default-export` — the framework requires named exports (`GET`, `POST`, ...).

## Environment

`.env.local` contains `NEXT_PUBLIC_ENV` (dev/prod).

## PR Review Guidelines

- Check accessibility: `aria-label`, `aria-hidden`, semantic HTML
- Font changes must update both `src/assets/fonts/index.ts` and `src/styles/global.css`
- Metadata changes must go through `src/lib/metadata.ts`, not hardcoded
- Ensure tests pass and cover changed components
- Check changed posts for typos, broken links, and frontmatter correctness

## Gotchas

- Must use `pnpm` (lockfile: `pnpm-lock.yaml`)
- `@types/react` is pinned to `19.2.18` via `pnpm-workspace.yaml` `overrides` (and `package.json`) to keep a single copy across the Radix UI tree pulled in by `@stylelist94/nine-beauty-actress`. Bump the version in both places together; don't remove the override.
- Post loading needs three options together: `base` (Turbopack's glob cannot match `../` patterns), `query: '?raw'` (Vite/vitest), and `turbopack.rules` `type: 'bytes'` (Turbopack ignores `query`). Moving `posts/` or the service file yields zero posts with no error.
- Reading the clock or request data in anything the layout renders drops **every** page out of the static shell. Keep such checks on the client — see `src/components/brand-link.tsx`.
- Test async Server Components by calling them directly: `render(await Page())`. Rendering them through a parent fails in vitest.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
