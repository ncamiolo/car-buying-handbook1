# Car Buying Handbook — Setup Guide

## What's in this folder
- `index.html`, `guides.html`, `tools.html`, `about.html`, `contact.html`, `privacy-policy.html`
- `guides/` — 3 full articles
- `css/style.css` — all styling
- `js/main.js` — mobile nav + both calculators (pure JS, no dependencies)

Open `index.html` in a browser right now to see it working locally — no build step required.

## 1. Get a domain
Buy one from Namecheap, Porkbun, or Google Domains (~$10–15/year). AdSense
generally wants a real domain, not a free subdomain like `.github.io` or
`.netlify.app` — those are hit or miss for approval.

## 2. Deploy the site
Easiest free options, both support custom domains:
- **Netlify** — drag this whole folder into the Netlify dashboard, or connect a GitHub repo for auto-deploys.
- **Vercel** — same idea, connect a repo or drag-and-drop.
- **GitHub Pages** — free, works well once you've added a custom domain.

Point your domain's DNS at whichever host you pick (they each give you the exact records to add).

## 3. Before applying to AdSense
Google reviews for real, useful, original content — not just a domain with a
few placeholder pages. Before you apply:
- [ ] Replace the placeholder email in `contact.html` and `privacy-policy.html`
- [ ] Fill in the bracketed fields in `privacy-policy.html` with your real site name and domain
- [ ] Add a few more guide articles — sites with only 3–5 pages sometimes get rejected for "not enough content"; aim for 10+ solid articles if you can
- [ ] Make sure the site has been live for a little while with real traffic if possible
- [ ] Double check there's no broken content, lorem ipsum, or "under construction" language anywhere

## 4. Apply for AdSense
1. Go to [google.com/adsense](https://www.google.com/adsense) and sign up with your domain.
2. Add the verification snippet Google gives you into the `<head>` of every page (or use their site-wide auto-ads script — one snippet, works everywhere).
3. Google reviews the site — this can take anywhere from a few days to a few weeks.
4. Once approved, create an `ads.txt` file at your site's root (e.g. `carbuyinghandbook.com/ads.txt`) with the line Google gives you in your AdSense dashboard. This is required — without it, ad revenue can be limited.

## 5. Where ads will show
The `<div class="ad-slot">` placeholders across the site mark good ad
locations (between sections, in-article). Once approved, you can either:
- Turn on **Auto ads** in AdSense (Google places ads automatically, easiest), or
- Manually place `<ins class="adsbygoogle">` ad units inside the `.ad-slot` divs for more control over placement.

## 6. Growing traffic (this is what actually drives ad revenue)
AdSense pays based on traffic and clicks — the site itself won't make money
without visitors. The content here is written with SEO in mind (clear
titles, meta descriptions, real answers to real questions), but growing
traffic takes ongoing work:
- Publish new guides regularly — long-tail topics like "how to buy a car with bad credit" or "leasing vs financing" bring in search traffic.
- Make sure each page has a unique, descriptive `<title>` and `<meta description>` (already set up — follow the same pattern for new pages).
- Consider a sitemap.xml once you have 10+ pages, and submit it in Google Search Console.
