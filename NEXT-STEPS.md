# Next Steps — Getting the new site to full Wix parity

Status: **the content + design preview is done and faithful.** What remains is wiring up the
"living" features Wix did for her automatically — forms, subscribers, analytics, SEO submission,
hosting, and the domain. Nothing here is hard; it's mostly picking services and connecting them.

This file is written so Sasha (or her AI assistant) can walk through it top to bottom.

---

## Already done ✅
- All **42 articles** exported off Wix with images, bylines, categories, citations, and formatting preserved
- Rebuilt as a fast, free-to-host **Astro** site: home, articles, per-article pages, categories, about, podcast, contact
- **SEO basics** already in the code: meta descriptions, Open Graph + Twitter cards, canonical URLs, `BlogPosting` structured data, `sitemap-index.xml`, `robots.txt`
- **Lead-magnet landing page** built as a demo (`/ebook/leaky-gut-causes`) with the opt-in form
- Per-article **topic navigation**, **related posts**, and **guest-author bylines**

---

## 1. Forms & email capture (the opt-in + contact)
Wix handled form submissions for her. A static site needs a form handler.
- **Easiest first step: Netlify Forms** (free tier). The forms are already marked up for it
  (`data-netlify="true"`). Once hosted on Netlify, submissions show up in her Netlify dashboard
  and can email her on each entry. Covers both the **ebook opt-in** and a **contact form**.
- **What's needed:**
  - [ ] Deploy to Netlify (see §5) so the forms go live
  - [ ] Turn on form notifications (email her on each submission)
  - [ ] Wire the **contact page** to a real form (currently links only)
  - [x] **Ebook PDF found** (`Leaky Gut Causes EBook.pdf` in Downloads) and copied into the project
        at `public/downloads/leaky-gut-causes-ebook.pdf`
  - [ ] **Ebook delivery**: wire the opt-in to actually send the PDF automatically once ConvertKit
        forms exist (see `CONVERTKIT-SETUP.md`)
  - [ ] Add the **real ebook cover** image (currently using the article cover as a stand-in)

## 2. Subscribe / newsletter (this replaces Wix's "subscribe to the blog")
On Wix, readers could subscribe via a "Stay in the know" box at the bottom of every post. We're
recreating that with **ConvertKit** (chosen 2026-07-09).

- [x] **Subscribe box built** — matches the original Wix wording exactly, live at the bottom of
      every article. Currently submits via Netlify Forms as a working placeholder.
- [x] **Email provider chosen: ConvertKit (Kit)** — see `CONVERTKIT-SETUP.md` for the step-by-step
      account setup Sasha needs to do herself (can't be done by the AI — needs her own login).
- **What's needed:**
  - [ ] Sasha creates the two ConvertKit forms per `CONVERTKIT-SETUP.md` and sends the embed codes
  - [ ] Swap the subscribe box + ebook opt-in over from the Netlify Forms placeholder to the real
        ConvertKit forms
  - [ ] Add an **RSS feed** to the site (`@astrojs/rss` — quick add) so ConvertKit can auto-notify
        subscribers of new posts (RSS-to-email), closest match to Wix's old behavior
  - [ ] Decide manual vs. automatic new-post emails
  - [ ] Import the existing Wix email list once exported (see main chat for Wix export steps) —
        no export existed in the local backup, Sasha needs to pull it from the Wix dashboard herself

## 3. Analytics (replace her Wix analytics)
- **Pick an engine** (a placeholder is already wired in the code — set two env vars and it turns on):
  - **Plausible / Umami** — privacy-friendly, lightweight, no cookie banner *(recommended)*
  - **Google Analytics 4** — free, most familiar, but heavier + needs a cookie-consent banner
  - **Netlify Analytics** — server-side, no script, ~$9/mo, no cookie banner
- **What's needed:**
  - [ ] Choose one, create the account, set `PUBLIC_ANALYTICS_SRC` + `PUBLIC_ANALYTICS_DOMAIN`
  - [ ] Confirm data is flowing after launch

## 8. Comments, likes, and live view counts (raised 2026-07-10, not started)
Sasha wants to display, per article: carried-over historical comments/likes/views from Wix, plus
a live, continuously-updating view counter going forward. Research so far:

- **The Wix content backup has none of this data.** Checked `brainforest-backup/` and the raw HTML
  page captures — comments/likes/views on Wix are loaded live via Wix's own app at page-view time,
  not baked into the page, so the static export never captured actual numbers or comment text
  (only found leftover CSS class names from Wix's comment widget, no real data). **To carry over
  real historical numbers, someone needs to pull them from Wix directly** — either the Wix
  dashboard's own analytics/comments panel (manual, per post) or Wix's API (needs Sasha's Wix
  developer access) — before the Wix account is cancelled. Flag this urgently if she wants the old
  numbers preserved, since they disappear once Wix is cancelled.
- **Going forward, this is a static site with no built-in database**, so each piece needs its own
  solution:
  - **Live view counts**: realistic with **Umami** (the tool Sasha mentioned) — it's free
    (self-hosted) or has a free-tier cloud option, privacy-friendly, no cookie banner. Showing a
    *live number on the page itself* (not just in a private dashboard) needs one extra piece: a
    small Netlify Function that asks Umami for the current count and hands it back to the page.
    Buildable, not hard, but not yet started.
  - **Likes**: needs somewhere to store the count (static sites don't have a database by default).
    Realistic free option: a lightweight backend like Supabase (free tier) or a small Netlify
    Function + Netlify Blobs. Buildable, medium effort.
  - **Comments**: needs a commenting system since Wix's is Wix-only. Common free options: **Giscus**
    (free, backed by GitHub Discussions, no ads) or **Disqus** (free tier, but shows ads). Giscus is
    the better fit here given everything else is already on GitHub.
- **What's needed:**
  - [ ] Sasha decides whether pulling historical Wix numbers is worth the manual effort before
        cancelling Wix (they cannot be recovered after)
  - [ ] Pick a comments tool (Giscus recommended) and wire it into the per-article page only (not
        thumbnails/cards, per Sasha's request)
  - [ ] Pick a likes/storage approach and build the counter
  - [ ] Wire up Umami + a small live-view-count display on each article

## 4. SEO — finish the job
- [ ] After launch, submit `sitemap-index.xml` to **Google Search Console** (and Bing Webmaster)
- [ ] Set up 301 **redirects** for any old Wix URLs that change (our slugs already mirror the originals,
      so most `/post/<slug>` and category URLs carry over — just verify)
- [ ] Confirm canonical domain (brainforest.org, www vs non-www) once the domain is connected
- [ ] Let Sasha edit each post's **excerpt** (the Google snippet) and **share image** easily

## 5. Hosting — Netlify (free)
- [x] **Netlify account created by Sasha** (2026-07-10) — not yet connected to the repo
- [ ] Put this project on **GitHub** (see `FOR-SASHA.md`) — GitHub CLI authenticated, repos not yet
      created/pushed
- [ ] Connect the GitHub repo to **Netlify** — it auto-builds (`npm run build`) and deploys on every change
- [ ] Verify the live preview URL looks right

**Images/CDN question (raised 2026-07-10):** Sasha wants images NOT stored in the git repo, and
asked about Netlify's CDN limits/cost. Findings:
- Everything Netlify hosts (including anything in `public/`, where the article images already
  live) is automatically served through Netlify's global CDN — this isn't a separate product to
  set up, it's just how Netlify hosting works. No extra step needed for "images on a CDN."
- Free tier is 100GB bandwidth/month, which is a lot of headroom for a blog like this one — very
  unlikely to be exceeded or to incur a surprise charge. (Worth double-checking Netlify's current
  published limits before launch, since these do shift over time.)
- Current image folder is **108MB** — small by GitHub's standards (their soft guidance is to stay
  under a few GB), so keeping images in this git repo is genuinely fine at this scale, not a real
  risk.
- If Sasha still prefers images fully out of git regardless: the cleaner alternative is a dedicated
  image host like **Cloudinary** (free tier ~25GB storage/bandwidth, auto-optimizes images) —
  upload images there instead of `public/images/`, reference them by URL. More moving parts (a
  service to manage, images uploaded outside the normal publish flow), so worth a real decision
  before switching off the current simple approach.
- **Not yet decided** — needs Sasha's call next session.

## 6. Domain — point Bluehost at the new site
Her domain lives at **Bluehost**. To make brainforest.org show the new site:
- [ ] In Netlify: add the custom domain `brainforest.org`
- [ ] In Bluehost DNS: update the records Netlify tells you to (either point the nameservers to Netlify,
      or set an `A` record / `CNAME` as Netlify instructs)
- [ ] Wait for DNS to propagate, enable HTTPS (Netlify does this free)
- [ ] **Only cancel Wix after** the new site is live on the domain and verified

## 7. Publishing workflow (how she adds new posts later)
- [x] **Decided (2026-07-09): Word document handoff.** Sasha writes in Word with images placed
      exactly where she wants them; her AI converts the doc into the site's format, places images,
      and shows a preview before publishing. Full steps in `HOW-TO-PUBLISH-ARTICLES.md`.
- [ ] Run one real article through the pipeline to confirm it feels right end to end

## Open decisions
- [ ] Design direction — current cream/green look is our interpretation; refine toward her taste
- [ ] Any **other lead magnets/freebies** beyond the leaky-gut ebook that need landing pages
- [ ] Whether to *also* cross-post to Substack purely for distribution (optional, not required)

## 9. Email list cleanup + import (2026-07-10)
- [x] Sasha exported her Wix contacts to `~/Downloads/contacts.csv` (1,745 rows) and asked for a
      bot pass before importing to ConvertKit
- [x] Ran a bot-detection pass: **1,623 of 1,745 rows were spam/bot signups** (mostly an Indonesian
      gambling-spam bot flood hitting Wix's public "site member" signup — very common on Wix
      sites). Kept **122 likely-real contacts**. Two new files written, original untouched:
      `~/Downloads/contacts-real-likely.csv` (keep) and `~/Downloads/contacts-flagged-as-bot.csv`
      (for spot-checking, with a reason column)
  - Worth a quick manual skim of `contacts-real-likely.csv` before import — heuristics, not
    certainty
  - **3 of the 122 are marked "Unsubscribed"** — real people, correctly not bots, but should be
    excluded from any new ConvertKit import/email since they already opted out
- [ ] Sasha imports `contacts-real-likely.csv` into ConvertKit herself (no ConvertKit MCP connector
      exists yet — checked the registry 2026-07-10, came up empty — so this is manual for now, or
      via a ConvertKit API key later, see `Reference/Glossary.md` in cockpit)

## 10. Automation follow-ups (2026-07-10)
- [ ] No MCP connector found for ConvertKit or Netlify (checked registry, empty results). Both
      have plain APIs Sasha can generate a key for later, which her AI can then use directly — see
      `Reference/Glossary.md` in cockpit for what an API key is and how that would work
- [ ] Sasha created both her Netlify and ConvertKit accounts (2026-07-10) — forms/connection setup
      still pending, see §2 and §5 above
