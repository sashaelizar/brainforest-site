# What's still outstanding

Updated 2026-07-18. Trimmed to just what's left — everything already done has been cleared off this note (full history is in `NEXT-STEPS.md` if you ever want it).

> ✅ **Yes, deploys are fully automatic now.** Netlify is genuinely linked to GitHub — every push updates the live site on its own within about a minute. Nothing to run or upload manually.
>
> ⏸️ **Pushes are batched roughly once a week** (Netlify flagged high build-credit usage) instead of going out after every change. Local work still happens continuously — it just won't hit the live site until the next scheduled push, unless you ask for one sooner.

---

## Outstanding

### Point brainforest.org at the new site — ✅ live

Confirmed resolving to Netlify (A records live, site returns 200). Bluehost's nameservers are
fully swapped for Netlify's own — Bluehost is now just the registrar; **all DNS records (Zoho's
included) now live inside Netlify's dashboard** (**Projects → DNS** in the left sidebar), not
Bluehost's. Nothing left to configure here — only remaining step is cancelling Wix once you're
satisfied everything's live and accounted for (see the Wix audit item below first).

### Set up sasha@brainforest.org via Zoho — DNS records in, still waiting on MX propagation

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
5. **Still waiting on MX propagation** (checked again 2026-07-18, still not resolving) — once it clears:
   - Send yourself a test email to `sasha@brainforest.org` to confirm delivery
   - Run Zoho's IMAP-based Data Migration tool (needs a Google App Password) to pull your Gsuite
     mail history into the new mailbox — not done yet, separate from the Takeout backup
   - Set up Gmail's "Check mail from other accounts" (`pop.zoho.com:995`) and "Send mail as"
     (`smtp.zoho.com:587`) so it stays inside your normal Gmail inbox
   - Only then cancel Google Workspace ($12/mo)
6. **Second mailbox**: `contact@brainforest.org` — you confirmed you want this one too, not created
   in Zoho yet. Same steps as `sasha@` once MX is live.
7. Once mail is live, this also fixes the Kit confirmation-email spam issue — the emails were
   landing in spam because they were sent "from" a personal Gmail address through Kit, which
   looks like spoofing to Gmail's filters. A verified sender on brainforest.org fixes that.

### Turn on analytics (Umami)

Already decided and wired in the code — just needs an account.

1. Sign up free at Umami Cloud, add your site
2. Copy the two values it gives you
3. Send them to me — I'll set `PUBLIC_ANALYTICS_SRC` and `PUBLIC_ANALYTICS_DOMAIN` (same pattern as giscus, no dashboard step needed on your end)

### Wix content backup audit — blocked on Wix access

Still on my list, not yours in terms of doing the audit itself — but I'm stuck without a way to
browse the live Wix site (Settings → Domains only shows the connected premium domain now that
DNS points elsewhere; the Editor's own Preview also only resolves through brainforest.org). No
rush — your Wix plan runs through early August, and I've got a reminder scheduled for **August 6**
about the renewal decision, which is a natural checkpoint to revisit this. If you find a working
Wix URL before then (try the Publish/Preview dropdown for alternate domain options), send it over
and I'll pick this back up.

---

## Loose open questions

Not urgent — worth a thought whenever, not blocking anything.

- **Brand positioning** (raised 2026-07-16) — the About/homepage copy is currently
  functional-medicine-and-mission-led; a separate suggestions doc argued for leaning more
  neuroscience-publication-led. Unresolved, worth a look when you have a minute.
- **Other lead magnets / freebies?** Beyond the leaky-gut ebook — only worth building if you actually have another one in mind.
- **Cross-post to Substack?** Purely for distribution reach — optional, not required for the site itself.
- **Podcast rename on Spotify** — you're handling this one yourself (dropping "Infinite Emergence"
  from the show name to match Apple Podcasts, which already just says "Mind the Roots"). Nothing
  for me to do here unless you want the site's own `PODCAST.name` updated to match afterward.
- **Decap CMS real-article test** — the `/admin` markdown editor is built and verified with a test
  post, but you haven't yet written a real new article through it yourself to confirm the editing
  experience feels right. No rush, just flagging it's still unverified from your side.

---

Full history of everything already done lives in `NEXT-STEPS.md` at the root of the project.
