/*
 * Free Writing & Editing Tools — client-side search
 * Reads tools.json, renders cards, and filters entirely in the browser.
 */

const TOOLS_URL = "tools.json";

const state = {
  tools: [],
  categories: [],
  search: "",
  category: "all"
};

const els = {
  list: document.getElementById("tool-list"),
  template: document.getElementById("tool-card"),
  count: document.getElementById("count"),
  noResults: document.getElementById("no-results"),
  search: document.getElementById("search"),
  filters: document.querySelectorAll(".filter-btn")
};

async function loadTools() {
  const response = await fetch(TOOLS_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Failed to load ${TOOLS_URL}: ${response.status}`);
  const data = await response.json();

  state.tools = data.tools || [];
  state.categories = data.categories || [];

  render();
}

function matchesSearch(tool, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const haystack = [
    tool.name,
    tool.category,
    tool.description,
    tool.cost,
    tool.platform.join(" "),
    tool.steps.join(" ")
  ].join(" ").toLowerCase();
  return haystack.includes(q);
}

function filteredTools() {
  return state.tools.filter((tool) => {
    if (state.category !== "all" && tool.category !== state.category) return false;
    return matchesSearch(tool, state.search);
  });
}

function platformPills(tool) {
  return tool.platform.map((p) => `<span>${escapeHtml(p)}</span>`).join("");
}

function render() {
  const results = filteredTools();

  els.count.textContent = `${results.length} tool${results.length !== 1 ? "s" : ""}`;
  els.noResults.hidden = results.length > 0;

  // Clear list but keep template in DOM (it lives outside the list)
  while (els.list.firstChild) els.list.removeChild(els.list.firstChild);

  // Group by category for readable sections
  const grouped = {};
  for (const tool of results) {
    (grouped[tool.category] = grouped[tool.category] || []).push(tool);
  }

  const categoryOrder = state.categories.map((c) => c.id);
  const orderedKeys = categoryOrder.filter((k) => grouped[k]);
  const remaining = Object.keys(grouped).filter((k) => !categoryOrder.includes(k));

  [...orderedKeys, ...remaining].forEach((catId) => {
    const cat = state.categories.find((c) => c.id === catId) || { label: catId };
    const section = document.createElement("section");
    section.className = "grid-section";
    const heading = document.createElement("h2");
    heading.className = "section-heading";
    heading.textContent = cat.label;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid";
    grouped[catId].forEach((tool) => {
      const card = els.template.content.cloneNode(true).firstElementChild;
      card.dataset.category = tool.category;

      card.querySelector(".card-name").textContent = tool.name;
      const costBadge = card.querySelector(".badge-cost");
      costBadge.textContent = tool.cost;
      card.querySelector(".card-desc").textContent = tool.description;
      card.querySelector(".meta-platform").innerHTML = platformPills(tool);
      card.querySelector(".meta-account").textContent = tool.accountRequired ? "Account required" : "No account needed";

      const stepsOl = card.querySelector(".card-steps ol");
      for (const step of tool.steps) {
        const li = document.createElement("li");
        li.textContent = step;
        stepsOl.appendChild(li);
      }

      const link = card.querySelector(".card-link");
      link.href = tool.link;
      link.innerHTML = escapeHtml(tool.link.replace(/^https?:\/\//, "")) + " &rarr;";

      grid.appendChild(card);
    });
    section.appendChild(grid);
    els.list.appendChild(section);
  });
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[ch] || ch;
  });
}

function setupListeners() {
  els.search.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });

  els.filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.category = btn.dataset.category;
      els.filters.forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
  });
}

loadTools().catch((err) => {
  els.list.hidden = true;
  els.count.textContent = "Unable to load tools.";
  els.noResults.hidden = true;
  console.error(err);
});

setupListeners();
