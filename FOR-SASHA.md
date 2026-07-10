# Read Me First, Sasha 🌿

This is your website — rebuilt so it's **yours**, not rented from Wix. This guide explains, in plain
language, what's going on here, how it works, and how you (with your AI assistant) keep it running.
You do **not** need to be technical. Think of this as the instruction manual.

---

## The big idea

Your whole website is now just a **folder of files** — your articles, your images, your design.
That folder is what you're reading inside right now. Because it's plain files:

- **You own it completely.** No monthly Wix bill. No platform that can lock you out or change the rules.
- **It's fast and basically free to host.**
- **Your AI assistant can update it for you.** You describe what you want in plain English
  ("add a new article," "change this headline," "make the button green"), and the AI edits the files.

You are the author and the boss. The AI is your web developer. These files are the website.

---

## How the pieces fit together

There are three services. Here's the job each one does, in one sentence:

| Thing | What it is | Its job |
|------|------------|---------|
| **This folder** | Your website's files | The actual site — articles, images, pages |
| **GitHub** | Online storage for the folder | Keeps the master copy safe + tracks every change |
| **Netlify** | The publisher | Watches GitHub and puts the live site on the internet, for free |
| **Bluehost** | Where your domain name lives | Points `brainforest.org` at the site |

The flow: **you + AI edit the files → push them to GitHub → Netlify automatically publishes the new
version → visitors see it at brainforest.org.** You mostly just work with your AI; the rest is automatic.

---

## What is GitHub (in normal words)

**GitHub is like Google Drive for a website's files, with a time machine built in.**
It stores the master copy online, and it remembers every version — so nothing is ever lost, and you
can always undo. When we say **"push to GitHub,"** we just mean "save the latest version to that
online master copy." That's it.

Why bother? Because Netlify (the publisher) watches your GitHub. Every time new files land in GitHub,
Netlify rebuilds and publishes the site within a minute. So GitHub is the bridge between "editing
files" and "the world sees it."

**How you'll actually use it:** you won't click around GitHub much. You'll tell your AI things like:
> "Push these changes to GitHub."

and it will do it. If you want, your AI can also keep a **backup of your second brain** in a separate
private GitHub repository the same way.

---

## Your second brain + the website folder

You're setting up a **"second brain"** — a set of folders on your computer where your AI helps you
think, write, and organize. Your **website is one folder inside that system** (this folder). Keeping it
separate means:

- Your private notes/second brain stay private.
- The website folder is the one you (or Roei) connect to GitHub + Netlify to go live.

When you talk to your AI about the site, point it at **this website folder** specifically.

---

## Publishing & updating the site (your day-to-day)

You'll almost never touch code. Typical requests to your AI:

- "Add a new article. Here's the text and images."
- "Fix this typo on the leaky gut post."
- "Add a new category called Sleep."
- "Change the homepage headline to ___."

Then: **"Build it, show me a preview, and once I approve, push to GitHub so it goes live."**
Netlify publishes the update automatically. Done.

---

## Connecting it to the internet (one-time setup)

Roei can do this with you, or your AI can walk you through it:

1. **Put this folder on GitHub** (create a repository, push the files).
2. **Sign up for Netlify** (free) and connect it to that GitHub repository.
   Netlify auto-detects it's an Astro site and publishes it. You get a free temporary web address.
3. **Point your domain** (see below) so `brainforest.org` shows the new site.
4. **Cancel Wix** — but *only after* the new site is confirmed live on your domain.

---

## Domain management (your domain is at Bluehost)

Your web address `brainforest.org` is registered at **Bluehost**. Right now it points to Wix.
To point it at the new site:

1. In **Netlify**, add your custom domain (`brainforest.org`). Netlify will show you the exact
   settings to use.
2. Log in to **Bluehost** → find **DNS settings** for brainforest.org.
3. Update the records to what Netlify told you (usually either switching the "nameservers" to Netlify,
   or adding an `A` record and a `CNAME`). Your AI can translate Netlify's instructions into the exact
   clicks in Bluehost.
4. Wait a bit (DNS changes can take anywhere from minutes to a day). Netlify turns on the padlock
   (HTTPS) for free automatically.
5. Visit brainforest.org to confirm the new site loads. **Then** cancel Wix.

> Important: don't cancel Wix or let it renew until the new site is live on your domain and you've
> clicked through it. Keep both up during the switch.

---

## How to export your own content from Wix (you can do this yourself)

We already exported everything for you — but here's how to do it yourself, so you're never dependent
on us or Wix. Wix makes leaving deliberately awkward, so this is a "belt and suspenders" approach:

1. **Blog posts (structured):** In your Wix dashboard, open the **Blog / CMS (Content Manager)**.
   If your posts are in a collection, use **Export to CSV** — this gives you titles, text, dates, and
   image links in a spreadsheet.
2. **Blog feed (backup):** Visit `https://www.brainforest.org/blog-feed.xml` in a browser and save
   the page (right-click → Save As). Note: this only holds your ~20 most recent posts, so it's a
   supplement, not the whole archive.
3. **The complete list of posts:** Visit `https://www.brainforest.org/blog-posts-sitemap.xml` — this
   lists **every** post URL (this is how we found all 42, since the feed only showed 20).
4. **Images:** In the Wix Editor → **Media** → **My Uploads**, select images and **Download** (they
   come as a ZIP). For images inside posts, you can also right-click any image on your live site and
   "Save image as…".
5. **Everything at once (the reliable way):** Have your AI **crawl your live site** — visit every post
   URL, save the text, and download every image. That's exactly what we did (see the scripts
   `export-brainforest.py` and `reextract-html.py` in the project). This captures text + images +
   structure in one pass and is the real safety net.
6. **Verify, then cancel:** Open a few of your best posts in the exported copy, confirm the text and
   images are all there, and only then cancel Wix before it renews.

---

## What to hand your AI

When you start a session about your website, tell your AI:
> "This folder is my website (an Astro site rebuilt from my old Wix blog). Read `FOR-SASHA.md` and
> `NEXT-STEPS.md` first. Here's what I want to do today: ___."

- **`FOR-SASHA.md`** (this file) — the overview and how-it-works.
- **`NEXT-STEPS.md`** — the checklist of features still to wire up (forms, subscribers, analytics,
  SEO, hosting, domain) to fully match what Wix did.

---

## Mini-glossary

- **Repository (repo):** a project folder stored on GitHub.
- **Push:** save your latest files to GitHub.
- **Deploy / publish:** put the newest version live on the internet (Netlify does this automatically).
- **DNS:** the "phone book" that connects your domain name to your website.
- **Static site:** a website made of pre-built files (fast, cheap, secure) — what this is.
- **Astro:** the tool that turns your articles + design into the finished website.
