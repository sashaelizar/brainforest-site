# What's still outstanding

Updated 2026-07-16. Trimmed to just what's left — everything already done has been cleared off this note (full history is in `NEXT-STEPS.md` if you ever want it).

> ✅ **Yes, deploys are fully automatic now.** Netlify is genuinely linked to GitHub — every push updates the live site on its own within about a minute. Nothing to run or upload manually.
>
> ⏸️ **New this week: pushes are now batched roughly once a week** (Netlify flagged high build-credit usage) instead of going out after every change. Local work still happens continuously — it just won't hit the live site until the next scheduled push, unless you ask for one sooner.

---

## Outstanding

### Point brainforest.org at the new site — DNS in, waiting on propagation

Turns out this wasn't just a couple of extra records at Bluehost — Bluehost's nameservers got
fully swapped for Netlify's own. Bluehost is now just the registrar; **all DNS records (Zoho's
included) now live inside Netlify's dashboard**, not Bluehost's. (Netlify's DNS screen also moved:
it's **Projects → DNS** in the left sidebar now, not under a site's own Domain settings.)

1. ~~Add the domain in Netlify~~ done
2. ~~Point nameservers at Netlify~~ done — confirmed live
3. **Waiting on final propagation (TTL pending)** — nothing left to configure, just time
4. Once it's showing live on the real domain, cancel Wix

### Set up sasha@brainforest.org via Zoho — DNS records in, waiting on propagation

Went with **Zoho Mail Lite** (10GB, $1.25/user/month billed annually, ≈$15/year) over the
pricier Workplace tier — Mail Lite covers everything needed (custom-domain email +
IMAP/POP/SMTP for the Gmail integration); Workplace's extra apps aren't needed for one mailbox.

1. ~~Purchase Zoho Mail Lite~~ done
2. ~~Back up existing Gsuite mail via Google Takeout~~ done (downloaded as a zip — a safety copy,
   separate from the actual migration in step 5 below)
3. ~~Create Zoho account~~ done (hit one snag: signing up *with* `sasha@brainforest.org` as the
   account email failed, since Zoho tried emailing it a confirmation code before any mail routing
   existed for the domain — fixed by signing up with a personal email first, then adding the
   domain and creating the mailbox afterward)
4. ~~Verify domain ownership (TXT record) + add MX records~~ done, both added in Netlify's DNS
   panel (watch for a "conflicting record" warning if the record-type dropdown defaults to A —
   switch it to TXT/MX as appropriate and the warning goes away)
5. **Waiting on DNS propagation (TTL pending)** — once it clears:
   - Send yourself a test email to `sasha@brainforest.org` to confirm delivery
   - Run Zoho's IMAP-based Data Migration tool (needs a Google App Password) to pull your Gsuite
     mail history into the new mailbox — not done yet, separate from the Takeout backup
   - Set up Gmail's "Check mail from other accounts" (`pop.zoho.com:995`) and "Send mail as"
     (`smtp.zoho.com:587`) so it stays inside your normal Gmail inbox
   - Only then cancel Google Workspace ($12/mo)
6. Once the mailbox is live, this also fixes the Kit confirmation-email spam issue — the emails
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
