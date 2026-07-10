# How to Preview Your New Site 🌿

This is a step-by-step guide to open your new website on your own computer so you can click
through it and try changes with your AI. **You don't need to be technical.** Follow along, and if
anything is confusing, paste that step to your AI and ask it to walk you through it.

Your site is a "static site" built with a tool called **Astro**. To preview it, you'll install one
free program (Node.js), then run two short commands. That's it.

---

## What you're starting with
You downloaded a zip file (`brainforest-site.zip`) and unzipped it. Inside is a folder with all
your website's files. Keep that folder somewhere easy to find, like your Desktop.

---

## Step 1 — Install Node.js (one time only)
Node.js is the free engine that runs the preview.

1. Go to **https://nodejs.org**
2. Download the version labeled **"LTS"** (it's the recommended one).
3. Open the downloaded file and click through the installer (all the default options are fine).
4. That's it. You won't ever open Node.js directly, other programs use it behind the scenes.

## Step 2 — Open a Terminal in your site folder
The "Terminal" is just a window where you type commands.

**On a Mac:**
- Open the **Terminal** app (press `Cmd + Space`, type "Terminal", press Enter).
- Type `cd ` (with a space after it), then **drag your site folder into the window** and press Enter.
  This moves the terminal "into" your folder.

**On Windows:**
- Open your site folder in File Explorer.
- Click in the address bar at the top, type `cmd`, and press Enter. A black window opens, already
  pointed at your folder.

> Tip: if you ever get lost, ask your AI: "How do I open a terminal inside my site folder on
> [Mac/Windows]?"

## Step 3 — Install the site's building blocks (one time per folder)
In the terminal window, type this and press Enter:

```
npm install
```

This downloads the pieces the site needs to run. It takes a minute or two the first time and prints
a lot of text, that's normal. Wait until it finishes and gives you back a blank line.

## Step 4 — Start the preview
Now type this and press Enter:

```
npm run dev
```

After a moment you'll see a line like:

```
Local   http://localhost:4321/
```

## Step 5 — Open it in your browser
Open your web browser and go to **http://localhost:4321/**

That's your site! Click around: the articles, the categories, the podcast page, the free-download
page. Everything, images and all, is running on your own computer.

## Step 6 — Stop the preview when you're done
Click on the terminal window and press **`Ctrl + C`** (both Mac and Windows). That shuts the preview
down. To start it again later, just do Step 4 again (`npm run dev`) from inside the folder.

---

## Making changes with your AI
This is the fun part. While the preview is running, you can ask your AI (pointed at this folder) to
make changes, and they show up in your browser when you refresh. Try things like:

- "Change the homepage headline to ___."
- "Fix this typo in the leaky gut article."
- "Add a new article. Here's the text and the images."
- "Make the buttons a different shade of green."

Ask it to **show you a preview and let you approve before saving.** Nothing you do here affects your
live Wix site, this is a private sandbox on your computer.

---

## If something goes wrong
- **`npm` is not recognized / command not found** → Node.js isn't installed yet, or you need to close
  and reopen the terminal after installing it (Step 1).
- **A wall of red text after `npm install`** → copy it and paste it to your AI; usually it's harmless
  warnings, and your AI can tell you if it's a real problem.
- **The browser says the page can't be reached** → make sure Step 4 (`npm run dev`) is still running
  in the terminal; the preview only works while that window is open.
- **Totally stuck?** → paste the exact step and any error text to your AI and say "help me get my
  Astro site preview running." It can see what you see and guide you.

---

## What's next (when you're ready, no rush)
When you love the site and want it live on the internet at brainforest.org, the next steps are
putting it on **GitHub** and connecting **Netlify** (free hosting). Those are covered in
**`FOR-SASHA.md`** and **`NEXT-STEPS.md`** in this same folder. Roei can help you with that part.
