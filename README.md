# MKM Structural Steel — mkm.au

Static site for MKM Structural Steel. Astro + Leaflet, edited via
[Pages CMS](https://pagescms.org), hosted on Cloudflare Pages. Fully static —
no Functions, no server-side anything.

## Stack

| Piece | Choice |
|---|---|
| Framework | Astro (static output) |
| Content | Markdown/JSON in `src/content` + `src/data`, edited via Pages CMS (`.pages.yml`) |
| Project map | Leaflet + OpenStreetMap + markercluster, data from `/projects.json` |
| Hosting | Cloudflare Pages (build `npm run build`, output `dist`) |
| Contact | Phone + email on `/contact` (no form — see below) |

## Local dev

```sh
npm install
npm run dev          # site at localhost:4321
npm run build        # static build to dist/
npm run preview      # serve the built output
```

## Deploy — Cloudflare Pages (one-time setup)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. Build command `npm run build`, output directory `dist`. Deploy.
3. **Custom domain**: add `mkm.au` (and `www.mkm.au`) to the Pages project.
   Requires mkm.au's DNS to be on Cloudflare (free plan fine).
4. **Env var**: `NODE_VERSION` = `22.12.0` (plaintext) — Astro 7 requires Node >= 22.12.
5. **Old domain redirect**: Cloudflare → mkmstructural.com.au zone → Rules →
   Redirect Rules → dynamic redirect: all requests → `https://mkm.au` (301).

Every push to `main` auto-builds and deploys. PRs get preview URLs.

## Contact page

`/contact` lists phone and email only — no form, so there are no secrets, no
SMTP account and no Pages Functions to configure. Phone, email, address and ABN
all come from `src/data/site.json` (editable in the admin portal).

To bring the form back: it lived in `src/components/ContactForm.astro` +
`functions/api/contact.ts` (Pages Function → Google Workspace SMTP via
worker-mailer). Recover with `git log --diff-filter=D --oneline -- functions`,
then `git checkout <commit>^ -- functions .env.example src/components/ContactForm.astro`.
It needs the `nodejs_compat` compatibility flag plus five SMTP secrets.

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
public/uploads/          CMS-managed images
src/content/projects/    one .md per project (frontmatter + description)
src/content/staff/       one .md per team member
src/content/pages/       about page text
src/data/site.json       contact details, stats, services
src/pages/               routes (home, projects, projects/[slug], about, contact)
src/pages/projects.json.ts  map pin data endpoint (built statically)
src/components/          header/footer/cards/map
src/styles/global.css    design tokens + base styles
```
