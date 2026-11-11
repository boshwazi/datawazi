# SEO checklist: rank #1 for "datawazi"

> Goal: anyone searching "datawazi" finds datawazi.com first, with the logo, and ideally a business panel on the right.
> "datawazi" is a unique word, so this is achievable once search engines have (1) indexed the site, (2) confirmed it's the official site, and (3) seen other trusted sites link to it. Expect **1–4 weeks** after indexing.
> Status: ⬜ to do · ⏳ in progress · ✅ done

## On the website (done 11 Nov 2026)
| Status | Item |
|---|---|
| ✅ | Title: "datawazi \| Data & AI solutions consultancy, Malaysia"; 152-character description starting with "datawazi" |
| ✅ | "datawazi" in visible page text (hero, footer), not only in the logo |
| ✅ | Structured data: Organization (name, alternate names, logo, contact, services, Instagram) + WebSite (official site name) |
| ✅ | Favicons at 48/96/192/512 px (Google shows these next to results), web manifest, 512 px logo |
| ✅ | Sitemap with last-modified dates, robots.txt, canonical URLs, hreflang for EN/BM privacy pages |
| ✅ | HTTPS, fast static pages, mobile-friendly, www → root redirect |

## 1. Google Search Console (most important, 10 min)
| Status | Step |
|---|---|
| ✅ | search.google.com/search-console → sign in with the datawazi Gmail → **Add property → Domain** → `datawazi.com` |
| ✅ | Add Google's TXT record in Cloudflare (DNS → Add record → TXT, name `@`) → **Verify**. **Never delete this TXT record** |
| ✅ | **Sitemaps** → submit `sitemap-index.xml` (also `sitemap-0.xml`): both Success, 3 pages found, 11 Nov 2026 |
| ✅ | **URL inspection** → `https://datawazi.com/` → **Request indexing** (requested 11 Nov 2026) |
| ✅ | Homepage **indexed** and ranking **#1 for "datawazi"** on Google (11 Nov 2026) |
| ⏳ | `favicon.ico` added; re-indexing requested. Google should show the `d_` icon and the site name "datawazi" in results within days to ~2 weeks |
| ⬜ | **Enhancements** report: no errors on "Organization" / structured data |

## 2. Bing Webmaster Tools (5 min; also covers DuckDuckGo, Yahoo, ChatGPT search, Copilot)
| Status | Step |
|---|---|
| ✅ | bing.com/webmasters → GSC import doesn't work with Domain properties, so the site was **added manually** and verified with the `msvalidate.01` meta tag in `Base.astro` (**never remove it**). Sitemap submitted 11 Nov 2026 |

## 3. Google Business Profile (the panel on the right of search results)
| Status | Step |
|---|---|
| ✅ | Profile created 11 Nov 2026: name `datawazi`, **service business** (address hidden), category **Computer consultant** |
| ✅ | Service area Kuala Lumpur, hours 09:00–18:00, website, description, photos |
| ✅ | Logo (`d_` square), booking link (Cal.com), LinkedIn + Instagram, opening date, services (no prices) |
| ⏳ | **Verification** in progress (Google says up to 5 days). Then the profile becomes public |
| ⬜ | After verification: search "datawazi" on Google and check the panel shows on the right |
| ⬜ | Phone number: make sure the profile and the email signature use the same number |

## 4. Profiles that point back to datawazi.com
Each one tells Google "this is the same datawazi". Send the URLs so they're added to the site's structured data (`sameAs`).
| Status | Profile | Note |
|---|---|---|
| ✅ | Instagram @datawazi | Set the bio link to datawazi.com |
| ✅ | **LinkedIn company page** | https://www.linkedin.com/company/datawazi/ (live 11 Nov 2026; in site structured data and footer) |
| ⬜ | **Your personal LinkedIn** | Experience: "Director, datawazi", linked to the company page |
| ⬜ | Cal.com profile | Add datawazi.com to the profile |
| ⬜ | Facebook page (optional) | Some Malaysian SMEs and GLC staff search there |
| ⬜ | Business directories (after SSM) | e.g. Clutch, GoodFirms, Malaysian business directories. Only reputable ones, no paid link schemes |

## 5. Keep it healthy
| Status | Habit |
|---|---|
| ⬜ | Check Search Console monthly: errors, which searches show datawazi |
| ⬜ | Same name everywhere: **datawazi** (lowercase), datawazi.com, hello@datawazi.com |
| ⬜ | Later: case studies and short articles on the site help rank for searches beyond the brand name (e.g. "data consultancy Malaysia") |
