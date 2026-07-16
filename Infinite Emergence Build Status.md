# What's still outstanding

Updated 2026-07-15. Trimmed to just what's left — everything already done has been cleared off this note (full history is in `NEXT-STEPS.md` if you ever want it).

> ✅ **Yes, deploys are fully automatic now.** Netlify is genuinely linked to GitHub — every push updates the live site on its own within about a minute. Nothing to run or upload manually, this session or any future one.

---

## Outstanding

In roughly the order I'd tackle them — none are blocking each other.

### Create your ConvertKit forms

Replaces the working-but-temporary subscribe box with the real email platform you chose.

1. Log into ConvertKit (Kit)
2. Create two forms: one for general blog subscribers, one for the leaky-gut ebook
3. For each form, copy its embed code / form ID
4. Send both to me — I'll swap them into the site. Full detail in `CONVERTKIT-SETUP.md`.

### Point brainforest.org at the new site

Do this once everything else feels done — makes the site show up on your real domain instead of the netlify.app link.

1. In Netlify: `Domain management` → `Add a domain` → type `brainforest.org`
2. Netlify shows you DNS records to add
3. Log into Bluehost → DNS → add exactly what Netlify showed you. (Same place you'll add Zoho's records below — worth doing both DNS changes in one Bluehost visit.)
4. Wait (a few hours to a day), then only cancel Wix once the new site is verified live on the real domain

### Set up sasha@brainforest.org (free, via Zoho + Gmail)

Zoho hosts the mailbox for free; Gmail settings pull it into your existing inbox.

1. Sign up free at [zoho.com/mail](https://www.zoho.com/mail/zohomail-pricing.html), Free plan, domain `brainforest.org`
2. Add the TXT record Zoho gives you at Bluehost, to verify ownership
3. Add Zoho's MX records at Bluehost too — this is what actually routes mail to Zoho
4. In Zoho's admin, create the mailbox `sasha@brainforest.org`
5. In Gmail: `Settings → Accounts and Import`
6. "Check mail from other accounts" → add it. Server `pop.zoho.com`, port `995`.
7. "Send mail as" → add it too. Server `smtp.zoho.com`, port `587`. Gmail verifies with a code.

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

- **Other lead magnets / freebies?** Beyond the leaky-gut ebook — only worth building if you actually have another one in mind.
- **Cross-post to Substack?** Purely for distribution reach — optional, not required for the site itself.

---

Full history of everything already done lives in `NEXT-STEPS.md` at the root of the project.
