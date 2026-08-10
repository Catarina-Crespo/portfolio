function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((el) => observer.observe(el));
}

// astro:page-load fires on the initial load too, so a separate
  // direct call here would double-init this (and for anything that
  // toggles based on current state, like a menu, that self-cancels).
  document.addEventListener('astro:page-load', initReveal);
