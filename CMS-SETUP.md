# Setting Up Your Content Editor — Step by Step

This gives you a web page — `brainforest.org/admin` — where you can log in and edit articles
directly: fix a typo, swap a sentence, update an excerpt, without asking your AI to do it. It's
called **Decap CMS** (a free, open-source editor built for exactly this: sites made of markdown
files in a GitHub repo, which is what yours is).

**You do this part yourself** — it needs your own login on Netlify — then you're done for good;
you won't repeat this setup for future articles.

---

## Step 1 — Turn on Identity (who's allowed to log in)

1. Go to your site's dashboard on **netlify.com**
2. **Site configuration → Identity → Enable Identity**
3. Under **Registration**, set it to **Invite only** (so random people on the internet can't sign
   up as an editor)

## Step 2 — Turn on Git Gateway (lets the editor save changes back to GitHub)

1. Still in **Identity** settings, scroll to **Services → Git Gateway → Enable Git Gateway**
2. It'll ask to connect to GitHub — approve it (this uses Netlify's own connection, not a personal
   token, so nothing to generate yourself)

## Step 3 — Invite yourself as a user

1. Go to the **Identity** tab (top level, not settings) → **Invite users**
2. Enter your own email
3. Check that inbox — click the invite link, set a password
4. That's your login for the editor from now on

## Step 4 — Use it

1. Visit **brainforest.org/admin** (or the Netlify preview URL + `/admin` before the domain is
   connected)
2. Log in with the email/password from Step 3
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
- [ ] You: connect this repo to Netlify (separate one-time step — ask your AI if you haven't yet)
- [ ] You: Steps 1–3 above (Identity + Git Gateway + invite yourself) — can't be done without your
      own Netlify login
- [ ] Once that's done: visit `/admin` on your live URL and confirm you can log in and see the
      article list
