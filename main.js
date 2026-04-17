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
function initAccordion() {
  if (window.innerWidth >= 640) return;

  document.querySelectorAll('.accordion-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.accordion-section');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      section.classList.toggle('is-open', !isOpen);
    });
  });
}

initAccordion();
window.addEventListener('resize', () => {
  document.querySelectorAll('.accordion-section').forEach((s) => {
    s.classList.remove('is-open');
  });
  document.querySelectorAll('.accordion-toggle').forEach((b) => {
    b.setAttribute('aria-expanded', 'false');
  });
  initAccordion();
}, { passive: true });

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
