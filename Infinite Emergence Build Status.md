# What's still outstanding

Updated 2026-07-16. Trimmed to just what's left — everything already done has been cleared off this note (full history is in `NEXT-STEPS.md` if you ever want it).

> ✅ **Yes, deploys are fully automatic now.** Netlify is genuinely linked to GitHub — every push updates the live site on its own within about a minute. Nothing to run or upload manually.
>
> ⏸️ **New this week: pushes are now batched roughly once a week** (Netlify flagged high build-credit usage) instead of going out after every change. Local work still happens continuously — it just won't hit the live site until the next scheduled push, unless you ask for one sooner.

---

## Outstanding

### Point brainforest.org at the new site — in progress, waiting on Netlify

DNS records are in at Bluehost; nothing left to do but wait for Netlify to finish
verifying/provisioning the domain.

1. ~~Add the domain in Netlify~~ done
2. ~~Add the ALIAS/A + CNAME records at Bluehost~~ done (TTL set to 4 hours)
3. **Waiting on Netlify** to finish verifying and provisioning — should resolve on its own within
   a day or so
4. Once it's showing live on the real domain, cancel Wix

### Set up sasha@brainforest.org via Zoho — in progress

Switched the plan from free Zoho to **Zoho Mail Lite** (~$1/user/month) after confirming Zoho's
free tier doesn't support IMAP/POP/SMTP, which is required for Gmail to pull the mailbox into
your existing inbox. Mail Lite unlocks that.

1. ~~Purchase Zoho Mail Lite~~ done
2. ~~Back up existing Gsuite mail via Google Takeout~~ done (downloaded as a zip)
3. Run Zoho's IMAP-based migration tool to pull your Gsuite mail history into the new mailbox
4. Cut over the MX records at Bluehost from Google's to Zoho's (replace, not add)
5. Confirm mail is flowing correctly through Zoho
6. Only then cancel Google Workspace ($12/mo) — keep both running until step 5 is confirmed
7. Once the mailbox is live, this also fixes the Kit confirmation-email spam issue — the emails
   were landing in spam because they were sent "from" a personal Gmail address through Kit,
   which looks like spoofing to Gmail's filters. A verified sender on brainforest.org fixes that.

### Turn on analytics (Umami)

Already decided and wired in the code — just needs an account.

1. Sign up free at Umami Cloud, add your site
2. Copy the two values it gives you
3. Send them to me — I'll set `PUBLIC_ANALYTICS_SRC` and `PUBLIC_ANALYTICS_DOMAIN` (same pattern as giscus, no dashboard step needed on your end)

### Wix content backup audit

Still on my list, not yours — double-checking nothing on the live Wix site (pages, assets, settings) is missing from the rebuild before you cancel Wix. No action needed from you; I'll report back when done.

---

## Loose open questions

Not urgent — worth a thought whenever, not blocking anything.

- **Brand positioning** (raised 2026-07-16) — the About/homepage copy is currently
  functional-medicine-and-mission-led; a separate suggestions doc argued for leaning more
  neuroscience-publication-led. Unresolved, worth a look when you have a minute.
- **Other lead magnets / freebies?** Beyond the leaky-gut ebook — only worth building if you actually have another one in mind.
- **Cross-post to Substack?** Purely for distribution reach — optional, not required for the site itself.

---

Full history of everything already done lives in `NEXT-STEPS.md` at the root of the project.
