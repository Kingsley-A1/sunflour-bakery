// scripts/catering.js — enhanced multi-step catering form with animations and better UX
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cateringForm");
  if (!form) return;

  const steps = form.querySelectorAll(".form-step");
  const progressSteps = form.querySelectorAll(".progress-step");
  const formSuccess = document.getElementById("formSuccess");
  let currentStep = 0;

  function showStep(stepIndex, direction = "forward") {
    // Hide current step with animation
    if (steps[currentStep]) {
      steps[currentStep].style.animation =
        direction === "forward"
          ? "slideOutLeft .3s ease"
          : "slideOutRight .3s ease";
      setTimeout(() => {
        steps[currentStep].classList.remove("active");
        steps[currentStep].style.animation = "";
      }, 300);
    }

    // Show new step with animation
    setTimeout(() => {
      steps.forEach((step, i) =>
        step.classList.toggle("active", i === stepIndex)
      );
      steps[stepIndex].style.animation =
        direction === "forward"
          ? "slideInRight .3s ease"
          : "slideInLeft .3s ease";
      setTimeout(() => (steps[stepIndex].style.animation = ""), 300);
    }, 300);

    progressSteps.forEach((p, i) =>
      p.classList.toggle("active", i <= stepIndex)
    );
    currentStep = stepIndex;

    // Update step header
    updateStepHeader(stepIndex);
  }

  function updateStepHeader(stepIndex) {
    const headers = [
      { title: "Event Details", desc: "Tell us about your event" },
      { title: "Menu Selection", desc: "Pick items or describe preferences" },
      { title: "Contact Information", desc: "How can we reach you?" },
    ];
    const header = steps[stepIndex].querySelector(".step-header");
    if (header && headers[stepIndex]) {
      header.querySelector("h3").textContent = headers[stepIndex].title;
      header.querySelector("p").textContent = headers[stepIndex].desc;
    }
  }

  // make progress steps clickable (allow backward jump anytime, forward only if validated)
  progressSteps.forEach((p, i) => {
    p.addEventListener("click", () => {
      if (i <= currentStep) {
        showStep(i, "backward");
      } else {
        // try validate current then move forward
        if (validateStep(currentStep)) showStep(i, "forward");
      }
    });
  });

  // menu selection logic (clickable cards add/remove items)
  const menuGrid = document.getElementById("menuGrid");
  const menuItemsTextarea = document.getElementById("menuItems");
  let selectedMenu = [];
  if (menuGrid) {
    menuGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".menu-item");
      if (!card) return;
      const item = card.dataset.item;
      if (!item) return;
      const idx = selectedMenu.indexOf(item);
      if (idx === -1) {
        selectedMenu.push(item);
        card.classList.add("selected");
      } else {
        selectedMenu.splice(idx, 1);
        card.classList.remove("selected");
      }
      // update textarea with selected items (append without overwriting user's typed details)
      const existing = menuItemsTextarea.value || "";
      // keep user's typed details after a separator
      const typedNote = existing.split("\n---\n")[1] || "";
      menuItemsTextarea.value =
        selectedMenu.join(", ") + (typedNote ? "\n---\n" + typedNote : "");
    });
    // keep typed notes separate
    menuItemsTextarea.addEventListener("input", () => {
      // ensure typed details preserved after separator
      const parts = menuItemsTextarea.value.split("\n---\n");
      const typed = parts[1] || "";
      // if typed area changed, keep it
      if (typed !== "") {
        // nothing extra needed; selection updates will preserve
      }
    });
  }

  form.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-step")) {
      e.preventDefault();
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1)
          showStep(currentStep + 1, "forward");
      }
    } else if (e.target.classList.contains("prev-step")) {
      e.preventDefault();
      if (currentStep > 0) showStep(currentStep - 1, "backward");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Show success message
      form.style.display = "none";
      formSuccess.style.display = "block";
      formSuccess.style.animation = "fadeIn .5s ease";
      // Announce to screen readers
      const live = document.createElement("div");
      live.setAttribute("aria-live", "polite");
      live.style.position = "absolute";
      live.style.left = "-9999px";
      live.textContent = "Catering inquiry submitted successfully";
      document.body.appendChild(live);

      // Reset after delay
      setTimeout(() => {
        formSuccess.style.animation = "fadeOut .5s ease";
        setTimeout(() => {
          formSuccess.style.display = "none";
          form.style.display = "block";
          form.reset();
          showStep(0);
        }, 500);
      }, 3000);
    }
  });

  function validateStep(stepIndex) {
    const step = steps[stepIndex];
    const inputs = step.querySelectorAll("input, select, textarea");
    let valid = true;
    inputs.forEach((input) => {
      const errorMsg = input.parentNode.querySelector(".error-msg");
      if (input.hasAttribute("required") && !input.value.trim()) {
        input.style.borderColor = "red";
        if (errorMsg) errorMsg.style.display = "block";
        valid = false;
      } else {
        input.style.borderColor = "";
        if (errorMsg) errorMsg.style.display = "none";
      }
    });
    return valid;
  }

  // Add error message elements
  steps.forEach((step) => {
    const inputs = step.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (
        input.hasAttribute("required") &&
        !input.parentNode.querySelector(".error-msg")
      ) {
        const error = document.createElement("div");
        error.className = "error-msg";
        error.textContent = "This field is required";
        error.style.color = "red";
        error.style.fontSize = "0.875rem";
        error.style.marginTop = "0.25rem";
        error.style.display = "none";
        input.parentNode.appendChild(error);
      }
    });
  });

  // Initialize first step
  showStep(0);
});
