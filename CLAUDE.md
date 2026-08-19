# mkm-site

Static Astro site for MKM Structural Steel (mkm.au). See README.md for stack,
deploy and content-editing docs.

- Code map: graphify graph (`graphify-out/`) is the canonical code map — run
  `/graphify` to build it if missing; `graphify update` after changes.
- Content lives in `src/content/` + `src/data/site.json`, edited by the client
  via Pages CMS (`.pages.yml`). Keep schema changes in sync across
  `src/content.config.ts` AND `.pages.yml`.
- Design tokens in `src/styles/global.css` (dark industrial: steel charcoals,
  logo navy `#27235e`, weld accent `#d9832b`). Fonts: Big Shoulders (display),
  Barlow (body), IBM Plex Mono (labels).
- `dist/` output must stay fully static except `functions/` (Cloudflare Pages
  Functions). No SSR adapter.
- Contact form envs: see `.env.example`; set as Cloudflare Pages secrets.
