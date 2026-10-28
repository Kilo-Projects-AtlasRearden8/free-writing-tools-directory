# Free Writing & Editing Tools

A no-account, no-affiliate directory of free writing and editing tools:
word processors, distraction-free editors, grammar help, name generators,
and ebook converters. Built and published by **Asdale Dynamics, LLC**.

Dylan Asdale is a registered nurse turned AI author and founder of
ASDALE DYNAMICS, LLC (Indiana, formed October 2026). His book *The Massive
AI Manual* and hub site dylanasdale.github.io explain AI "like a friend
would": plain English, step by step, never condescending.

## What this is

A static site (Markdown + HTML with client-side search) listing free tools
that require no account to use. Every entry shows cost, platform, steps to
get started, and the official link. No affiliate links, no tracking, no
personal data collected.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Static site with client-side search and category filters |
| `style.css` | Site styles |
| `script.js` | Loads `tools.json`, renders cards, filters in-browser |
| `tools.json` | Structured tool data (single source for the site) |
| `tools.md` | Human-readable Markdown directory of the same tools |
| `LICENSE` | MIT License — Copyright (c) 2026 Asdale Dynamics, LLC |
| `STATUS.md` | Build, run, and verification notes |
| `README.md` | This file |

## How to run

No build step is required. Open `index.html` in any modern browser, or serve
the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

The site loads `tools.json` and performs all search and filtering
client-side. Nothing is sent to a server.

## Credits

Published by Asdale Dynamics, LLC. Beginner-friendly AI education, books
and guides, practical tools, and small-business/author resources.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See `LICENSE`.
