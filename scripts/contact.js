// scripts/contact.js — contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Simulate send
    window.sfToast.success("Message sent! We'll get back to you soon.");
    form.reset();
  });
});
