document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Theme Persistence & Avatar Swap ---------------- */
  const avatar = document.getElementById('avatarImg');
  const logo = document.getElementById('logoImg');
const setTheme = theme => {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
  if (avatar) {
    avatar.src = theme === 'light-mode' 
      ? 'assets/img/avatar_light.png' 
      : 'assets/img/avatar.png';
  }
  if (logo) {
    logo.src = theme === 'light-mode' ? 'assets/img/logo-light.png' : 'assets/img/logo.png';
  }
};

  const storedTheme = localStorage.getItem('theme') || 'dark-mode';
  setTheme(storedTheme);

  const toggle = document.getElementById('mode-toggle');
  if (toggle) {
    toggle.textContent = storedTheme === 'light-mode' ? '🌞' : '🌙';
    toggle.addEventListener('click', () => {
      const current = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
      const next = current === 'dark-mode' ? 'light-mode' : 'dark-mode';
      setTheme(next);
      toggle.textContent = next === 'light-mode' ? '🌞' : '🌙';
    });
  }

  /* ---------------- Navigation Active Tab ---------------- */
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === path);
  });

  /* ---------------- Typewriter Effect ---------------- */
  const typeEl = document.querySelector('.typewriter');
  if (typeEl) {
    const text = "Hi, I’m Sumeet — I build intelligent systems & thoughtful designs.";
    typeEl.textContent = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${i * 0.03}s`;
      typeEl.appendChild(span);
    });
  }

  /* ---------------- Carousel Setup ---------------- */
  function setupCarousel(id) {
    const container = document.getElementById(id);
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prev = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let idx = 0, intervalId;

    const cardsPerView = () => Math.floor(container.clientWidth / (items[0].getBoundingClientRect().width + 20));

    const goTo = i => {
      const max = items.length - cardsPerView();
      if (i < 0) i = max;
      if (i > max) i = 0;
      idx = i;
      const shift = idx * (items[0].getBoundingClientRect().width + 20);
      track.style.transform = `translateX(-${shift}px)`;
    };

    prev?.addEventListener('click', () => goTo(idx - 1));
    nextBtn?.addEventListener('click', () => goTo(idx + 1));

    const start = () => intervalId = setInterval(() => goTo(idx + 1), 4000);
    const stop  = () => clearInterval(intervalId);

    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);
    window.addEventListener('resize', () => goTo(idx));

    start();
    goTo(0);
  }
  setupCarousel('projCarousel');
  setupCarousel('recCarousel');
  setupCarousel('carousel-ai');
  setupCarousel('carousel-php');
  setupCarousel('carousel-ux');
  setupCarousel('carousel-html');
  setupCarousel('carousel-lang');
  
  /* ---------------- Recommendations Toggle ---------------- */
  document.querySelectorAll('.view-recommendation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (details) {
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  /* ---------------- Project Details Modal ---------------- */
  const modal = document.getElementById('projectModal');
  const mTitle = document.getElementById('modalTitle');
  const mDesc  = document.getElementById('modalDescription');
  const mTech  = document.getElementById('modalTech');
  const mLink  = document.getElementById('modalLink');
  const mClose = modal?.querySelector('.modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      mTitle.textContent       = card.dataset.title;
      mDesc.textContent        = card.dataset.description;
      mTech.textContent        = card.dataset.tech;
      mLink.href               = card.dataset.link;
      modal.style.display      = 'flex';
    });
  });
  mClose?.addEventListener('click', () => modal.style.display = 'none');
  modal?.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  /* ---------------- Timeline Details Toggle ---------------- */
  function closeAllDetails() {
    document.querySelectorAll('.timeline-item .details')
      .forEach(d => d.style.display = 'none');
  }
  function toggleDetails(item) {
    const details = item.querySelector('.details');
    if (!details) return;
    const open = details.style.display === 'block';
    closeAllDetails();
    details.style.display = open ? 'none' : 'block';
  }
  window.toggleDetails = toggleDetails; // expose to inline onclick

  // Ensure all timeline details start closed
  closeAllDetails();
});

document.addEventListener('DOMContentLoaded', () => {
  // Example dynamic XP values
  const xpBars = document.querySelectorAll('.xp-bar div');
  xpBars.forEach(bar => {
    const xpValue = parseInt(bar.style.width);  // Get dynamic width from inline styles
    bar.style.setProperty('--xp-width', `${xpValue}%`);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const xpBars = document.querySelectorAll('.xp-bar div');
  xpBars.forEach(bar => {
    const xpValue = bar.getAttribute('data-xp'); // Get the XP percentage dynamically (e.g., 90%)
    bar.style.width = xpValue; // Apply the width dynamically
  });
});
