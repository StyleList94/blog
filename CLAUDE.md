# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (webpack mode)
pnpm build        # Production build
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm typegen      # Generate Next.js typed routes
```

Run a single test file:

```bash
pnpm vitest run src/components/__tests__/pagination.test.tsx
```

## Architecture

Next.js 16 App Router blog with React 19 and Tailwind CSS 4.

```text
src/
├── app/           # App Router (pages, layouts, metadata)
│   ├── (main)/    # Main route group
│   └── post/      # Blog post dynamic routes
├── assets/        # Fonts (local Pretendard woff2 files)
├── components/    # React components with colocated __tests__/
├── hooks/         # Custom React hooks
├── lib/           # Utilities and services
│   └── services/  # Data fetching (post service)
├── providers/     # Theme provider (next-themes)
└── styles/        # Global CSS (Tailwind theme, font variables)
posts/             # Markdown posts with gray-matter frontmatter
```

## Key Patterns

**UI components**: `@stylelist94/nine-beauty-actress` provides layout primitives (header, footer containers) and toggle components.

**Blog posts**: Markdown files in `/posts` with frontmatter (title, description, date, lastModified, series). Parsed with gray-matter, rendered with react-markdown + rehype plugins.

**Path alias**: `@/*` maps to `./src/*`

**Images**: Hosted on Cloudinary (`res.cloudinary.com/stylish-storage`)

**Code highlighting**: Shiki with transformers in `code-block.tsx`

**Fonts**: Pretendard (local, sans) and Geist Mono (Google, mono/display). Defined in `src/assets/fonts/index.ts`, mapped to CSS variables in `src/styles/global.css`.

**Metadata**: Centralized in `src/lib/metadata.ts` (`metadataContext`). OG/Twitter images are file-based (`src/app/opengraph-image.png`, `src/app/twitter-image.png`).

**Brand text**: `stylish.log` appears in header, not-found, and error pages with identical styling (`font-display text-xl`, `.log` in `text-lg`).

## Testing

Vitest + @testing-library/react. Test files colocated in `__tests__/` next to components.

## Code Style

Uses custom shared config `eslint-config-stylish`. Pre-commit runs lint-staged via Husky.

## Environment

`.env.local` contains `NEXT_PUBLIC_ENV` (dev/prod).

## Gotchas

- Must use `pnpm` (lockfile: `pnpm-lock.yaml`)
- `@types/react` is pinned to `19.2.10` to match peer dependencies
