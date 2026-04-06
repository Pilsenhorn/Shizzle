document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("concert-modal");
  const closeBtn = document.getElementById("close-modal");

  if (!modal) return;

  setTimeout(() => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }, 500);

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});