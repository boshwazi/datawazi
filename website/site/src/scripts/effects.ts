// Small, on-brand interactions. Everything is readable without this script; it only adds motion.
// Mouse users get hover effects. Touch users get the same effects driven by scroll position.
// With "reduce motion" switched on, nothing moves: content only fades in.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = window.matchMedia('(hover: none)').matches;
const hasIO = 'IntersectionObserver' in window;

/* 1. Reveal on scroll: sections, headline lines, rail lines, process bars, terminal, footer wordmark */
function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .rail, .phase, .term, .bigmark');
  if (!hasIO) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        const s = e.target.querySelector<HTMLElement>('[data-scramble]');
        if (s) scramble(s);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}

/* 2. Terminal-style decode on section labels */
const GLYPHS = '01/<>_#$%&*+=';
function scramble(el: HTMLElement) {
  if (reduce || el.dataset.done) return;
  el.dataset.done = '1';
  const final = el.textContent ?? '';
  const frames = 18;
  let f = 0;
  const tick = () => {
    const shown = Math.floor((f / frames) * final.length);
    el.textContent = final
      .split('')
      .map((c, i) => (i < shown || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('');
    if (f++ < frames) requestAnimationFrame(() => setTimeout(tick, 28));
    else el.textContent = final;
  };
  tick();
}

/* 3a. Mouse: hero grid glow and card spotlights follow the cursor */
function pointerFx() {
  if (reduce || touch) return;
  const hero = document.querySelector<HTMLElement>('.hero');
  hero?.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--gx', `${e.clientX - r.left}px`);
    hero.style.setProperty('--gy', `${e.clientY - r.top}px`);
  });
  document.querySelectorAll<HTMLElement>('.cell').forEach((cell) => {
    cell.addEventListener('pointermove', (e) => {
      const r = cell.getBoundingClientRect();
      cell.style.setProperty('--mx', `${e.clientX - r.left}px`);
      cell.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* 3b. Touch: whatever sits in the middle band of the screen gets the "hover" look */
function scrollActivate() {
  if (reduce || !touch || !hasIO) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-active', e.isIntersecting)),
    { rootMargin: '-38% 0px -38% 0px' },
  );
  document.querySelectorAll('.cell, .svc, .phase, .princ li, div.sector, .term').forEach((el) => io.observe(el));
}

/* 4. Nav: highlight the section in view, and draw the scroll progress line */
function scrollSpy() {
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]').forEach((a) => links.set(a.hash.slice(1), a));
  if (links.size && hasIO) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) links.get(e.target.id)?.classList.toggle('active', e.isIntersecting);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((_, id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
  };
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* 5. Mobile menu */
function mobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;
  const set = (open: boolean) => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'close' : 'menu';
    document.documentElement.classList.toggle('menu-open', open);
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (m) => { if (m.matches) set(false); });
}

/* 6. Copy email */
function copyEmail() {
  const btn = document.getElementById('copy-email');
  const email = document.getElementById('email');
  if (!btn || !email) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email.textContent ?? '');
      btn.textContent = 'copied ✓';
    } catch {
      const r = document.createRange();
      r.selectNodeContents(email);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(r);
      btn.textContent = 'selected';
    }
    setTimeout(() => (btn.textContent = 'copy'), 1800);
  });
}

/* 7. Sector ticker: click, tap, Enter or Space to pause / resume */
function tickerPause() {
  const t = document.querySelector<HTMLElement>('.ticker');
  if (!t) return;
  const toggle = () => t.classList.toggle('paused');
  t.addEventListener('click', toggle);
  t.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
}

(window as unknown as { __dwfx: boolean }).__dwfx = true;
tickerPause();
reveal();
pointerFx();
scrollActivate();
scrollSpy();
mobileMenu();
copyEmail();
