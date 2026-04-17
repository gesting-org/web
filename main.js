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
const MOBILE_BP = 640;

const accordionSections = [
  { id: 'que-hacemos', title: 'Gestión de alquiler temporario para propietarios que valoran su tiempo.' },
  { id: 'servicios',   title: 'Todo lo que necesita tu propiedad para rendir al máximo.' },
  { id: 'diferenciales', title: 'No gestionamos volumen. Gestionamos tu propiedad.' },
  { id: 'como-trabajamos', title: 'Empezar es más simple de lo que pensás.' },
];

function buildAccordion() {
  if (window.innerWidth >= MOBILE_BP) return;

  accordionSections.forEach(({ id, title }) => {
    const section = document.getElementById(id);
    if (!section || section.dataset.accordion === 'true') return;
    section.dataset.accordion = 'true';

    const container = section.querySelector('.container');
    if (!container) return;

    // Crear encabezado clicable
    const header = document.createElement('button');
    header.className = 'acc-header';
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `<span class="acc-title">${title}</span><span class="acc-icon" aria-hidden="true">+</span>`;

    // Envolver el contenido en un wrapper colapsable
    const wrapper = document.createElement('div');
    wrapper.className = 'acc-content';
    wrapper.style.display = 'none';
    while (container.firstChild) wrapper.appendChild(container.firstChild);

    container.appendChild(header);
    container.appendChild(wrapper);

    header.addEventListener('click', () => {
      const open = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', open ? 'false' : 'true');
      wrapper.style.display = open ? 'none' : 'block';
      header.querySelector('.acc-icon').textContent = open ? '+' : '×';
    });
  });
}

function destroyAccordion() {
  accordionSections.forEach(({ id }) => {
    const section = document.getElementById(id);
    if (!section || section.dataset.accordion !== 'true') return;

    const container = section.querySelector('.container');
    const wrapper = section.querySelector('.acc-content');
    const header = section.querySelector('.acc-header');

    if (wrapper) {
      wrapper.style.display = '';
      while (wrapper.firstChild) container.insertBefore(wrapper.firstChild, header);
      wrapper.remove();
    }
    if (header) header.remove();
    delete section.dataset.accordion;
  });
}

let prevMobile = window.innerWidth < MOBILE_BP;
buildAccordion();

window.addEventListener('resize', () => {
  const isMobile = window.innerWidth < MOBILE_BP;
  if (isMobile && !prevMobile) buildAccordion();
  if (!isMobile && prevMobile) destroyAccordion();
  prevMobile = isMobile;
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
