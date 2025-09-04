// main.js — minimal interactivity (burger menu, sticky header shadow, horizontal scroller, filters)
(function(){
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.getElementById('navMenu');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header shadow on scroll
  const setShadow = () => {
    const y = window.scrollY || window.pageYOffset;
    header.style.boxShadow = y > 4 ? '0 10px 30px rgba(0,0,0,.06)' : 'none';
  };
  setShadow();
  window.addEventListener('scroll', setShadow, { passive: true });

  // Mobile nav
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
    navMenu.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Horizontal scroller with buttons
  const scroller = document.querySelector('[data-scroller]');
  const row = document.querySelector('[data-cardrow]');
  if (scroller && row) {
    scroller.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-scroll]');
      if (!btn) return;
      const dir = btn.getAttribute('data-scroll');
      const amount = row.clientWidth * 0.9;
      row.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
    });
  }

  // Pills filtering
  const pills = document.querySelectorAll('.pill');
  if (pills.length && row) {
    pills.forEach(p => p.addEventListener('click', () => {
      pills.forEach(x => x.classList.remove('is-active'));
      p.classList.add('is-active');
      const filter = p.dataset.filter;
      row.querySelectorAll('.card').forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    }));
  }
})();