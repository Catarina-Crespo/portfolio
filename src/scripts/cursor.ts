const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor-active]';

function initCustomCursor() {
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!supportsFinePointer || reducedMotion) {
    document.documentElement.classList.remove('has-custom-cursor');
    return;
  }

  document.documentElement.classList.add('has-custom-cursor');

  // Bind the document-level listeners once. They look up #custom-cursor
  // fresh on every event, so this stays correct even if Astro's view
  // transitions swap the element out from under us on navigation.
  const w = window as unknown as { __cursorBound?: boolean };
  if (w.__cursorBound) return;
  w.__cursorBound = true;

  document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.addEventListener('mouseleave', () => {
    document.getElementById('custom-cursor')?.style.setProperty('opacity', '0');
  });

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest?.(INTERACTIVE_SELECTOR)) {
      document.getElementById('custom-cursor')?.classList.add('is-active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    const related = e.relatedTarget as HTMLElement | null;
    if (target.closest?.(INTERACTIVE_SELECTOR) && !related?.closest?.(INTERACTIVE_SELECTOR)) {
      document.getElementById('custom-cursor')?.classList.remove('is-active');
    }
  });
}

// astro:page-load fires on the initial load too, so a separate
  // direct call here would double-init this (and for anything that
  // toggles based on current state, like a menu, that self-cancels).
  document.addEventListener('astro:page-load', initCustomCursor);
