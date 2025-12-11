// scripts/auth.js — simple client-side registration & verification (demo only)
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const verifyForm = document.getElementById("verifyForm");
  const logoutMsg = document.getElementById("logoutMsg");

  function genCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const phone = document.getElementById("regPhone").value.trim();
      const password = document.getElementById("regPassword").value;
      if (!name || !email || !phone || !password) {
        window.sfToast.error("Please complete all fields");
        return;
      }
      const temp = { name, email, phone, password, verified: false };
      const code = genCode();
      try {
        localStorage.setItem("sf_temp_user", JSON.stringify(temp));
        localStorage.setItem("sf_verification_code", code);
      } catch (err) {}
      window.sfToast.info("Verification code sent (demo)");
      // In a real app you would SMS/email the code. For demo we show it in console.
      console.info("Verification code (demo):", code);
      setTimeout(() => (location.href = "verify.html"), 400);
    });
  }

  if (verifyForm) {
    verifyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = document.getElementById("code").value.trim();
      const code = localStorage.getItem("sf_verification_code");
      if (entered === code) {
        const temp = JSON.parse(localStorage.getItem("sf_temp_user") || "{}");
        temp.verified = true;
        try {
          localStorage.setItem("sf_user", JSON.stringify(temp));
          localStorage.removeItem("sf_temp_user");
          localStorage.removeItem("sf_verification_code");
        } catch (err) {}
        window.sfToast.success("Account verified — welcome!");
        setTimeout(() => (location.href = "index.html"), 700);
      } else {
        window.sfToast.error("Verification code incorrect");
      }
    });
  }

  if (logoutMsg) {
    // Clear user and show message
    try {
      localStorage.removeItem("sf_user");
    } catch (e) {}
    window.sfToast.info("You have been logged out");
    logoutMsg.textContent = "You have been logged out.";
  }
});
