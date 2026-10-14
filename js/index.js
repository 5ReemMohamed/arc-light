
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");

  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");

      if (nav && nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const activeLink = document.querySelector(
              '.navbar-nav .nav-link[href="#' + entry.target.id + '"]'
            );

            if (activeLink) {
              navLinks.forEach(function (link) {
                link.classList.remove("active");
              });

              activeLink.classList.add("active");
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        if (history.replaceState) {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });
   const galleryItems = Array.from(document.querySelectorAll("[data-gallery]"));
  const lightbox = document.getElementById("galleryLightbox");

  if (!lightbox || !galleryItems.length) return;

  const lightboxImage = document.getElementById("lightboxImage");
  const counter = lightbox.querySelector(".lightbox-counter");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentIndex];
    const image = item.querySelector("img");

    lightboxImage.src = item.href;
    lightboxImage.alt = image ? image.alt : "";
    counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  prevButton.addEventListener("click", function () {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentIndex - 1);
    if (event.key === "ArrowLeft") showImage(currentIndex + 1);
  });
    const contactForm = document.getElementById("arcContactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const service = formData.get("service");
    const location = formData.get("location").trim();
    const message = formData.get("message").trim();

    const whatsappMessage = [
      "مرحباً أرك لايت، أرغب في الاستفسار عن خدماتكم.",
      "",
      "الاسم: " + name,
      "رقم الجوال: " + phone,
      "الخدمة المطلوبة: " + service,
      "موقع المشروع: " + location,
      "تفاصيل المشروع: " + message
    ].join("\n");

    const whatsappNumber = "966541093276";
    const whatsappUrl =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});
