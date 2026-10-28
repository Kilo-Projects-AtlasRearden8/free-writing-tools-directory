# STATUS — Free Writing & Editing Tools directory

## What was built

A static, no-account, no-affiliate directory of free writing and editing
tools for Asdale Dynamics, LLC (Dylan Asdale, Indiana, formed Oct 2026).
Categories: word processors, distraction-free editors, grammar & style help,
name generators, and ebook converters.

Files:
- `index.html` — static site with category filter buttons and client-side search
- `style.css` — responsive styles
- `script.js` — loads `tools.json`, renders tool cards, filters entirely in the browser
- `tools.json` — structured tool data (13 tools across 5 categories); single source for the site
- `tools.md` — human-readable Markdown directory mirroring `tools.json`
- `README.md` — project overview, credits Asdale Dynamics, LLC
- `LICENSE` — MIT License, copyright line exactly: `Copyright (c) 2026 Asdale Dynamics, LLC`
- `STATUS.md` — this file

Each tool entry: name, category, cost ("Free"), platform(s), short description,
steps to get started, official link, account required (false for all), no
affiliate links.

## How to run

No build step. Open `index.html` in any modern browser, or serve the folder:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

The site fetches `tools.json` and runs all search/filter logic client-side;
nothing is sent to a server.

## Verification results

- `python3 -m json.tool tools.json` — valid JSON; 13 tools, 5 categories, all
  `accountRequired: false`
- `node --check script.js` — syntax OK
- `python3 -m http.server 8000` + `curl` — `index.html` and `tools.json` served
  with HTTP 200; `tools.json` re-parses as valid JSON over HTTP; `index.html`
  references `style.css` and `script.js`
- No `.github/workflows` files present; no secrets, API keys, or personal data
  in any file
- LICENSE copyright line verified exactly: `Copyright (c) 2026 Asdale Dynamics, LLC`
- Asdale Dynamics, LLC credited in `README.md`, `tools.md`, `index.html` header,
  and `LICENSE`

## Known gaps

- No automated test suite or linter configured (static HTML/JS/CSS; verified
  manually via JSON validation, Node syntax check, and local HTTP serve)
- Search is a simple substring match across name/category/description/platform/steps
- Tool data is hand-maintained; no link-validity checker runs against official URLs
- Desktop availability claims (Windows/macOS/Linux) reflect publisher listings at time of writing

## Git

Initialized and committed locally with the existing git identity (Dylan Asdale).
No remote created; nothing pushed or published.
