document.addEventListener("DOMContentLoaded", () => {
  // Keep anchor targets below the sticky navigation at every viewport size.
  const siteNav = document.querySelector(".site-nav");
  if (siteNav) {
    const updateNavHeight = () => {
      document.documentElement.style.setProperty(
        "--nav-height",
        `${Math.ceil(siteNav.getBoundingClientRect().height)}px`
      );
    };
    updateNavHeight();
    if ("ResizeObserver" in window) {
      new ResizeObserver(updateNavHeight).observe(siteNav);
    } else {
      window.addEventListener("resize", updateNavHeight);
    }
  }

  // 1. Tab Switchers
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const groupId = group.getAttribute("data-tab-group");
    const container = document.getElementById(groupId);
    if (!container) return;

    const buttons = group.querySelectorAll(".tab-btn");
    const panels = container.querySelectorAll(".tab-panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        buttons.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const activePanel = document.getElementById(target);
        if (activePanel) activePanel.classList.add("active");
      });
    });
  });

  // 2. Copy BibTeX Button
  const copyBtn = document.getElementById("copy-bibtex-btn");
  const copyText = document.getElementById("copy-btn-text");
  const bibtexCode = document.getElementById("bibtex-code");

  if (copyBtn && bibtexCode && copyText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bibtexCode.innerText.trim());
        copyText.textContent = "Copied!";
        setTimeout(() => {
          copyText.textContent = "Copy BibTeX";
        }, 1800);
      } catch {
        copyText.textContent = "Failed";
      }
    });
  }

  // 3. Lightbox for Zoomable Images
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  };

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
});
