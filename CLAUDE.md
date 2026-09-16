# mkm-site

Static Astro site for MKM Structural Steel (mkm.au). See README.md for stack,
deploy and content-editing docs.

- Code map: graphify graph (`graphify-out/`) is the canonical code map — run
  `/graphify` to build it if missing; `graphify update` after changes.
- Content lives in `src/content/` + `src/data/site.json`, edited by the client
  via Pages CMS (`.pages.yml`). Keep schema changes in sync across
  `src/content.config.ts` AND `.pages.yml`.
- Design tokens in `src/styles/global.css` (light theme, MKM brand: navy
  `#27235D` rgb(39,35,93), grey `#666`, black; navy `.blueprint` sections for
  map/process). Fonts: Big Shoulders (display), Barlow (body), IBM Plex Mono
  (labels).
- Fully static: no SSR adapter, no Pages Functions. `/contact` is phone + email
  from `src/data/site.json` — the SMTP contact form was removed (see README for
  how to restore it).
