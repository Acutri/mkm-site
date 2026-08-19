# MKM Structural Steel — mkm.au

Static site for MKM Structural Steel. Astro + Leaflet, edited via
[Pages CMS](https://pagescms.org), hosted on Cloudflare Pages, contact form via
a Cloudflare Pages Function → Google Workspace SMTP.

## Stack

| Piece | Choice |
|---|---|
| Framework | Astro (static output) |
| Content | Markdown/JSON in `src/content` + `src/data`, edited via Pages CMS (`.pages.yml`) |
| Project map | Leaflet + OpenStreetMap + markercluster, data from `/projects.json` |
| Hosting | Cloudflare Pages (build `npm run build`, output `dist`) |
| Contact form | `functions/api/contact.ts` (Pages Function, SMTP via worker-mailer) |

## Local dev

```sh
npm install
npm run dev          # site at localhost:4321 (contact form POST won't work here)
npm run build        # static build to dist/
npx wrangler pages dev dist   # test WITH the contact form function (.env needed)
```

## Deploy — Cloudflare Pages (one-time setup)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. Build command `npm run build`, output directory `dist`. Deploy.
3. **Custom domain**: add `mkm.au` (and `www.mkm.au`) to the Pages project.
   Requires mkm.au's DNS to be on Cloudflare (free plan fine).
4. **Env vars** (Settings → Environment variables, Production, all *secrets*):
   see `.env.example` — `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`.
5. **Old domain redirect**: Cloudflare → mkmstructural.com.au zone → Rules →
   Redirect Rules → dynamic redirect: all requests → `https://mkm.au` (301).

Every push to `main` auto-builds and deploys. PRs get preview URLs.

## Google Workspace SMTP (contact form)

1. In Google Admin, ensure 2-Step Verification is allowed/enabled for the sending account (e.g. `website@mkm.au`).
2. That account → myaccount.google.com → Security → App passwords → create one for "Mail".
3. Use it as `SMTP_PASS` with `SMTP_USER` = the account email, host `smtp.gmail.com`, port `465`.

Alternative if app passwords are blocked: Google Admin → Apps → Google Workspace →
Gmail → Routing → SMTP relay service (`smtp-relay.gmail.com`).

## Content editing (Callan's admin portal)

1. Go to **https://app.pagescms.org**, sign in with GitHub (account needs access to this repo).
2. Open the repo — the admin UI comes from `.pages.yml`:
   - **Projects** — add/edit projects, upload photos, set the **"Show on the project map"** toggle, lat/lng (right-click the location in Google Maps → click the coordinates to copy), feature on homepage, or hide entirely (draft).
   - **Staff profiles** — add/remove people, photos, bios.
   - **About page** — the story text.
   - **Site settings** — phone, email, address, ABN, homepage stats, service descriptions.
3. Saving commits to `main` → Cloudflare rebuilds → live in ~1–2 minutes.

Photo guidance: JPG/WebP, ~1600px wide is plenty. Sample content is marked
*"Sample content — replace via the admin portal"* — delete it once real
projects are in.

## Repo map

```
.pages.yml               Pages CMS (admin UI) definition
functions/api/contact.ts contact form handler (Cloudflare Pages Function)
public/uploads/          CMS-managed images
src/content/projects/    one .md per project (frontmatter + description)
src/content/staff/       one .md per team member
src/content/pages/       about page text
src/data/site.json       contact details, stats, services
src/pages/               routes (home, projects, projects/[slug], about, contact)
src/pages/projects.json.ts  map pin data endpoint (built statically)
src/components/          header/footer/cards/map/form
src/styles/global.css    design tokens + base styles
```
