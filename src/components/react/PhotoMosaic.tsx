import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface MosaicImage {
  src: string;
  alt: string;
  size: 'normal' | 'wide' | 'tall' | 'large';
}

interface PhotoMosaicProps {
  images: MosaicImage[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  seeMoreLabel: string;
  seeLessLabel: string;
  // How many photos show before the "See more" button appears. The button
  // itself is only rendered at all when there are more photos than this.
  initialCount?: number;
}

const spanClass: Record<MosaicImage['size'], string> = {
  normal: 'span-normal',
  wide: 'span-wide',
  tall: 'span-tall',
  large: 'span-large',
};

export default function PhotoMosaic({
  images,
  closeLabel,
  prevLabel,
  nextLabel,
  seeMoreLabel,
  seeLessLabel,
  initialCount = 6,
}: PhotoMosaicProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const hasMore = images.length > initialCount;
  const visibleImages = expanded ? images : images.slice(0, initialCount);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + visibleImages.length) % visibleImages.length)),
    [visibleImages.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % visibleImages.length)),
    [visibleImages.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.classList.add('overflow-hidden');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  function toggleExpanded() {
    if (expanded) {
      // Collapsing can pull the button (and the section below it) far up
      // the page from where the person was scrolled to — bring the top
      // of this gallery back into view so it doesn't feel disorienting.
      sectionRef.current?.scrollIntoView({ block: 'nearest' });
    }
    setExpanded((e) => !e);
  }

  const active = activeIndex !== null ? visibleImages[activeIndex] : null;

  return (
    <div ref={sectionRef}>
      <div className="mosaic">
        {visibleImages.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`slate-frame group relative overflow-hidden rounded-[var(--radius-card)] bg-ink-900 aspect-square md:aspect-auto ${spanClass[img.size]}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/20" />
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={toggleExpanded}
            className="timecode inline-flex items-center gap-2 rounded-full border border-ink-700 px-5 py-2.5 text-paper-300 transition-colors hover:border-amber-500 hover:text-amber-500"
          >
            {expanded ? seeLessLabel : seeMoreLabel}
            <span aria-hidden="true">{expanded ? '\u2212' : '+'}</span>
          </button>
        </div>
      )}

      {active && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-paper-100 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.4 6.3 6.3-6.3 6.3 1.4 1.4 6.3-6.3 6.3 6.3 1.4-1.4-6.3-6.3 6.3-6.3z"/></svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label={prevLabel}
            className="absolute left-2 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-paper-100 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>

          <figure
            className="slate-frame max-h-[85vh] max-w-4xl overflow-hidden rounded-[var(--radius-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] w-auto object-contain"
            />
          </figure>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label={nextLabel}
            className="absolute right-2 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-paper-100 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </button>

          <p className="absolute bottom-4 sm:bottom-6 timecode text-paper-400">
            {String(activeIndex! + 1).padStart(2, '0')} / {String(visibleImages.length).padStart(2, '0')}
          </p>
        </div>,
        document.body,
      )}
    </div>
  );
}
