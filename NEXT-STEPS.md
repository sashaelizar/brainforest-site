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
- **Decided 2026-07-16: Umami Cloud**, confirmed by Sasha. Over Plausible: both are
  privacy-friendly, tiny script, no cookie banner needed, similar dashboards — Umami Cloud's free
  tier (100k events/mo) is the deciding factor for a blog at this traffic scale, where Plausible's
  hosted version is paid-only (~$9/mo minimum; self-hosting free but adds server upkeep Sasha
  doesn't want). Ruled out: Google Analytics 4 (heavier, needs a cookie-consent banner) and
  Netlify Analytics (~$9/mo, no real advantage over the free option here).
- **What's needed (Sasha, can't be done by the AI — requires creating a third-party account):**
  - [ ] Create a free account at umami.is (Umami Cloud), add the site
  - [ ] Copy the tracking script URL + your site's domain from Umami's setup page
  - [ ] In Netlify → Site settings → Environment variables, set `PUBLIC_ANALYTICS_SRC` (the script
        URL) and `PUBLIC_ANALYTICS_DOMAIN` (your domain) — the placeholder is already wired in
        `BaseLayout.astro`, so setting these two vars and redeploying turns tracking on with no
        further code changes
  - [ ] Confirm data is flowing in the Umami dashboard after the next deploy
- Also decided 2026-07-16: this will eventually give a real, better-informed read on how much of
  the view counter (below) is bot/crawler traffic vs. genuine human visits, once it's live for a
  while.

## 8. Comments, likes, and live view counts (raised 2026-07-10)

**Views — done.** Turns out the historical numbers *were* recoverable: Wix's raw page source
never has them (loaded in by their app after the page loads), but a real browser rendering the
live page shows them in plain text. Visited all 42 live posts on brainforest.org with a real
browser and read off the actual view/comment/like numbers for each — saved to
`src/data/legacy-stats.json`. Built `ArticleStats.astro`, shown at the bottom of every article,
displaying that legacy number. Added `netlify/functions/track-view.js`, a Netlify Function using
**Netlify Blobs** (built into Netlify — no extra account/service) that counts new views going
forward; the displayed total is legacy + live, added together client-side.

**Bot/AI traffic caveat (raised + decided 2026-07-16):** `track-view.js` counts every hit
unconditionally — no user-agent check, no dedup, no signal captured beyond a raw increment. That
means bot/crawler/AI-scraper traffic is indistinguishable from genuine human views in what's
already been counted, and there's currently no way to filter it retroactively (nothing was
recorded to filter by). Decided: **keep the view count visible for now** rather than hiding it;
revisit once Umami (above) has been live a while and gives a real read on how much non-human
traffic this site actually gets. Not yet built, only discussed: a future improvement would add a
known-bot-user-agent filter plus one-count-per-visitor-per-day dedup (same localStorage pattern
the like button already uses) to `track-view.js` — flagged here for later, not requested yet.
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
- [x] **Decided (2026-07-15): keeping images in git**, current simple approach. No change needed.

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
      and shows a preview before publishing. Full steps in `HOW-TO-PUBLISH-ARTICLES.md`. Still a
      valid fallback for anything with unusual layout, but see the 2026-07-16 decision below for
      the new default.
- [ ] Run one real article through the pipeline to confirm it feels right end to end
- [x] **Self-serve editor added (2026-07-14), requested so minor edits don't need an AI session.**
      Decap CMS at `/admin`, fields matching the post schema. At the time, article body was a
      raw-text field on purpose (Wix-exported HTML, risk of corruption under a WYSIWYG editor).
- [x] **Decided 2026-07-16: Decap CMS is now the default way to write new articles**, raised
      because Sasha found the raw-HTML text field "a mess that is unreadable." The body field is
      now a real `widget: "markdown"` rich-text editor — toolbar for headings, bold/italic,
      bulleted/numbered lists, links, and image upload, matching the site's actual look rather
      than showing code. A hidden `markdown` field (true for anything created through `/admin`
      from now on, explicitly `false` on all 42 legacy posts) tells `[slug].astro` whether to run
      the body through `micromark` (new markdown posts) or render it as-is (legacy Wix HTML).
      Verified both paths render correctly. PDF-upload or Google-Doc-share were considered and
      declined as the default — both require the AI to manually reconstruct formatting each time,
      slower and less reliable than typing directly into a real-time formatted editor. The Word-doc
      handoff above remains available for anything with unusual layout needs.

## Open decisions
- [x] **Design direction confirmed (2026-07-15)** — Sasha likes the current cream/green look, no
      change needed
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

## 13. Citation restyle, view-count fix, article search, contacts CSV (2026-07-14, later same day)

Four more asks, same session. Citations and the view-count fix are described in full in their own
commit messages (`git log`) — summarized here for the running record.

- [x] **Citations restyled**: 462 in-line citations across 15 articles converted from plain
      `[1]`-style bracketed links to `<sup>` superscript, repositioned to sit after a period/comma
      and before a semicolon/em-dash per Sasha's spec. All `#ref-N` hyperlinks into the References
      dropdown preserved. Only repositioned where the punctuation was directly adjacent (no tag in
      between) to avoid risking the HTML structure — see the commit for the full breakdown.
- [x] **View counts fixed**: Sasha flagged the pineal gland article as showing over 1,000 views
      when it shouldn't. Rechecked all 42 live Wix view counts — 39 had drifted normally (+1 to +8
      over 4 days), but 3 were wildly stale: `pineal-calcification` (792 → 4,801),
      `pineal-gland-development` (225 → 1,231), `letter-college-freshman-self` (147 → 1,149).
      Almost certainly a scrape bug on those 3 specific posts during the original 2026-07-10
      capture, not real overnight virality — the jump size and pattern (isolated, unrelated
      topics) doesn't fit organic growth. Refreshed all 42 to today's live numbers in
      `legacy-stats.json` while verifying anyway.
- [x] **Search bar added** to `/posts` — client-side, filters the 42-post grid by title keywords
      only (not description/body), space-separated keywords all must match.
- [x] **July 13 ebook-leads CSV reconciled** against the contacts master (not a code change — see
      `~/Downloads/`). Every lead in `Ebook gut causes.csv` was already in both the master sheet and
      the genuine-contact list (it's a full historical export, not new signups) — one row
      (Anita Grantham, 2025-10-10) has no email at all, so nothing could be done with it; flagged
      for Sasha in case she has another way to reach her. Separately, comparing Sasha's fresh master
      export (`~/Desktop/contacts (1).csv`, 1,747 rows) against last week's `contacts.csv` turned up
      2 new contacts from 2026-07-10 that hadn't been synced yet — both matched the same bot-signup
      pattern as last week's spam wave (one disposable email domain, one where the "name" is just
      the email prefix with no last name), so both went into `contacts-flagged-as-bot.csv` and
      `contacts.csv` (total list), not `contacts-real-likely.csv` (genuine). Genuine-contact count
      unchanged at 122.

## 14. Subscribe forms, CTA buttons, card heights, Wix content audit (2026-07-14, third round)

- [x] **Name field added to every subscribe surface**, not just contact: the nav "Subscribe"
      modal, and `SubscribeBox` (top of `/posts` and every category page, bottom of every article).
      The nav modal had its own hand-rolled copy of the preventDefault()-with-no-fetch bug fixed
      last round elsewhere — missed it then since it doesn't reuse `SubscribeBox`. Fixed the same
      way.
- [x] **Comments confirmed staying on Giscus** (Sasha's call, after flagging that it requires a
      GitHub account to comment — real friction for this audience, but she wants to keep it).
      Already fully built (§8) — still just needs Sasha to connect Netlify and install the giscus
      app per `GISCUS-SETUP.md`. No code changes needed this round.
- [x] **Embedded CTA buttons restyled**: 4 articles (`detox`, `fecal-microbiota-transplants-
      healthspan`, `leaky-gut-symptoms-biomarkers`, `leaky-gut-causes`) had a Wix button widget
      that *was* captured during export but rendered as a bare unstyled link (no CSS matched its
      shape). Added a `.cta-btn` class matching the site's pill-button look, and relativized the
      hardcoded `https://www.brainforest.org/contact` hrefs. Verified against live Wix (label +
      position both match) for 2 of the 4; confirmed via a background crawl of the other 40 live
      articles that no other article has one — these 4 are the complete set.
- [x] **Post-card heights now consistent**: title clamped to 2 lines, description to 3, both with
      matching min-height. Descriptions ranged 29-500 characters, which was producing wildly
      different card heights. All 42 cards now measure exactly 430px.
- [x] **Author photo** — resolved next round, see §15.
- [x] **Wix content audit found 2 unmigrated pages — decided (2026-07-15): not migrating them.**
      - `/book-online` — a live Wix Bookings page offering a free 15-min consultation
      - `/plans-pricing` — a live pricing page offering "Health Coaching" at $500/month (4 months
        of weekly calls + personalized guidance), with a working "Buy Now" checkout
      - Both used Wix's built-in booking/payment infrastructure, which has no static-site
        equivalent. Sasha's call: leave these off the new site.

## 15. Citation link styling, subscribe form layout, author photo (2026-07-14, fourth round)

- [x] **Citation links un-underlined.** `.prose sup a` now has `text-decoration: none`. Checked
      thoroughly for the "spacing anomalies around em-dashes/semicolons" Sasha flagged: zero
      semicolon-adjacent citations exist anywhere in the corpus, and the one em-dash case
      (`leaky-gut-symptoms-biomarkers`) was already tight/correct — the underline was very likely
      the actual anomaly she was seeing.
- [x] **Subscribe forms back to a low profile.** Adding the name field last round made every
      subscribe form (nav modal, top-of-page box, bottom-of-article band) stack into a tall
      3-row column. Switched to a horizontal row (wraps on narrow widths) — same font sizes/
      padding as before. Two of the three surfaces fit name+email+button on one line; the nav
      modal (fixed ~480px) wraps to two rows.
- [x] **Author photo done** — Sasha sent one directly in chat. Cropped to a 4:5 professional
      headshot ratio centered on her face (`public/images/author/sasha-elizar.jpg`), added an
      optional `photo` field to the `Author` type, wired into both the author page and About page.
      (Removed from About page again next round per Sasha — kept on the author page only.)

## 16. Header stacking bug, References polish, real bug in this session's tooling (2026-07-14, fifth round)

- [x] **Real bug found and fixed: category-pill buttons rendered on top of the header on scroll.**
      Root cause: the global `nav { position: sticky; z-index: 20 }` rule in BaseLayout.astro
      targeted every `<nav>` tag, not just the header — so it also silently applied to
      `nav.cat-tabs` (the pill row on `/posts` and category pages) and `nav.catnav`
      (`CategoryNav.astro`, used on every article page). All three shared the same z-index, so
      ties resolved by DOM order — the pill navs sit later in the DOM than the header and painted
      in front of it. Scoped the rule to `nav.site-nav` specifically. Verified with
      `elementFromPoint` (not screenshots — see below).
- [x] **References/Resources/Further Reading downsized from ~H1 to standard H2** (was
      `clamp(30px,5vw,48px)`, now fixed 30px matching the rest of the site's h2s); caret shrunk to
      match (16px → 11px) and its stray `margin-top: 0.2em` removed, which was the actual cause of
      it sitting visibly below the heading instead of centered on it.
- [x] **Citation → reference id integrity fully audited**: every citation's `href="#ref-N"` across
      all 15 citation-bearing articles matched exactly one reference-list id, no duplicates
      anywhere on any page. The data layer is clean. Hardened the scroll-timing code regardless
      (double `requestAnimationFrame` instead of a single forced-reflow read, so the `<details>`
      expansion has fully painted before scrolling) as a real, defensible improvement — but
      **could not get a clean live reproduction of "jumps to a random part of the article" this
      session** (see tooling note below). Ask Sasha for a specific article + citation number next
      time it happens so it can be pinned down exactly.
- [x] **Reference-list scroll-margin-top tightened 84px → 76px** (real nav height is 65px; the old
      84px value was copied from headings and overshot by ~19px, reported as landing "half a line
      above" the reference).
- [x] **CTA buttons centered**, own margin removed so spacing before/after now comes from the same
      paragraph/heading margins used everywhere else in the prose (one normal line break, not the
      extra gap the button's own `margin: 1.4em 0` was adding on top).
- [x] **Post-card clamp raised 3 → 7 lines.** Measured the real clamp boundary directly on live
      cards (comparing `scrollHeight` vs `clientHeight` across all 42): descriptions up to ~270
      characters fit fully in 7 lines at this card width/font; 276+ starts truncating. Answer to
      Sasha's question: **closer to 250 than 350.**

**Tooling note:** this session's Browser pane was noticeably unstable — `window.innerWidth`
intermittently reporting 0, `scrollTo` not taking effect, screenshots not reflecting actual
rendered state (confirmed by cross-checking against `getBoundingClientRect`/`elementFromPoint`,
which stayed reliable throughout), and the `computer` tool's native scroll action timing out
outright. Worked around it by leaning on non-visual DOM assertions and opening fresh tabs when a
given tab degraded. Real site bugs (the header stacking issue) were still findable and fixable
this way — but it's why the citation-jump behavioral bug couldn't be conclusively reproduced live
even though the underlying data and code were both audited clean.

## 17. Real fix for citation clicks, double-encoded &, more reference polish (2026-07-14, sixth round)

Sasha gave a concrete repro this round (senolytics-alzheimers, citation "1"), which led to finding
the actual likely cause of the wrong-jump bug from last round:

- [x] **Citation click target measured at ~5px wide.** That's almost certainly the real
      explanation for "clicking the reference number goes to a random part of the article" — a
      slightly-off click misses the tiny target and lands on whatever link happens to be adjacent
      instead. Enlarged the hit area (padding + matching negative margin, no visual change) rather
      than continuing to chase the scroll-timing theory.
- [x] **Reverted the double-requestAnimationFrame scroll timing from last round back to a
      synchronous forced-reflow read.** Confirmed directly this session that rAF callbacks can be
      throttled/never fire in some contexts, while `getBoundingClientRect()` forcing a synchronous
      layout is spec-guaranteed regardless of frame timing — the "harder" fix from last round was
      actually a regression.
- [x] **Scroll-margin-top corrected 76px → 69px.** Nav is exactly 65px; the math on the "half line
      above" complaint: 76px left an ~11px residual gap after last round's partial fix from 84px.
      69px (65px nav + 4px breathing room) should close it.
- [x] **Caret nudged 3px up** — flexbox `align-items:center` centers against the heading's full
      line-box, but "References" has no descenders, so its actual ink sits higher than the line
      box's geometric center. Reasoned from font-metrics principles since live pixel verification
      wasn't available this session (browser tool access went down mid-session — see below).
- [x] **Found and fixed the real `&amp;` bug**: two post descriptions
      (`leaky-gut-causes`, `fecal-microbiota-transplants-healthspan`) had literal `&amp;` typed
      into the frontmatter `description` field. Astro auto-escapes that field on render (unlike the
      article body, which uses `set:html` and isn't re-escaped), so the literal `&amp;` became
      `&amp;amp;` in the shipped HTML — visible as literal "&amp;" text wherever that description
      shows (meta tags, card previews). Fixed both; confirmed clean everywhere else.
- [x] **Line-space added after the button** in `fecal-microbiota-transplants-healthspan`
      specifically — it's the only cta-btn followed by a plain paragraph instead of a heading, and
      paragraphs don't carry their own top margin the way headings do, so it was the one button
      missing breathing room after it.

**Tooling note:** `mcp__Claude_Browser__*` tool access went down mid-session (temporary model/
classifier unavailability, not a site issue) before the caret and click-target fixes could get a
final live visual pass. Both are build-verified (correct CSS shipped, confirmed via curl against
the built HTML) and reasoned from first principles, but want a real look next session to confirm
they read right.

## 18. Netlify actually connected, real deploy debugging, Identity deprecated, email decided (2026-07-15)

- [x] **Netlify connected — for real this time, with a real bug caught along the way.** First
      attempt was a manual drag-and-drop upload (looked live, but was a frozen snapshot — none of
      this week's fixes were on it, confirmed by diffing specific known changes against the live
      HTML). Second attempt genuinely linked GitHub ("Deploys from GitHub with Astro" confirmed in
      Netlify's own UI) but hadn't rebuilt since the initial connection. A manual "Trigger deploy"
      fixed it — confirmed every fix from this week is now live at
      `brainforestbiosciences.netlify.app` (checked the compiled CSS and HTML directly, not just
      that the page loads).
- [x] **Form notifications set up.** Netlify's Forms page shows generic help content instead of a
      form list until there's at least one real submission — not a bug, just how the UI behaves
      pre-submission. The actual notification setting lives under
      `Project configuration → Notifications → Add notification → Email notification`, with
      "Event to listen for" = "New form submission" and "Form" = "Any form" (covers subscribe,
      contact, and the ebook opt-in with one rule). Sasha hit a paywall first by landing on a
      *deploy*-triggered notification (genuinely Pro-only) instead of a form one — different
      event type, easy to mix up in Netlify's UI.
- [ ] **Netlify Identity is deprecated — confirmed gone from the dashboard entirely** (not in
      Sasha's "Project navigation" menu at all). This breaks the self-serve editor's login, which
      was built on Identity + Git Gateway. Researched current alternatives; picked **DecapBridge**
      (free tier: 3 sites/10 collaborators, more than enough) as the replacement — purpose-built
      for exactly this Decap CMS + Netlify Identity gap, per
      [the decap-cms GitHub discussion on the deprecation](https://github.com/decaporg/decap-cms/discussions/7419)
      and [DecapBridge's own site](https://decapbridge.com). Sasha is signing up; once she sends
      the generated config snippet, swap it into `public/admin/config.yml` in place of the old
      `git-gateway` backend.
- [x] **Email decided: Zoho Mail (free) + Gmail integration**, not Google Workspace. Zoho hosts
      `sasha@brainforest.org` for free (real two-way mail, not just forwarding); Gmail's "Check
      mail from other accounts" (POP) and "Send mail as" (SMTP) pull it into her existing Gmail so
      she never has to leave that interface. Needs 2 DNS record additions at Bluehost (TXT to
      verify the domain, MX to route mail) — same place the domain migration (§6) already needs
      DNS changes, worth doing together when she gets to that step.
- [x] **Giscus live comments turned on** — Sasha created the "Comments" discussion category
      (Announcement format), fixed a couple of setup snags along the way (a typo in the repo name
      on giscus.app, confusion between GitHub's per-repo vs. global Discussions pages), and sent
      the repo-id/category-id. Set both as `[build.environment]` in `netlify.toml` instead of
      Netlify dashboard env vars — they're public GitHub metadata, not secrets, so committing them
      is fine and means Sasha never had to touch the Netlify dashboard for this one.
- [x] **Confirmed Netlify auto-deploys on every push** — no manual deploy step needed, this session
      or any future one. Sasha asked directly; verified true given the site picked up the
      DecapBridge config swap and the giscus env vars automatically after each push.
