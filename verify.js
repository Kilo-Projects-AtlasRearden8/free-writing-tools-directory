/*
 * Free Writing & Editing Tools — verification script
 * Validates tools.json against the directory requirements:
 *   - every tool has required fields (cost, platform, steps, link)
 *   - every tool is no-account (accountRequired === false)
 *   - no affiliate links (affiliate === false, no affiliate markers in URLs)
 *   - all five required categories are present
 *   - LICENSE copyright line is exact
 *   - README credits Asdale Dynamics, LLC
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
let failures = 0;

function fail(msg) {
  failures += 1;
  console.error(`FAIL: ${msg}`);
}

function pass(msg) {
  console.log(`ok: ${msg}`);
}

// 1. tools.json parses and has expected shape
let data;
try {
  data = JSON.parse(fs.readFileSync(path.join(ROOT, "tools.json"), "utf8"));
} catch (err) {
  fail(`tools.json is not valid JSON: ${err.message}`);
  process.exitCode = 1;
  process.exit(1);
}

const requiredToolFields = [
  "id",
  "name",
  "category",
  "cost",
  "platform",
  "description",
  "steps",
  "link",
  "accountRequired",
  "affiliate"
];

const requiredCategories = [
  "word-processors",
  "distraction-free",
  "grammar-help",
  "name-generators",
  "ebook-converters"
];

const categoryIds = (data.categories || []).map((c) => c.id);
for (const cat of requiredCategories) {
  if (!categoryIds.includes(cat)) {
    fail(`missing required category: ${cat}`);
  } else {
    pass(`category present: ${cat}`);
  }
}

if (!Array.isArray(data.tools) || data.tools.length === 0) {
  fail("tools.json must contain a non-empty tools array");
} else {
  pass(`tools array present with ${data.tools.length} tools`);
}

// 2. Each tool validates
for (const tool of data.tools) {
  const prefix = `tool "${tool.name || tool.id}"`;

  for (const field of requiredToolFields) {
    if (!(field in tool)) {
      fail(`${prefix}: missing field "${field}"`);
    }
  }

  if (typeof tool.cost !== "string" || tool.cost.trim().length === 0) {
    fail(`${prefix}: cost must be a non-empty string`);
  } else {
    pass(`${prefix}: cost = "${tool.cost}"`);
  }

  if (!Array.isArray(tool.platform) || tool.platform.length === 0) {
    fail(`${prefix}: platform must be a non-empty array`);
  } else {
    pass(`${prefix}: platform = [${tool.platform.join(", ")}]`);
  }

  if (!Array.isArray(tool.steps) || tool.steps.length === 0) {
    fail(`${prefix}: steps must be a non-empty array`);
  } else {
    pass(`${prefix}: ${tool.steps.length} step(s)`);
  }

  if (
    typeof tool.link !== "string" ||
    !/^https?:\/\/.+/.test(tool.link)
  ) {
    fail(`${prefix}: link must be a valid http(s) URL`);
  } else {
    pass(`${prefix}: official link = ${tool.link}`);
  }

  if (tool.accountRequired !== false) {
    fail(`${prefix}: accountRequired must be false (no-account tools only)`);
  } else {
    pass(`${prefix}: no account required`);
  }

  if (tool.affiliate !== false) {
    fail(`${prefix}: affiliate must be false (no affiliate links)`);
  } else {
    pass(`${prefix}: not an affiliate link`);
  }

  // Affiliate-marker scan on the URL itself
  const affiliateMarkers = [
    "ref=", "refid=", "aff=", "affiliate", "partner=", "utm_source",
    "tracking=", "subid=", "cmpid="
  ];
  const lowerLink = tool.link.toLowerCase();
  for (const marker of affiliateMarkers) {
    if (lowerLink.includes(marker)) {
      fail(`${prefix}: link appears to contain affiliate marker "${marker}"`);
    }
  }
}

// 3. All tools are no-account
const allNoAccount = data.tools.every((t) => t.accountRequired === false);
if (allNoAccount) {
  pass("all tools are no-account");
} else {
  fail("not all tools are no-account");
}

// 4. No affiliate links
const noAffiliate = data.tools.every((t) => t.affiliate === false);
if (noAffiliate) {
  pass("no affiliate links declared");
} else {
  fail("affiliate links declared");
}

// 5. LICENSE copyright line is exact
const licensePath = path.join(ROOT, "LICENSE");
if (fs.existsSync(licensePath)) {
  const license = fs.readFileSync(licensePath, "utf8");
  const expected = "Copyright (c) 2026 Asdale Dynamics, LLC";
  if (license.includes(expected)) {
    pass('LICENSE contains exact copyright line: "Copyright (c) 2026 Asdale Dynamics, LLC"');
  } else {
    fail('LICENSE missing exact copyright line: "Copyright (c) 2026 Asdale Dynamics, LLC"');
  }
} else {
  fail("LICENSE file not found");
}

// 6. README credits Asdale Dynamics, LLC
const readmePath = path.join(ROOT, "README.md");
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, "utf8");
  if (/Asdale Dynamics, LLC/i.test(readme)) {
    pass("README credits Asdale Dynamics, LLC");
  } else {
    fail("README does not credit Asdale Dynamics, LLC");
  }
} else {
  fail("README.md not found");
}

// 7. tools.md credits Asdale Dynamics, LLC
const mdPath = path.join(ROOT, "tools.md");
if (fs.existsSync(mdPath)) {
  const md = fs.readFileSync(mdPath, "utf8");
  if (/Asdale Dynamics, LLC/i.test(md)) {
    pass("tools.md credits Asdale Dynamics, LLC");
  } else {
    fail("tools.md does not credit Asdale Dynamics, LLC");
  }
} else {
  fail("tools.md not found");
}

console.log("");
if (failures === 0) {
  console.log(`All checks passed (${data.tools.length} tools, ${requiredCategories.length} categories).`);
  process.exitCode = 0;
} else {
  console.log(`${failures} check(s) failed.`);
  process.exitCode = 1;
}
