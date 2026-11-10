// Small, on-brand interactions. Everything is readable without this script;
// it only adds motion, and stops entirely for prefers-reduced-motion.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Scroll reveal + rail lines + process bars */
function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .rail, .phases');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        const s = e.target.querySelector<HTMLElement>('[data-scramble]') ?? (e.target.matches('[data-scramble]') ? (e.target as HTMLElement) : null);
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

/* 3. Cursor-follow: hero grid glow and card spotlights */
function pointerFx() {
  if (reduce || !window.matchMedia('(hover: hover)').matches) return;
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

/* 4. Highlight the nav link for the section in view */
function scrollSpy() {
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]').forEach((a) => links.set(a.hash.slice(1), a));
  if (!links.size || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const a = links.get(e.target.id);
        if (a) a.classList.toggle('active', e.isIntersecting);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}

/* 5. Copy email */
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

(window as unknown as { __dwfx: boolean }).__dwfx = true;
reveal();
pointerFx();
scrollSpy();
copyEmail();
