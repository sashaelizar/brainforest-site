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

## 8. Comments, likes, and live view counts (raised 2026-07-10)

**Views — done.** Turns out the historical numbers *were* recoverable: Wix's raw page source
never has them (loaded in by their app after the page loads), but a real browser rendering the
live page shows them in plain text. Visited all 42 live posts on brainforest.org with a real
browser and read off the actual view/comment/like numbers for each — saved to
`src/data/legacy-stats.json`. Built `ArticleStats.astro`, shown at the bottom of every article,
displaying that legacy number. Added `netlify/functions/track-view.js`, a Netlify Function using
**Netlify Blobs** (built into Netlify — no extra account/service) that counts new views going
forward; the displayed total is legacy + live, added together client-side.
- [x] Legacy views/comments/likes pulled from the live site for all 42 posts (2026-07-10)
- [x] Stats display built and verified locally (shows the correct legacy numbers, e.g. 409 for
      the leaky-gut-symptoms post, matching the live site exactly)
- [x] Live-counter function written (`netlify/functions/track-view.js`)
- [ ] **Needs Netlify actually connected/deployed to work** — the live half of the counter can't
      run locally (`astro dev` has no Netlify Functions runtime), so right now every article
      correctly shows its legacy number and silently stays there. Once deployed, new visits will
      start adding to it automatically, no further action needed.

**Comments — not started.** The legacy *counts* are captured above, but not the actual comment
text/authors (would need scraping each post's comment thread specifically, not done). For a live
commenting system going forward: **Giscus** (free, backed by GitHub Discussions, no ads) is the
best fit here since everything else is already on GitHub. Not built yet — needs a scope decision
first: do we want the old comment text migrated too, or just start fresh with Giscus going
forward and let the historical comment *count* (already captured) stand as the record?

**Likes — legacy count captured, no live "like" button built.** Sasha didn't ask for a live like
button this round, just the historical number, which is already showing. If a live like button is
wanted later, same pattern as views: a small Netlify Function + Blobs.

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
