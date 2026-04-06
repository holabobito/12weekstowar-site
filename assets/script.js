function toggleSection(header) {
  if (!header) return;

  const section = header.closest(".fsec");
  if (!section) return;

  const body = section.querySelector(".fsec-b");
  if (!body) return;

  const isOpen = section.classList.toggle("open");
  header.setAttribute("aria-expanded", isOpen ? "true" : "false");
  body.hidden = !isOpen;
}

function setupAccordionAccessibility() {
  const headers = document.querySelectorAll(".fsec-h");

  headers.forEach((header, index) => {
    const section = header.closest(".fsec");
    const body = section ? section.querySelector(".fsec-b") : null;

    if (!section || !body) return;

    if (!body.id) {
      body.id = `fsec-body-${index + 1}`;
    }

    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-controls", body.id);

    const isOpen = section.classList.contains("open");
    header.setAttribute("aria-expanded", isOpen ? "true" : "false");
    body.hidden = !isOpen;

    header.addEventListener("click", () => {
      toggleSection(header);
    });

    header.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSection(header);
      }
    });
  });
}

function setupRevealAnimations() {
  const animatedItems = document.querySelectorAll(".tr, .oc, .pr");

  if (!animatedItems.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    animatedItems.forEach((item) => item.classList.add("vis"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("vis");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
}

function setupSmoothAnchorOffset() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const nav = document.querySelector(".wn");
      const navHeight = nav ? nav.offsetHeight : 0;
      const extraOffset = 18;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAccordionAccessibility();
  setupRevealAnimations();
  setupSmoothAnchorOffset();
});
