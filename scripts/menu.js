// scripts/menu.js — filtering and lazy-loading for product grids (mobile-first)

document.addEventListener("DOMContentLoaded", () => {
  // Category filter click handler (expects .category-pill elements)
  const filterContainer = document.querySelector(".category-filters");
  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-pill");
      if (!btn) return;
      const category = btn.getAttribute("data-category");
      // toggle active state
      filterContainer
        .querySelectorAll(".category-pill")
        .forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(category);
    });
  }

  function applyFilter(category) {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category") || "";
      if (
        !category ||
        category === "all" ||
        cat
          .split(",")
          .map((s) => s.trim())
          .includes(category)
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Lazy-loading images using IntersectionObserver for images with data-src
  const lazyImages = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window && lazyImages.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            obs.unobserve(img);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    lazyImages.forEach((img) => io.observe(img));
  } else {
    // fallback: load immediately
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
});
