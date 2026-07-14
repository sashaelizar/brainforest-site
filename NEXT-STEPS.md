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
  - [x] **Contact page wired to a real form** (2026-07-14) — name, email, message, same Netlify
        Forms pattern as the other forms
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

**Comments — legacy text mostly done, live system built and waiting on Sasha's GitHub App
install.** The public Wix page never actually rendered the comment thread widget (just the
count), even scrolling/waiting — so Sasha pulled the real text/author/date/likes herself from the
Wix Comments moderation dashboard (2026-07-10). 7 of 9 known comments captured and now displaying
at the bottom of their articles (`src/data/legacy-comments.json`, rendered by `CommentsList.astro`).
- [ ] **2 comments still missing** on `fecal-microbiota-transplants-healthspan` — the counter
      shows 2 comments but none were retrieved yet; check the Wix dashboard for that post
- [x] **Live commenting built (2026-07-14): Giscus**, confirmed with Sasha as the pick (free,
      GitHub Discussions-backed, no ads). GitHub Discussions turned on for the repo.
      `GiscusComments.astro` added below the legacy comments on every article — stays invisible
      until `PUBLIC_GISCUS_REPO_ID` + `PUBLIC_GISCUS_CATEGORY_ID` are set, so it shipped safely
      with zero visible change today.
  - [ ] Sasha: install the giscus GitHub App, create the "Comments" discussion category, grab the
        two IDs from giscus.app, set them in Netlify — full steps in `GISCUS-SETUP.md`

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
- [x] **Project pushed to GitHub** (2026-07-14) — public repo at
      `github.com/sashaelizar/brainforest-site`. Public was a deliberate choice: giscus (see §8)
      needs it.
- [ ] **Connect the GitHub repo to Netlify** — needs Sasha's own login (Netlify dashboard → Add
      new site → Import from GitHub → pick `brainforest-site`). Auto-builds (`npm run build`) and
      deploys on every push after that. **This one click unblocks the CMS (§7) and live comments
      (§8) below** — both are built and waiting on it.
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
- [x] **Self-serve editor added (2026-07-14), requested so minor edits don't need an AI session.**
      Decap CMS at `/admin`, git-gateway backend, fields matching the post schema. Article body is
      a raw-text field on purpose (Wix-exported HTML, risk of corruption under a WYSIWYG editor).
      Config verified locally (loads, parses, shows login screen); full login needs Netlify
      Identity + Git Gateway turned on, which needs Sasha's login — see `CMS-SETUP.md`.
      This is now a second option alongside the Word-doc handoff above: Word/AI for new articles
      with careful image placement, the editor for quick text-only fixes to existing ones.

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

## 11. Content/formatting cleanup pass (2026-07-13 – 2026-07-14)
- [x] Fixed the outline/jump-nav underline bug at its real root cause (the `<a>` tag's own default
      underline, not the nested `<u>` — site-wide fix, applies to every article automatically)
- [x] Found and fixed 13 articles where the cover photo was duplicated as an inline body image —
      5 had a meaningful alt/caption, which is now preserved as a `heroCaption` frontmatter field
      shown under the hero image (see `content.config.ts` + `post/[slug].astro`)
- [x] Made References/Resources/Further Reading headings H1-sized site-wide, enlarged + realigned
      the collapse caret
- [x] Rewrote the citation-jump-to-reference JS to manually control scroll timing (open the
      `<details>`, force a layout recalc, then scroll) instead of relying on the browser's default
      anchor behavior, which can race with the details still expanding
- [x] Embedded real players: Spotify episode on we-are-water, Spotify episode on
      sars-cov-2-nutrition (swapped to the specific episode Sasha provided), YouTube video on
      leaky-gut-anatomy (ID recovered from a thumbnail URL — not present in any other source)
- [ ] **Verify in a real browser**: citation-jump scroll alignment and the caret/heading alignment
      couldn't be visually confirmed this session — the sandboxed preview tool had a scroll
      rendering bug unrelated to the code (confirmed via `window.scrollTo()` doing nothing even
      outside any of this feature's code). Structurally everything checks out (scroll-margin-top,
      JS logic) but wants a real look.
- [ ] `fecal-microbiota-transplants-healthspan` is still missing 2 of its historical Wix comments
      (flagged back on 2026-07-10, never retrieved)

## 12. Link audit, contact form, self-serve editor, live comments (2026-07-14)

Sasha's five asks this session, worked in dependency order: link/URL audit first (no
dependencies), then the contact form (buildable now, works once deployed), then — after
confirming with Sasha — pushed to GitHub to unblock the CMS and comments, both of which needed it.

- [x] **URL mapping verified**: all 42 posts' `source_url` (old Wix path) match their new
      `/post/<slug>` 1:1 — zero mismatches.
- [x] **Full site link crawl** (339 pages, 396 unique external links). Found and fixed 8 in-article
      links hardcoded to the old `www.infiniteemergence.com` domain instead of a relative path —
      they were leaving the new site entirely. Also fixed `personalize-your-diet.md` linking to a
      stale slug (`no-one-diet` → `there-is-no-one-diet`).
  - [ ] **Still unresolved, needs Sasha's call**: `there-is-no-one-diet.md` links to
        `/post/ecosystem-gut-microbiota` — that post was never exported from Wix (not among the
        42), so there's nothing to point it at. Decide: remove the link, or was this article meant
        to exist?
  - [ ] **Still unresolved**: two links in `we-are-water.md` ("listen through Spotify") point to
        specific old podcast-episode pages that don't have routes on this site. One specific
        Spotify episode is already embedded elsewhere in that article
        (`open.spotify.com/episode/3eAp0aHOXmiNchiODCd0xq`) but it's not confirmed which of the
        two named episodes ("Shealynn O'Toole..." vs. "11 water purification methods") that is —
        didn't want to guess-link. Sasha: confirm which episode(s) these should point to.
  - Most external 403s (research journals, EWG, CDC, etc.) are very likely bot-blocking on
    automated requests, not real breakage — didn't chase those down individually. Real dead links
    (404/410/no response) were mostly old news articles/blog posts that genuinely no longer exist;
    not fixed since replacing a citation is an editorial call, not a mechanical one.
- [x] **Contact page built** — was previously just social links with a "to be wired up" note.
- [x] **Bug found + fixed while building the contact form**: `SubscribeBox.astro` and the ebook
      opt-in form both called `event.preventDefault()` with no actual submit logic behind it — they
      showed a fake "Thanks!" message but never sent data anywhere, even once deployed. All three
      forms (subscribe, ebook opt-in, contact) now do a real `fetch()` POST to Netlify Forms, with
      an error message on failure. This means the §2 subscribe box wasn't actually collecting
      emails despite earlier notes saying it was — good thing it's caught before launch.
- [x] **Repo pushed to GitHub** (public — `sashaelizar/brainforest-site`), confirmed with Sasha
      first since it unblocks both the CMS and comments below. Netlify connection itself still
      needs Sasha's own login (see §5).
- [x] **Self-serve editor (Decap CMS)** — see §7.
- [x] **Live comments (Giscus)** — see §8.
