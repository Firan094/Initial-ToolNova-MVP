function setupNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function priceClass(pricing) {
  if (pricing === "Free" || pricing === "Freemium") return "free";
  if (pricing === "Paid") return "paid";
  return "";
}

function toolUrl(tool) {
  return `tool.html?slug=${encodeURIComponent(tool.slug)}`;
}

function articleUrl(guide) {
  return `article.html?slug=${encodeURIComponent(guide.slug)}`;
}

function toolCard(tool) {
  return `
    <article class="tool-card">
      <div class="tool-top">
        <div class="tool-logo">${tool.initials}</div>
        <div>
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
        </div>
      </div>
      <div class="tool-meta">
        <span class="badge">${tool.category}</span>
        <span class="badge ${priceClass(tool.pricing)}">${tool.pricing}</span>
        <span class="badge rating">★ ${tool.rating}</span>
      </div>
      <p><strong>Best for:</strong> ${tool.bestFor}</p>
      <div class="tool-actions">
        <a href="${toolUrl(tool)}" aria-label="View ${tool.name} details">View details →</a>
        <a href="affiliate-disclosure.html">Disclosure</a>
      </div>
    </article>
  `;
}

function guideCard(guide) {
  return `
    <a class="article-card" href="${articleUrl(guide)}">
      <span class="tag">${guide.tag}</span>
      <h3>${guide.title}</h3>
      <p>${guide.description}</p>
      <span class="text-link">Read guide →</span>
    </a>
  `;
}

function renderFeaturedTools() {
  const target = document.querySelector("[data-featured-tools]");
  if (!target || typeof tools === "undefined") return;
  target.innerHTML = tools.slice(0, 6).map(toolCard).join("");
}

function renderHomeGuides() {
  const target = document.querySelector("[data-home-guides]");
  if (!target || typeof guides === "undefined") return;
  target.innerHTML = guides.slice(0, 6).map(guideCard).join("");
}

function populateFilters() {
  const categoryFilter = document.querySelector("#categoryFilter");
  if (!categoryFilter || typeof tools === "undefined") return;

  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];
  categoryFilter.innerHTML = categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const query = params.get("q");
  if (category && categories.includes(category)) categoryFilter.value = category;
  const search = document.querySelector("#toolSearch");
  if (query && search) search.value = query;
}

function renderToolsList() {
  const target = document.querySelector("[data-tools-list]");
  if (!target || typeof tools === "undefined") return;

  const search = document.querySelector("#toolSearch");
  const category = document.querySelector("#categoryFilter");
  const price = document.querySelector("#priceFilter");

  const query = (search?.value || "").toLowerCase().trim();
  const selectedCategory = category?.value || "All";
  const selectedPrice = price?.value || "All";

  const filtered = tools.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.bestFor.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesPrice = selectedPrice === "All" || tool.pricing === selectedPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  const resultCount = document.querySelector("#toolResultCount");
  if (resultCount) {
    const toolLabel = filtered.length === 1 ? "tool" : "tools";
    const categoryText = selectedCategory === "All" ? "all categories" : selectedCategory;
    const priceText = selectedPrice === "All" ? "all pricing" : selectedPrice;

    resultCount.textContent = `Showing ${filtered.length} ${toolLabel} • ${categoryText} • ${priceText}`;
  }

  target.innerHTML = filtered.length
    ? filtered.map(toolCard).join("")
    : `<div class="content-card"><h2>No tools found</h2><p>Try a different search or category. Even Google needs a second chance sometimes.</p></div>`;
}

function setupToolFilters() {
  const search = document.querySelector("#toolSearch");
  const category = document.querySelector("#categoryFilter");
  const price = document.querySelector("#priceFilter");
  const clearButton = document.querySelector("#clearFilters");

  const inputs = [search, category, price].filter(Boolean);

  if (!inputs.length) return;

  inputs.forEach((input) => input.addEventListener("input", renderToolsList));
  inputs.forEach((input) => input.addEventListener("change", renderToolsList));

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (search) search.value = "";
      if (category) category.value = "All";
      if (price) price.value = "All";
      renderToolsList();
    });
  }
}

function renderGuides() {
  const target = document.querySelector("[data-guides-list]");
  if (!target || typeof guides === "undefined") return;
  target.innerHTML = guides.map(guideCard).join("");
}

function renderToolDetail() {
  const target = document.querySelector("[data-tool-detail]");
  if (!target || typeof tools === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const tool = tools.find((item) => item.slug === slug) || tools[0];

  document.title = `${tool.name} — ToolNova`;

  target.innerHTML = `
    <div class="detail-hero">
      <p class="eyebrow"><span></span> Tool review</p>
      <h1>${tool.name}</h1>
      <p>${tool.longDescription}</p>
      <div class="tool-meta">
        <span class="badge">${tool.category}</span>
        <span class="badge ${priceClass(tool.pricing)}">${tool.pricing}</span>
        <span class="badge rating">★ ${tool.rating}</span>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-panel">
        <h2>What it is best for</h2>
        <p><strong>${tool.bestFor}</strong></p>
        <h3>Why people use it</h3>
        <ul class="detail-list">${tool.pros.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h3>Things to watch</h3>
        <ul class="detail-list">${tool.cons.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <aside class="detail-aside">
        <div class="info-stack">
          <div class="info-box">
            <h3>Pricing</h3>
            <p>${tool.pricing}</p>
          </div>
          <div class="info-box">
            <h3>Best for</h3>
            <p>${tool.bestFor}</p>
          </div>
          <div class="info-box">
            <h3>Verdict</h3>
            <p>Good option if this matches your use case. Do not buy software out of boredom.</p>
          </div>
        </div>
        <div class="detail-actions">
          <a class="btn btn-primary" href="${tool.link}">Visit tool</a>
          <a class="btn btn-secondary" href="tools.html">Back to tools</a>
        </div>
      </aside>
    </div>
  `;
}

function renderArticleDetail() {
  const target = document.querySelector("[data-article-detail]");
  if (!target || typeof guides === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const guide = guides.find((item) => item.slug === slug) || guides[0];

  document.title = `${guide.title} — ToolNova`;

  target.innerHTML = `
    <div class="detail-hero">
      <p class="eyebrow"><span></span> ${guide.tag}</p>
      <h1>${guide.title}</h1>
      <p>${guide.intro}</p>
    </div>
    <div class="detail-grid">
      <div class="detail-panel">
        ${guide.sections.map((section) => `
          <section>
            <h2>${section.heading}</h2>
            <p>${section.body}</p>
          </section>
        `).join("")}
      </div>
      <aside class="detail-aside">
        <div class="info-stack">
          <div class="info-box">
            <h3>Quick summary</h3>
            <p>${guide.description}</p>
          </div>
          <div class="info-box">
            <h3>Next step</h3>
            <p>Use the tools directory to apply the guide with real tools.</p>
          </div>
          <div class="info-box">
            <h3>Suggested path</h3>
            <p>Read guide → choose tool → apply workflow → improve outcome.</p>
          </div>
        </div>
        <div class="detail-actions">
          <a class="btn btn-primary" href="tools.html">Explore tools</a>
          <a class="btn btn-secondary" href="guides.html">Back to guides</a>
        </div>
      </aside>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  renderFeaturedTools();
  renderHomeGuides();
  populateFilters();
  renderToolsList();
  setupToolFilters();
  renderGuides();
  renderToolDetail();
  renderArticleDetail();
});
