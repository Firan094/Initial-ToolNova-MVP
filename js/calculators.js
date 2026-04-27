function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function calculateFreelance() {
  const rate = Number(document.querySelector("#hourlyRate")?.value || 0);
  const hours = Number(document.querySelector("#hoursWeek")?.value || 0);
  const monthly = rate * hours * 4;
  document.querySelector("#freelanceResult").textContent = `${money(monthly)} / month estimated`;
}

function calculateWebsite() {
  const pages = Number(document.querySelector("#sitePages")?.value || 0);
  const price = Number(document.querySelector("#pricePage")?.value || 0);
  const total = pages * price;
  document.querySelector("#websiteResult").textContent = `${money(total)} estimated project value`;
}

function calculateAI() {
  const count = Number(document.querySelector("#toolCount")?.value || 0);
  const price = Number(document.querySelector("#toolPrice")?.value || 0);
  const total = count * price;
  document.querySelector("#aiResult").textContent = `${money(total)} / month estimated`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('[data-calc="freelance"]')?.addEventListener("click", calculateFreelance);
  document.querySelector('[data-calc="website"]')?.addEventListener("click", calculateWebsite);
  document.querySelector('[data-calc="ai"]')?.addEventListener("click", calculateAI);

  calculateFreelance();
  calculateWebsite();
  calculateAI();
});
