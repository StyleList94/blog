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
├── components/    # React components with colocated __tests__/
├── lib/           # Utilities and services
│   └── services/  # Data fetching (post service)
├── hooks/         # Custom React hooks
└── providers/     # Theme provider (next-themes)
posts/             # Markdown posts with gray-matter frontmatter
```

## Key Patterns

**Blog posts**: Markdown files in `/posts` with frontmatter (title, description, date, lastModified, series). Parsed with gray-matter, rendered with react-markdown + rehype plugins.

**Path alias**: `@/*` maps to `./src/*`

**Images**: Hosted on Cloudinary (`res.cloudinary.com/stylish-storage`)

**Code highlighting**: Shiki with transformers in `code-block.tsx`

## Code Style

Uses custom shared config `eslint-config-stylish`. Pre-commit runs lint-staged via Husky.

## Environment

`.env.local` contains `NEXT_PUBLIC_ENV` (dev/prod).
