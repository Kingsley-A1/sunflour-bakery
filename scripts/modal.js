// scripts/modal.js — accessible quick-view modal for product cards
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  if (!modal) return; // modal not present

  const modalPanel = modal.querySelector(".modal-panel");
  const closeBtn = modal.querySelector(".modal-close");
  const btnClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalTags = document.getElementById("modalTags");
  const modalDesc = document.getElementById("modalDesc");
  const modalOrder = document.getElementById("modalOrder");

  let lastFocused = null;

  // Utility: get product data from a product-card element
  function extractProductData(card) {
    const titleEl = card.querySelector(".product-title");
    const imgEl = card.querySelector(".product-image");
    const tagsEl = card.querySelector(".product-tags");
    const descEl = card.querySelector(".product-desc");
    return {
      title: titleEl ? titleEl.textContent.trim() : "",
      image: imgEl ? imgEl.getAttribute("src") : "",
      alt: imgEl ? imgEl.getAttribute("alt") || "" : "",
      tags: tagsEl ? tagsEl.textContent.trim() : "",
      desc: descEl ? descEl.textContent.trim() : "",
    };
  }

  function openModalWithData(data, sourceBtn) {
    lastFocused = sourceBtn || document.activeElement;
    modalImage.src = data.image || "assets/images/sample-bread.jpg";
    modalImage.alt = data.alt || data.title || "Product image";
    modalTitle.textContent = data.title || "";
    modalTags.textContent = data.tags || "";
    modalDesc.textContent = data.desc || "";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // focus management
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function")
      lastFocused.focus();
  }

  // Event delegation: open when any quickview button clicked
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="quickview"]');
    if (!btn) return;
    const card = btn.closest(".product-card");
    if (!card) return;
    const data = extractProductData(card);
    openModalWithData(data, btn);
  });

  // close handlers
  closeBtn.addEventListener("click", closeModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);

  // click outside panel closes
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
    // trap tab inside modal when open
    if (e.key === "Tab" && modal.classList.contains("open")) {
      const focusable = Array.from(
        modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Order button should add the modal product to cart and go to checkout
  modalOrder.addEventListener("click", () => {
    const product = {
      id: null,
      title: modalTitle ? modalTitle.textContent.trim() : "Product",
      image: modalImage ? modalImage.getAttribute("src") : "",
      alt: modalImage ? modalImage.getAttribute("alt") || "" : "",
      tags: modalTags ? modalTags.textContent.trim() : "",
      desc: modalDesc ? modalDesc.textContent.trim() : "",
      price: (function () {
        const m =
          modalTags && modalTags.textContent
            ? modalTags.textContent.match(/₦\s*([\d,]+)/)
            : null;
        return m && m[1] ? Number(m[1].replace(/,/g, "")) : 0;
      })(),
    };
    const order = JSON.parse(localStorage.getItem("sunflourOrder") || "[]");
    const existing = order.find((i) => i.title === product.title);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      order.push({ ...product, quantity: 1 });
    }
    try {
      localStorage.setItem("sunflourOrder", JSON.stringify(order));
    } catch (err) {}
    closeModal();
    window.sfToast.success("Added to cart");
    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 450);
  });
});
