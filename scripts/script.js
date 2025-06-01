document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Theme Persistence & Avatar Swap ---------------- */
  const avatar = document.getElementById("avatarImg");
  const logo = document.getElementById("logoImg");
  const setTheme = (theme) => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    if (avatar) {
      avatar.src =
        theme === "light-mode"
          ? "assets/img/avatar_light.png"
          : "assets/img/avatar.png";
    }
    if (logo) {
      logo.src =
        theme === "light-mode"
          ? "assets/img/logo-light.png"
          : "assets/img/logo.png";
    }
  };

  const storedTheme = localStorage.getItem("theme") || "dark-mode";
  setTheme(storedTheme);

  const toggle = document.getElementById("mode-toggle");
  if (toggle) {
    toggle.textContent = storedTheme === "light-mode" ? "🌞" : "🌙";
    toggle.addEventListener("click", () => {
      const current = document.body.classList.contains("light-mode")
        ? "light-mode"
        : "dark-mode";
      const next = current === "dark-mode" ? "light-mode" : "dark-mode";
      setTheme(next);
      toggle.textContent = next === "light-mode" ? "🌞" : "🌙";
    });
  }

  /* ---------------- Navigation Active Tab ---------------- */
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-list a");

  // Function to set active class based on the current page
  function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach((link) => {
      if (link.href.includes(currentPage)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (CSS.supports && !CSS.supports("position", "sticky")) {
      const nav = document.querySelector("nav");
      const offset = nav.offsetTop;
      window.addEventListener("scroll", () => {
        if (window.pageYOffset >= offset) {
          nav.style.position = "fixed";
          nav.style.top = "0";
        } else {
          nav.style.position = "";
        }
      });
    }
  });

  // Call the function when the page loads
  window.addEventListener("load", setActiveLink);

  /* ---------------- Typewriter Effect ---------------- */
  const typeEl = document.querySelector(".typewriter");
  if (typeEl) {
    const text =
      "Hi, I’m Sumeet — Software developer. UX thinker. AI explorer.     Driven to build solutions that work and wow.";

    const startTyping = () => {
      typeEl.textContent = ""; // Clear the previous text
      [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${i * 0.03}s`; // Create animation delay for each character
        typeEl.appendChild(span);
      });
    };

    // Start the typing animation
    startTyping();

    // Repeat the animation after a delay
    setInterval(() => {
      startTyping(); // Restart typing
    }, text.length * 30 + 2000); // Delay after finishing (text length * delay + 2 seconds pause)
  }

  /* ---------------- Carousel Setup ---------------- */
  function setupCarousel(id) {
    const container = document.getElementById(id);
    if (!container) return;
    const track = container.querySelector(".carousel-track");
    const items = Array.from(track.children);
    const prev = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
    let idx = 0,
      intervalId;

    // Determine if this is a recommendation carousel (1 card visible) or a project carousel (multiple cards visible)
    const isRecommendationCarousel = id.includes("recCarousel"); // Check if it's the recommendations carousel
    const cardsPerView = isRecommendationCarousel
      ? 1 // Only 1 card visible in recommendations
      : Math.floor(
          container.clientWidth / (items[0].getBoundingClientRect().width + 20)
        ); // Multiple cards visible in projects

    // Ensure the maximum number of items to display is correctly adjusted
    const max = items.length - cardsPerView; // For recommendations, max will be 1 less than the total items

    const goTo = (i) => {
      if (i < 0) i = max;
      if (i > max) i = 0;
      idx = i;

      const shift = idx * (items[0].getBoundingClientRect().width + 20); // Shift based on the card width
      track.style.transform = `translateX(-${shift}px)`; // Apply the translation to slide the carousel
    };

    prev?.addEventListener("click", () => goTo(idx - 1));
    nextBtn?.addEventListener("click", () => goTo(idx + 1));

    const start = () => (intervalId = setInterval(() => goTo(idx + 1), 2000));
    const stop = () => clearInterval(intervalId);

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
    window.addEventListener("resize", () => goTo(idx)); // Recalculate shift on window resize

    start();
    goTo(0);
  }

  setupCarousel("projCarousel");
  setupCarousel("recCarousel");
  setupCarousel("carousel-ai");
  setupCarousel("carousel-php");
  setupCarousel("carousel-ux");
  setupCarousel("carousel-html");
  setupCarousel("carousel-lang");

  /* ---------------- Recommendations Toggle ---------------- */
  document.querySelectorAll(".view-recommendation-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = btn.nextElementSibling;
      if (details) {
        details.style.display =
          details.style.display === "block" ? "none" : "block";
      }
    });
  });

  /* ---------------- Project Details Modal ---------------- */
  const modal = document.getElementById("projectModal");
  const mTitle = document.getElementById("modalTitle");
  const mDesc = document.getElementById("modalDescription");
  const mTech = document.getElementById("modalTech");
  const mLink = document.getElementById("modalLink");
  const mClose = modal?.querySelector(".modal-close");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      mTitle.textContent = card.dataset.title;
      mDesc.textContent = card.dataset.description;
      mTech.textContent = card.dataset.tech;
      mLink.href = card.dataset.link;
      modal.style.display = "flex";
    });
  });
  mClose?.addEventListener("click", () => (modal.style.display = "none"));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* ---------------- Timeline Details Toggle ---------------- */
  function closeAllDetails() {
    document
      .querySelectorAll(".timeline-item .details")
      .forEach((d) => (d.style.display = "none"));
  }
  function toggleDetails(item) {
    const details = item.querySelector(".details");
    if (!details) return;
    const open = details.style.display === "block";
    closeAllDetails();
    details.style.display = open ? "none" : "block";
  }
  window.toggleDetails = toggleDetails; // expose to inline onclick

  // Ensure all timeline details start closed
  closeAllDetails();
});

document.addEventListener("DOMContentLoaded", () => {
  // Example dynamic XP values
  const xpBars = document.querySelectorAll(".xp-bar div");
  xpBars.forEach((bar) => {
    const xpValue = parseInt(bar.style.width); // Get dynamic width from inline styles
    bar.style.setProperty("--xp-width", `${xpValue}%`);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const xpBars = document.querySelectorAll(".xp-bar div");
  xpBars.forEach((bar) => {
    const xpValue = bar.getAttribute("data-xp"); // Get the XP percentage dynamically (e.g., 90%)
    bar.style.width = xpValue; // Apply the width dynamically
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const flipContainer = document.getElementById("avatarFlip");
  const avatarFront = document.getElementById("avatarFront");

  const setFrontImage = () => {
    avatarFront.src = document.body.classList.contains("light-mode")
      ? "assets/img/avatar_light.png"
      : "assets/img/avatar.png";
  };

  setFrontImage(); // Initialize on load

  flipContainer.addEventListener("click", () => {
    flipContainer.classList.toggle("flipped"); // Flip the avatar on click
  });

  // Optional: re-set avatar front if theme changes
  const modeToggle = document.getElementById("mode-toggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      setTimeout(setFrontImage, 300); // wait until class switches
    });
  }
});
// Responsive Navbar Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
});
