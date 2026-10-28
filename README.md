# Free Writing & Editing Tools

A friendly, no-account, no-affiliate directory of free writing and editing
tools — word processors, distraction-free editors, grammar help, name
generators, and ebook converters.

Published by **Asdale Dynamics, LLC**.

## Who this is for

This directory is put together by Dylan Asdale, a registered nurse turned AI
author and founder of ASDALE DYNAMICS, LLC (Indiana, formed October 2026).
Through his book *The Massive AI Manual* and hub site
[dylanasdale.github.io](https://dylanasdale.github.io), Dylan explains AI
"like a friend would": plain English, step by step, never condescending.

ASDALE DYNAMICS, LLC focuses on beginner-friendly AI education, books and
guides, and practical tools the LLC can publish or sell — including
no-nonsense resources like this one for writers, authors, and anyone who just
wants to get words on the page without signing up for anything.

## What this is

A simple, static directory (Markdown plus an HTML site with client-side
search) of free tools that require **no account to use**. Every entry lists:

- **Cost** — every tool here is free
- **Platform** — what it runs on
- **Steps** — how to get started, step by step
- **Official link** — straight to the maker's site

There are **no affiliate links**, no tracking, and no personal data
collected. Nothing you type or search is sent anywhere — it all happens in
your own browser.

## The tools

| # | Tool | Category | Platform | Cost | Official link |
|---|------|----------|----------|------|---------------|
| 1 | LibreOffice Writer | Word Processors | Windows, macOS, Linux | Free | https://www.libreoffice.org/ |
| 2 | Apache OpenOffice Writer | Word Processors | Windows, macOS, Linux | Free | https://www.openoffice.org/ |
| 3 | ONLYOFFICE Desktop Editors | Word Processors | Windows, macOS, Linux | Free | https://www.onlyoffice.com/ |
| 4 | FocusWriter | Distraction-Free Editors | Windows, macOS, Linux | Free | https://gottcode.org/focuswriter/ |
| 5 | WriteMonkey | Distraction-Free Editors | Windows | Free (donationware) | https://writemonkey.com/ |
| 6 | Calmly Writer | Distraction-Free Editors | Web | Free (web) | https://calmlywriter.com/ |
| 7 | Hemingway Editor (web) | Grammar & Style Help | Web | Free (web) | https://www.hemingwayapp.com/ |
| 8 | LanguageTool | Grammar & Style Help | Web, Windows, macOS, Linux | Free | https://languagetool.org/ |
| 9 | Slick Write | Grammar & Style Help | Web | Free | https://www.slickwrite.com/ |
| 10 | Reedsy Character Name Generator | Name Generators | Web | Free | https://blog.reedsy.com/character-name-generator/ |
| 11 | Fantasy Name Generators | Name Generators | Web | Free | https://www.fantasy-name-generators.com/ |
| 12 | Calibre | Ebook Converters | Windows, macOS, Linux | Free | https://calibre-ebook.com/ |
| 13 | Online Convert (Ebook Converter) | Ebook Converters | Web | Free | https://www.online-convert.com/ |

For the full step-by-step instructions for each tool, see
[`tools.md`](./tools.md) or open the HTML site at [`index.html`](./index.html).

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Static site with client-side search and category filters |
| `style.css` | Site styles |
| `script.js` | Loads `tools.json`, renders cards, filters in-browser |
| `tools.json` | Structured tool data (single source for the site) |
| `tools.md` | Human-readable Markdown directory of the same tools |
| `LICENSE` | MIT License — Copyright (c) 2026 Asdale Dynamics, LLC |
| `verify.js` | Verification script (runs with `npm test`) |
| `package.json` | Project metadata and test script |
| `STATUS.md` | Build, run, and verification notes |
| `README.md` | This file |

## How to run

No build step is required. Just open [`index.html`](./index.html) in any
modern browser.

Or serve the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

The site loads `tools.json` and does all searching and filtering right in
your browser. Nothing is sent to a server.

## Verify it

This project includes a small verification script that checks every tool has
a cost, platform, steps, and official link; that every tool is no-account;
that there are no affiliate links; and that the LICENSE and README credit
Asdale Dynamics, LLC.

```bash
npm test
```

## Credits

Published by **Asdale Dynamics, LLC** — beginner-friendly AI education,
books and guides, and practical tools for writers, authors, and small
businesses.

Dylan Asdale, founder | Indiana, formed October 2026

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See [`LICENSE`](./LICENSE).
