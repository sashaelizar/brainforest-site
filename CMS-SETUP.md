# Setting Up Your Content Editor — Step by Step

This gives you a web page — `brainforest.org/admin` — where you can log in and edit articles
directly: fix a typo, swap a sentence, update an excerpt, without asking your AI to do it. It's
called **Decap CMS** (a free, open-source editor built for exactly this: sites made of markdown
files in a GitHub repo, which is what yours is).

**You do this part yourself** — it needs your own logins on GitHub and DecapBridge — then you're
done for good; you won't repeat this setup for future articles.

Originally this used Netlify's own "Identity" feature to handle logins, but **Netlify discontinued
Identity** for new sites (it's gone from the dashboard entirely — confirmed 2026-07-15). The
replacement is **DecapBridge**, a free service built specifically to fill this gap for Decap CMS
sites. Functionally it does the same job Identity used to.

---

## Step 1 — Create a GitHub access token

DecapBridge needs permission to save your edits back to the repo.

1. Go to [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)
2. **Token name**: anything recognizable, e.g. `DecapBridge`
3. **Expiration**: pick the longest option available — a short one means this breaks later and
   needs redoing
4. **Repository access**: **Only select repositories** → pick `brainforest-site`
5. **Permissions → Repository permissions**: set **Contents** to **Read and write**, and
   **Pull requests** to **Read and write**. Leave everything else as "No access."
6. **Generate token**, then copy it immediately — GitHub only shows it once

## Step 2 — Create your site on DecapBridge

1. Sign up free at [decapbridge.com](https://decapbridge.com)
2. **Add site** → Git provider: **GitHub**
3. **GitHub repository**: `sashaelizar/brainforest-site`
4. **GitHub access token**: paste the token from Step 1
5. **Your Decap CMS login URL**: `https://brainforestbiosciences.netlify.app/admin/index.html`
   (update this to `https://brainforest.org/admin/index.html` once the real domain is connected)
6. **Auth type**: leave on **PKCE**
7. Submit — it generates a config snippet. Send that to your AI to drop into
   `public/admin/config.yml` (already done as of 2026-07-15, but if you ever recreate the
   DecapBridge site the IDs in that snippet will change and need re-pasting)

## Step 3 — Invite yourself as a collaborator

1. In DecapBridge, find your site → **Invite users** (or similar)
2. Enter your own email
3. Check that inbox and accept — from then on you log in with Google, Microsoft, or a password
   (your choice)

## Step 4 — Use it

1. Visit **brainforestbiosciences.netlify.app/admin** (update to **brainforest.org/admin** once
   the real domain is connected)
2. Log in via DecapBridge (Google, Microsoft, or password — whatever you set in Step 3)
3. You'll see a list of all 42 articles — click one to edit, or **New Article** to start one

**A note on editing article bodies:** the articles were exported from Wix, so the "content" field
is raw HTML (not plain markdown) to preserve the original formatting exactly. The editor shows it
as plain text on purpose — edit it like a text file (fix a word, add a paragraph following the
pattern of the one before it) rather than expecting a Word-style toolbar. This keeps the editor
from accidentally reformatting the page. New articles you write from scratch can be simpler HTML
or even plain paragraphs — ask your AI to set the pattern up if you want something lighter for new
posts.

Every save the editor makes creates a real commit to GitHub, so nothing is ever lost — you can
always see (or undo) the history.

---

## What's already done, waiting on you

- [x] Editor built and configured (`public/admin`), pointed at this repo's `main` branch
- [x] Repo pushed to GitHub (`github.com/sashaelizar/brainforest-site`)
- [x] Netlify connected and live at `brainforestbiosciences.netlify.app`
- [x] Config switched from deprecated Netlify Identity to DecapBridge (2026-07-15)
- [ ] You: Step 3 above (invite yourself on DecapBridge) — can't be done without your own login
- [ ] Once that's done: visit `/admin` on your live URL and confirm you can log in and see the
      article list
