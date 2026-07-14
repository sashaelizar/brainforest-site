# Setting Up Live Comments (Giscus) — Step by Step

This turns on real, live commenting for every article, going forward. It's powered by **giscus**
(free, no ads or tracking) — comments are stored as **GitHub Discussions** on your site's repo,
since the site is already on GitHub.

Your old Wix comments (the ones already showing on articles) aren't touched — they stay as a
separate read-only section above the new live comments.

**You do this part yourself** — installing a GitHub App needs your own GitHub login and consent,
which isn't something your AI can click through for you.

---

## Step 1 — Install the giscus app on your repo

1. Go to **https://github.com/apps/giscus**
2. Click **Install**
3. Choose **Only select repositories** → pick `sashaelizar/brainforest-site`
4. Approve it

(GitHub Discussions is already turned on for the repo — nothing to do there.)

## Step 2 — Create a "Comments" discussion category

1. Go to **https://github.com/sashaelizar/brainforest-site/discussions**
2. Click the **⚙️ (categories)** gear → **New category**
3. Name it exactly **Comments**, format: **Announcement** (so only giscus creates threads, people
   can't start random new ones)

## Step 3 — Get your two IDs from the giscus config generator

1. Go to **https://giscus.app**
2. Under **Repository**, enter `sashaelizar/brainforest-site` — once it recognizes the repo
   (green checkmark), it'll show you a **repo ID** and, after you pick the **Comments** category
   above, a **category ID**
3. Copy both — they look like `R_kg...` and `DIC_kw...`

## Step 4 — Send both IDs to your AI, or set them yourself

Either paste both IDs in chat, or set them directly:

1. In **Netlify**: **Site configuration → Environment variables → Add a variable**
2. Add `PUBLIC_GISCUS_REPO_ID` = (the repo ID from Step 3)
3. Add `PUBLIC_GISCUS_CATEGORY_ID` = (the category ID from Step 3)
4. Trigger a redeploy (Netlify does this automatically on the next push, or click **Trigger
   deploy** manually)

Once those two variables are set, live comments switch on automatically on every article — no
code changes needed.

---

## What's already done, waiting on you

- [x] GitHub Discussions enabled on the repo
- [x] Giscus component built (`src/components/GiscusComments.astro`) and added to every article,
      right below the legacy Wix comments — it stays invisible until the two env vars below exist
- [ ] You: install the giscus GitHub App (Step 1)
- [ ] You: create the "Comments" discussion category (Step 2)
- [ ] You: get the repo ID + category ID from giscus.app and set them in Netlify (Steps 3–4)
