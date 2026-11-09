# Iventworks Website

Website und Dokumentation von [Iventworks](https://www.iventworks.de), der Plattform für Freizeiten,
Camps und Events. Die App selbst liegt in [Iventworks/App](https://git.leicraftmc.de/Iventworks/App).

Gebaut nach dem LeiCraftMC Style Guide, Vorlage `static-site-with-docs`.

## Stack

- Nuxt 4 (`app/` srcDir), statisch generiert (`nuxt generate`)
- NuxtUI v4 + Tailwind v4 (CSS-first), dark-only, Primärfarbe `fuchsia`
- `@nuxt/content` für die Dokumentation in `content/docs/`
- Biome, Bun, AGPL-3.0

## Setup

```bash
bun install
bun run dev   # http://localhost:12541
```

## Inhalte

| Was | Wo |
| --- | --- |
| Seiten (Start, Funktionen, Sicherheit, Hosting, Kontakt) | `app/pages/` |
| Texte, die mehrere Seiten teilen (Sicherheits-Säulen, Cloud/Self-Hosting) | `app/data/site.ts` |
| Kontakt-Adresse, Cloud-URL, externe Links | `app/data/links.ts` |
| Dokumentation | `content/docs/**/*.md` + Navigation in `app/data/docs.ts` |
| Logos und Favicons (aus dem Iventworks-Brand-Kit) | `public/static/logo/`, `public/favicon.ico` |
| Screenshots in den Laptop-/Handy-Rahmen | `public/static/screenshots/` + `app/data/screenshots.ts` |

### Screenshots

Die Laptop- und Handy-Rahmen auf der Startseite und der Funktionen-Seite zeigen Screenshots der App
aus `public/static/screenshots/`:

| Datei | Größe | Zeigt |
| --- | --- | --- |
| `laptop-freizeit.webp` | 2560 × 1600 (16:10) | Übersicht der Freizeit „Sommercamp 2027“ im Browser |
| `handy-freizeit.webp` | 891 × 1977 (ca. 9:19,5) | dieselbe Übersicht auf dem Handy |

Welche Bilder wo erscheinen und ihre Alt-Texte stehen in `app/data/screenshots.ts`. Neue Screenshots
am besten als verlustfreies WebP ablegen (`cwebp -lossless -z 9 bild.png -o bild.webp`):
bei Screenshots von Oberflächen ist das schärfer und meist sogar kleiner als verlustbehaftetes WebP.

### Neue Docs-Seite

1. `.md`-Datei unter `content/docs/` anlegen (Frontmatter: `title`, `description`, `navigation.title`).
2. Seite in `app/data/docs.ts` eintragen (Seitenleiste, Zurück/Weiter).
3. URL in `public/static/utils/sitemap.xml` ergänzen.

`bun test` prüft, dass Docs-Dateien, Navigation und Sitemap zusammenpassen und alle internen Links
auf existierende Seiten und Überschriften zeigen.

## Generieren und deployen

```bash
bun run generate   # → .output/public/
```

Auf dem Default-Branch generiert GitLab CI (`.gitlab/ci/build.yml`) die Seite und überträgt
`.output/public/` per rsync (`.gitlab/ci/deploy.sh`). Benötigte CI-Variablen:
`DEPLOY_REMOTE_USER`, `DEPLOY_REMOTE_PASSWORD`, `DEPLOY_REMOTE_HOST`, `DEPLOY_REMOTE_DIR`.
`public/.htaccess` konfiguriert Apache (saubere URLs, ohne Slash am Ende, 404-Seite).

## Scripts

- `bun run dev` – Dev-Server auf Port 12541
- `bun run generate` – statische Seite erzeugen
- `bun run typecheck` – TypeScript prüfen
- `bun run check` / `bun run format` – Biome
- `bun test` – Tests

## Lizenz

AGPL-3.0
