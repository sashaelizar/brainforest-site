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

## 4. SEO — finish the job
- [ ] After launch, submit `sitemap-index.xml` to **Google Search Console** (and Bing Webmaster)
- [ ] Set up 301 **redirects** for any old Wix URLs that change (our slugs already mirror the originals,
      so most `/post/<slug>` and category URLs carry over — just verify)
- [ ] Confirm canonical domain (brainforest.org, www vs non-www) once the domain is connected
- [ ] Let Sasha edit each post's **excerpt** (the Google snippet) and **share image** easily

## 5. Hosting — Netlify (free)
- [ ] Put this project on **GitHub** (see `FOR-SASHA.md`)
- [ ] Connect the GitHub repo to **Netlify** — it auto-builds (`npm run build`) and deploys on every change
- [ ] Verify the live preview URL looks right

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
