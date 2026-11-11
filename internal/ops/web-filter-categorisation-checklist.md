# Web filter categorisation checklist: datawazi.com

> Why: corporate, GLC and government networks often block brand-new, uncategorised domains. Asking each filter vendor to categorise `datawazi.com` keeps the site reachable from client networks. Free; approvals usually take 1–5 working days.
> Status: ⬜ not started · ⏳ submitted · ✅ categorised · ➖ already fine (skipped)

## Paste into every form

- **Website:** `https://datawazi.com`
- **Email:** `hello@datawazi.com`
- **Description / comments:**

> datawazi.com is the business website of datawazi, a Malaysian data and AI solutions consultancy (data platforms, dashboards, workflow automation, AI integration). It is a static information site: no downloads, no user logins, no ads, no third-party scripts. Please categorise it as Information Technology / Business.

## Vendors (in priority order)

| # | Status | Vendor | Go to | What to do | Pick category | Submitted | Result |
|---|---|---|---|---|---|---|---|
| 1 | ⏳ | **Fortinet** (very common in Malaysian government, GLCs and SMEs) | fortiguard.com/webfilter | Enter `datawazi.com` → **Lookup**. If "Newly Registered" or "Unrated", click **Request a review / change**, paste the description, submit | **Information Technology** | 2026-11-11 | |
| 2 | ⏳ | **Palo Alto Networks** (banks, corporates) | urlfiltering.paloaltonetworks.com | Enter the URL → **Search** → **Request Change**, choose the category, paste the description. May ask for a free account | **Computer-and-Internet-Info** (or Business-and-Economy) | 2026-11-11 | |
| 3 | ⏳ | **Cisco Talos** (corporates, Cisco Umbrella) | talosintelligence.com/reputation_center | Look up `datawazi.com`. To change: **Support → Submit a ticket → Web categorisation**. Needs a free Cisco account | **Computers and Internet** | 2026-11-11 | |
| 4 | ➖ | **Broadcom / Symantec** (corporates) | sitereview.bluecoat.com | Enter URL → **Check Category** → **Request a different categorisation**, paste the description | **Technology/Internet** | not needed | Already **Technology/Internet** (WebPulse), 2026-11-11 |
| 5 | ⏳ | **Zscaler** (multinationals) | sitereview.zscaler.com | Enter URL → **Look up** → **Suggest a different category**, paste the description | **Professional Services** (or Web Search / IT) | 2026-11-11 | |
| 6 | ⏳ | **Trellix / McAfee** | trustedsource.org | Product **Skyhigh Secure Web Gateway for Cloud** (formerly McAfee/Trellix Web Gateway) → **Check URL** → **Submit for review** | **Business** or **Internet Services** | 2026-11-11 | |

**Tips**
- If a lookup already shows a sensible category (Business, IT), mark ➖ and skip.
- Category names differ by vendor; pick the closest. Never "Marketing" or "Advertising".
- Re-check every lookup about a week after submitting, and fill in **Result**.
- If a button has moved, look for "request review", "dispute" or "suggest category".

## Google Search Console

| Status | Step |
|---|---|
| ⬜ | Open search.google.com/search-console, signed in with the datawazi admin Gmail |
| ⬜ | **Add property → Domain** → `datawazi.com` |
| ⬜ | Add Google's **TXT** record in Cloudflare (**DNS → Records → Add record**, Name `@`), or accept Google's automatic Cloudflare setup |
| ⬜ | Click **Verify** |
| ⬜ | **Sitemaps** → submit `sitemap-index.xml` |

## After the site setup: final checks

| Status | Check | Target |
|---|---|---|
| ⬜ | securityheaders.com/?q=datawazi.com | Grade A |
| ⬜ | ssllabs.com/ssltest → datawazi.com | Grade A |
| ⬜ | Open datawazi.com from a client or corporate network (or ask a friendly contact) | Loads, not blocked |
