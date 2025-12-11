// scripts/checkout.js — checkout page logic
document.addEventListener("DOMContentLoaded", () => {
  const orderItems = document.getElementById("orderItems");
  const totalPrice = document.getElementById("totalPrice");
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const cardForm = document.getElementById("cardForm");
  const confirmBankPayment = document.getElementById("confirmBankPayment");

  // Load order from localStorage (assuming products are stored there)
  const order = JSON.parse(localStorage.getItem("sunflourOrder") || "[]");
  let delivery = 200;
  let discount = 0;

  function formatPrice(n) {
    return "₦" + Number(n || 0).toLocaleString();
  }

  function renderOrder() {
    orderItems.innerHTML = "";
    if (order.length === 0) {
      orderItems.innerHTML = "<p>No items in order.</p>";
      document.getElementById("itemsCount").textContent = "0";
      document.getElementById("subtotalPrice").textContent = formatPrice(0);
      document.getElementById("totalPrice").textContent = formatPrice(0);
      return;
    }

    let subtotal = 0;
    order.forEach((item, index) => {
      const qty = item.quantity || 1;
      subtotal += item.price * qty;

      const itemDiv = document.createElement("div");
      itemDiv.className = "order-item";
      itemDiv.innerHTML = `
        <img src="${
          item.image ||
          "assets/images/sourdough_bread.png"
        }" alt="${item.title}">
        <div>
          <h4>${item.title}</h4>
          <div class="meta">₦${item.price.toLocaleString()} • ${
        item.tags || ""
      }</div>
        </div>
        <div style="text-align:right">
          <div class="quantity-controls" data-index="${index}">
            <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
            <span class="qty-display" data-index="${index}">${qty}</span>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
          </div>
          <div class="item-subtotal">${formatPrice(item.price * qty)}</div>
        </div>
      `;
      orderItems.appendChild(itemDiv);
    });

    document.getElementById("itemsCount").textContent = order.length;
    document.getElementById("subtotalPrice").textContent =
      formatPrice(subtotal);
    const total = Math.max(0, subtotal + delivery - discount);
    document.getElementById("totalPrice").textContent = formatPrice(total);
  }

  renderOrder();

  // Quantity controls (event delegation) - update DOM and totals without reload
  orderItems.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    const action = btn.dataset.action;
    const index = Number(btn.dataset.index);
    const item = order[index];
    if (!item) return;
    item.quantity = item.quantity || 1;
    if (action === "increase") item.quantity++;
    if (action === "decrease" && item.quantity > 1) item.quantity--;
    localStorage.setItem("sunflourOrder", JSON.stringify(order));
    // animate qty change
    const display = orderItems.querySelector(
      `.qty-display[data-index="${index}"]`
    );
    if (display) {
      display.classList.add("bump");
      display.addEventListener(
        "animationend",
        () => display.classList.remove("bump"),
        { once: true }
      );
    }
    renderOrder();
    window.sfToast.info("Quantity updated", 1200);
  });

  // Payment tab switching
  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      paymentTabs.forEach((t) => t.classList.remove("active"));
      paymentMethods.forEach((m) => m.classList.remove("active"));
      tab.classList.add("active");
      const method = tab.dataset.method;
      document.getElementById(method + "Payment").classList.add("active");
    });
  });

  // Promo code logic
  const promoInput = document.getElementById("promoCode");
  const applyPromo = document.getElementById("applyPromo");
  if (applyPromo && promoInput) {
    applyPromo.addEventListener("click", () => {
      const code = (promoInput.value || "").trim().toUpperCase();
      if (!code) {
        window.sfToast.error("Enter a promo code");
        return;
      }
      // simple promo rules
      if (code === "SUN10") {
        // 10% off
        const subtotal = order.reduce(
          (s, i) => s + i.price * (i.quantity || 1),
          0
        );
        discount = Math.round(subtotal * 0.1);
        window.sfToast.success("Promo applied: 10% off");
      } else if (code === "WELCOME100") {
        discount = 100;
        window.sfToast.success("Promo applied: ₦100 off");
      } else {
        window.sfToast.error("Promo code not recognized");
        return;
      }
      renderOrder();
    });
  }

  // Bank transfer confirmation
  confirmBankPayment.addEventListener("click", () => {
    window.sfToast.success(
      "Thank you! We will process your order once payment is confirmed."
    );
    localStorage.removeItem("sunflourOrder");
    setTimeout(() => (window.location.href = "index.html"), 900);
  });

  // Card payment form
  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Simulate payment processing
    window.sfToast.success("Payment successful! Your order has been placed.");
    localStorage.removeItem("sunflourOrder");
    setTimeout(() => (window.location.href = "index.html"), 900);
  });
});
