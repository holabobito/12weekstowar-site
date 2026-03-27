function toggleSection(head) {
  const sec = head.closest(".fsec");
  const isOpen = sec.classList.toggle("open");
  head.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

document.querySelectorAll(".fsec-h").forEach((head) => {
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSection(head);
    }
  });
});

const form = document.getElementById("appForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = this.querySelector(".btn-sub");
    btn.textContent = "Application Submitted ✓";
    btn.style.background = getComputedStyle(document.documentElement)
      .getPropertyValue("--success")
      .trim();
    btn.style.cursor = "default";
    btn.disabled = true;
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("vis");
    });
  },
  { threshold: 0.06 }
);

document.querySelectorAll(".tr, .oc, .pr").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + "ms";
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});