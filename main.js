/* ═══════════════════════════════════════════
   GESTING — main.js
   Scroll reveal · Nav scroll state
═══════════════════════════════════════════ */

/* ─── Nav: añadir clase .scrolled al hacer scroll ── */
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ─── Scroll reveal con IntersectionObserver ─────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

/* ─── Smooth scroll para links ancla internos ─────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Acordeón mobile ───────────────────────────── */
function getBodies(section) {
  return section.querySelectorAll('.accordion-body');
}

function closeAll() {
  document.querySelectorAll('.accordion-section').forEach((section) => {
    getBodies(section).forEach((b) => { b.style.display = 'none'; });
    const btn = section.querySelector('.accordion-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function openSection(section) {
  getBodies(section).forEach((b) => { b.style.display = 'block'; });
  const btn = section.querySelector('.accordion-toggle');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function resetAccordion() {
  document.querySelectorAll('.accordion-section').forEach((section) => {
    getBodies(section).forEach((b) => { b.style.display = ''; });
    const btn = section.querySelector('.accordion-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function initAccordion() {
  if (window.innerWidth >= 640) {
    resetAccordion();
    return;
  }

  closeAll();

  document.querySelectorAll('.accordion-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.accordion-section');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        getBodies(section).forEach((b) => { b.style.display = 'none'; });
        btn.setAttribute('aria-expanded', 'false');
      } else {
        getBodies(section).forEach((b) => { b.style.display = 'block'; });
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

initAccordion();
window.addEventListener('resize', initAccordion, { passive: true });

/* ─── Stagger delay para cards en grid ──────────── */
function applyStagger(selector, delayStep = 80) {
  const groups = document.querySelectorAll(selector);
  groups.forEach((group) => {
    const cards = group.children;
    Array.from(cards).forEach((card, i) => {
      card.style.transitionDelay = `${i * delayStep}ms`;
    });
  });
}

applyStagger('.services', 60);
applyStagger('.differentials', 80);
applyStagger('.pillars', 100);
