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
  - [ ] **Ebook delivery**: after opt-in, send the "14 Causes of Leaky Gut" PDF automatically
        (needs the actual PDF; an email provider in §2 can auto-deliver it)
  - [ ] Add the **real ebook cover** image (currently using the article cover as a stand-in)

## 2. Subscribe / newsletter (this replaces Wix's "subscribe to the blog")
On Wix, readers could subscribe and get emailed when she posts. Since we're **not** using Substack,
we recreate that ourselves. Here's what it looks like:

- **A subscribe box** on the site (footer + a small form on the ebook page and article pages).
- The email addresses flow into an **email provider** that both stores the list *and* sends emails.
  Recommended options (all have free tiers): **MailerLite**, **Buttondown**, **ConvertKit**, or **Beehiiv**.
- **Two ways to notify subscribers of new posts:**
  1. **Manual** — when she publishes, she sends a broadcast from the provider. Simple, full control.
  2. **Automatic (RSS-to-email)** — the site publishes an **RSS feed**; the provider watches it and
     auto-emails subscribers whenever a new article appears. This is the closest match to Wix's behavior.
- **What's needed:**
  - [ ] Pick an email provider (start free)
  - [ ] Add an **RSS feed** to the site (`@astrojs/rss` — quick add) so auto-notify works
  - [ ] Drop the provider's subscribe form into the footer + ebook page
  - [ ] Decide manual vs. automatic new-post emails
  - [ ] (Same provider can double as the ebook-delivery tool from §1)

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
- [ ] Decide: write posts as **Markdown files** (simple, in the repo) or add a **free visual editor**
      (headless CMS like Decap/Sanity) so she can write without touching code
- Either way, her **AI assistant** can add/edit posts for her — see `FOR-SASHA.md`

## Open decisions
- [ ] Design direction — current cream/green look is our interpretation; refine toward her taste
- [ ] Any **other lead magnets/freebies** beyond the leaky-gut ebook that need landing pages
- [ ] Whether to *also* cross-post to Substack purely for distribution (optional, not required)
