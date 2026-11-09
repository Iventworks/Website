# AGENTS.md — operating manual for AI coding agents

You are working on the Iventworks website and docs, a LeiCraftMC static site with docs. Follow the
LeiCraftMC Style Guides: https://git.leicraftmc.de/LeiCraftMC/Style-Guides.

## Must read

- [docs/00-overview.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/00-overview.md)
- [docs/06-frontend-nuxt.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/06-frontend-nuxt.md)
- [docs/15-design-system.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/15-design-system.md)

## Non-negotiable

- Nuxt 4 `app/` srcDir.
- Tailwind v4 CSS-first; no `tailwind.config.js`. Dark-only (no toggle).
- `nitro: { preset: "static" }`.
- No `useAPI` / `api-client/` / `auth.global.ts` / `AbstractStore` — this shape has no backend.
- Use the `usePageSeo` composable for per-page SEO (+ JSON-LD), not inlined `useSeoMeta`.
- `@tailwindcss/typography` for prose content; static data in `app/data/`.
- Lucide icons only (`i-lucide-*`).
- Accents use `primary-*` (fuchsia, the app's default org colour); `neutral: slate`.
- Format with Biome before finishing.
- Conventional Commits.

## Iventworks specifics

- **All visible text is German.** Marketing pages address the organisation with „ihr/euch“; how-to
  steps in the docs address the reader with „du“. Nuxt UI's own labels come from the `de` locale on
  `<UApp>` (`app.vue`, `error.vue`).
- Only state what the app actually does. Check claims against the Iventworks/App repo (README,
  `server/`, `app/pages/`) before adding them.
- Contact address and external URLs live in `app/data/links.ts`.
- Logos come from the Iventworks brand kit (`public/static/logo/`); don't redraw them.
- The laptop/phone frames (`components/device/Showcase.vue`) show images from
  `app/data/screenshots.ts`. Don't recreate app screens in HTML.

## Docs

- Add new docs as `.md` files in `content/docs/`.
- Update `app/data/docs.ts` when adding or removing docs pages (sidebar + prev/next), and
  `public/static/utils/sitemap.xml`. `tests/docs.test.ts` and `tests/links.test.ts` enforce this.
- Label code blocks with a file name or extension from `app/data/code-icons.ts`, or a plain label
  without a dot (`[Terminal]`); `tests/code-icons.test.ts` fails otherwise.
