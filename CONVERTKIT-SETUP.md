# Setting Up ConvertKit (Kit) — Step by Step

This is the one-time setup for your email subscribe forms: the "Stay in the know" box on every
article, and the ebook opt-in on the free-guide page. **You do this part yourself** (it needs your
own email + account), then hand the results back to your AI, who wires everything into the site.

You don't need to understand any of this deeply — just follow the clicks below.

---

## Step 1 — Create your account

1. Go to **https://kit.com** (this is ConvertKit's current name/site)
2. Sign up with your email — the free plan works fine to start (up to 10,000 subscribers)

## Step 2 — Create Form #1: the general "Stay in the know" box

This is the one that'll appear at the bottom of every article.

1. In the dashboard, find **Grow → Landing Pages & Forms** (menu names shift over time — look for
   anything called "Forms")
2. Click **Create New** → **Form**
3. Choose the **Inline** style (not popup, not slide-in — inline embeds directly into the page)
4. Name it something like `Blog - Stay in the know`
5. You can skip styling it nicely — your AI will restyle it to match the site. You just need the
   email field on it.
6. Save/publish the form
7. Click **Embed** (or **Publish**) on the form and choose **Embed code** / **Raw HTML** — copy
   the whole code block it gives you

## Step 3 — Create Form #2: the ebook opt-in

This one delivers your "14 Causes of Leaky Gut" PDF automatically after someone signs up.

1. Same as above: **Create New** → **Form** → **Inline**
2. Name it `Ebook - Leaky Gut Guide`
3. Under the form's settings, look for **Incentive / Content upgrade** (or set up an
   **Automation**: "When someone subscribes via this form → send email → attach the PDF")
4. Upload the PDF when it asks — your AI already has a copy ready at
   `public/downloads/leaky-gut-causes-ebook.pdf` in this project, so just grab it from there (or
   from your Downloads folder, it's the same file)
5. Save, then copy this form's **Embed code** the same way as Step 2

## Step 4 — Send both to your AI

Paste both embed codes into the chat (or just say "here are my two ConvertKit forms" and paste
them). Your AI will:

- Match the visual style to the rest of the site
- Swap them into the existing "Stay in the know" box and the ebook page
- Test that a signup actually works before calling it done

## Optional — API key (only needed later, for advanced automation)

If you ever want tagging/automation (e.g. "everyone who downloaded the ebook gets a 3-email
welcome series"), ConvertKit has an API. To get your key: **Account Settings → Developer**.
Not needed for the basic setup above — skip this for now.

---

## What's already done, waiting on you

- [x] Subscribe box built and live on every article (currently collecting emails via a temporary
      method until your real ConvertKit form is wired in)
- [x] Ebook PDF found and copied into the project
- [ ] You: create the two ConvertKit forms above and send the embed codes
- [ ] Your AI: wire them in and test
