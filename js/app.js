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
  const score = Number(tool.rating);
  const trustNote = score >= 4.6
    ? "Strong pick"
    : score >= 4.3
      ? "Worth testing"
      : "Use-case dependent";

  const pricingNote = tool.pricing === "Paid"
    ? "Paid tool — test fit first"
    : tool.pricing === "Free"
      ? "Free option available"
      : "Free plan available";

  return `
    <article class="tool-card">
      <div class="tool-top">
        <div class="tool-logo">${tool.initials}</div>
        <div>
          <h3>${tool.name}</h3>
          <p class="tool-desc">${tool.description}</p>
        </div>
      </div>

      <div class="tool-meta">
        <span class="badge">${tool.category}</span>
        <span class="badge ${priceClass(tool.pricing)}">${tool.pricing}</span>
        <span class="badge rating">★ ${tool.rating}</span>
      </div>

      <div class="tool-insights">
        <div>
          <span>Best for</span>
          <strong>${tool.bestFor}</strong>
        </div>
        <div>
          <span>Pricing note</span>
          <strong>${pricingNote}</strong>
        </div>
        <div>
          <span>ToolNova verdict</span>
          <strong>${trustNote}</strong>
        </div>
      </div>

      <div class="tool-actions">
        <a class="tool-link primary-tool-link" href="${toolUrl(tool)}" aria-label="View ${tool.name} details">View details →</a>
        <a class="tool-link" href="affiliate-disclosure.html">Disclosure</a>
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

  const score = Number(tool.rating);
  const trustVerdict = score >= 4.6
    ? "Strong pick for most people in this use case."
    : score >= 4.3
      ? "Worth testing before paying for a full plan."
      : "Useful for the right person, but compare alternatives first.";

  const pricingAdvice = tool.pricing === "Paid"
    ? "This is a paid tool. Test the workflow fit before spending money."
    : tool.pricing === "Free"
      ? "This can be a good low-risk starting point because a free option is available."
      : "Start with the free plan, then upgrade only if it saves real time.";

  const audienceText = `Best for people who need help with ${tool.bestFor.toLowerCase()} and want a practical tool instead of another shiny distraction.`;

  const avoidText = tool.pricing === "Paid"
    ? "Avoid paying immediately if you are not sure this tool solves a real problem for you."
    : "Avoid it if you only want to collect tools but do not have a clear task to complete.";

  const workflowSteps = [
    `Define one task: ${tool.bestFor}.`,
    "Test the tool with a small real project.",
    "Compare the result with your current workflow.",
    "Keep it only if it saves time, improves quality, or reduces stress."
  ];

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
        <section class="detail-section">
          <h2>What it is best for</h2>
          <p><strong>${tool.bestFor}</strong></p>
          <p>${audienceText}</p>
        </section>

        <section class="detail-section">
          <h2>Who should use this tool?</h2>
          <p>
            Use ${tool.name} if your main goal fits this category:
            <strong>${tool.category}</strong>. It is especially useful when you need a faster,
            cleaner, or more organized way to handle ${tool.bestFor.toLowerCase()}.
          </p>
        </section>

        <section class="detail-section">
          <h2>Why people use it</h2>
          <ul class="detail-list">
            ${tool.pros.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>

        <section class="detail-section">
          <h2>Things to watch</h2>
          <ul class="detail-list">
            ${tool.cons.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>

        <section class="detail-section">
          <h2>Avoid this tool if...</h2>
          <p>${avoidText}</p>
        </section>

        <section class="detail-section">
          <h2>Quick workflow</h2>
          <ol class="detail-list numbered-list">
            ${workflowSteps.map((item) => `<li>${item}</li>`).join("")}
          </ol>
        </section>
      </div>

      <aside class="detail-aside">
        <div class="info-stack">
          <div class="info-box">
            <h3>Pricing</h3>
            <p>${tool.pricing}</p>
            <small>${pricingAdvice}</small>
          </div>

          <div class="info-box">
            <h3>Best for</h3>
            <p>${tool.bestFor}</p>
          </div>

          <div class="info-box verdict-box">
            <h3>ToolNova verdict</h3>
            <p>${trustVerdict}</p>
          </div>

          <div class="info-box">
            <h3>Before you pay</h3>
            <p>Ask: does this tool save time, improve output, or help me earn more? If not, keep your money. It has suffered enough.</p>
          </div>
        </div>

        <div class="detail-actions">
          ${
            tool.link === "#"
              ? `<a class="btn btn-primary is-disabled" href="tools.html">Official link coming soon</a>`
              : `<a class="btn btn-primary" href="${tool.link}" target="_blank" rel="noopener">Visit tool</a>`
          }
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
