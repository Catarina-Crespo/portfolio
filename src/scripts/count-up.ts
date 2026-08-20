// Parses e.g. "120K+" -> { target: 120, suffix: "K+" }, "6+" -> { target: 6, suffix: "+" }.
// Only the leading digits are animated; whatever follows them (K, +, %, etc.) is
// carried along untouched so this works for any stat without extra config.
function parseStatValue(text: string): { target: number; suffix: string } | null {
  const match = text.trim().match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { target: parseInt(match[1], 10), suffix: match[2] };
}

function animateCount(el: HTMLElement, target: number, suffix: string) {
  const duration = 5400;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = `${target}${suffix}`; // guarantee the exact final value, no rounding drift
    }
  }
  requestAnimationFrame(tick);
}

function initCountUp() {
  const items = document.querySelectorAll<HTMLElement>('[data-count-up]:not(.is-counted)');
  if (!items.length) return;

  // The HTML already renders the real, correct value — this is a pure
  // enhancement. Anyone with reduced-motion enabled just keeps seeing it
  // as static text, same as if JS never ran at all.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-counted');
        observer.unobserve(el);

        const parsed = parseStatValue(el.textContent || '');
        if (!parsed) continue; // not a recognizable "number + suffix" — leave it exactly as rendered

        el.textContent = `0${parsed.suffix}`;
        animateCount(el, parsed.target, parsed.suffix);
      }
    },
    { threshold: 0.4 },
  );

  items.forEach((el) => observer.observe(el));
}

// astro:page-load fires on the initial load too, so this is the only
// registration needed — a separate direct call here would double-init it.
document.addEventListener('astro:page-load', initCountUp);
