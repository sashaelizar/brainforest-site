# How to Publish a New Article — Step by Step

This is the workflow for writing and publishing new articles on your own terms — you write and
lay out the article exactly how you want (including where images go), and your AI handles turning
that into a real page on the site.

You don't need to touch code or Markdown. Here's the whole flow.

---

## Step 1 — Write in Word

Write your article in a **Microsoft Word document (.docx)**, same as you always have. A few habits
that make the handoff smoother (not required, just helpful):

- Use Word's built-in **Heading 1 / Heading 2 / Heading 3** styles for your section titles (instead
  of just making text bold and bigger). This lets your AI tell the difference between "this is a
  heading" and "this is just emphasized text."
- Drop images in **exactly where you want them to appear** in the flow of the article — inline, at
  full size, wherever. Your AI will pull each one out and place it in that same spot.
- If an image needs a caption, put a short line of italic text directly under it.
- If you're citing sources, a numbered list or "References" section at the end works well — the
  site already has a special style for that.
- Don't worry about matching site fonts/colors — the site's design applies automatically.

## Step 2 — Tell your AI it's ready

Save the Word doc somewhere easy to point to (Desktop or Downloads is fine), then tell your AI
something like:

> "New article ready: `[filename].docx`, it's in my Downloads folder. Category: Neuroscience."

Useful things to mention if you have them (your AI will ask if you don't):
- Which category/categories it belongs to (Neuroscience, Gut Microbiome, etc. — see the existing
  list on the site)
- A one-sentence description (used for Google search results and social previews)
- Whether you're the author or it's a guest post

## Step 3 — Your AI does the back-end work

From the Word doc, your AI will:

1. Pull out the text and convert it into the site's article format, preserving your headings,
   paragraphs, lists, bold/italic, and reference sections
2. Pull out every image at full resolution and save it into the right folder for that article
3. Write the front-matter details (title, date, read time, category, description) that the site
   needs to file the article correctly
4. Build the page and show you a **live preview link** to click through and check

## Step 4 — You review, approve, publish

- Click through the preview. Ask for any tweaks ("move that image up," "fix this typo," "make this
  a Heading 2 not Heading 3").
- Once you approve, your AI saves it to the site's version history (git) and — once Netlify is
  connected — pushes it live. Say **"publish it"** and that's the signal to go live.

---

## Where things end up (for reference — you don't need to touch these)

- Article text: `src/content/posts/`
- Images: `public/images/<article-name>/`

## Status

- [x] Workflow defined: Word doc → AI conversion → preview → approve → publish
- [ ] First article run through this pipeline, to confirm the process feels right end to end
