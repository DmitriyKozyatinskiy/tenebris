export function initScrollReveal() {
  if (typeof window === 'undefined') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 15% 0px' },
  );

  els.forEach((el) => io.observe(el));

  // Fallback: anything the IO hasn't revealed within 3s gets revealed anyway.
  // Protects against edge cases where the observer never fires (headless
  // screenshot tools, unusual scroll containers, etc.).
  window.setTimeout(() => {
    els.forEach((el) => el.classList.add('is-visible'));
  }, 3000);
}
