import { useCallback, useEffect, useState } from 'react';

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
}

const spanClass: Record<MosaicImage['size'], string> = {
  normal: 'span-normal',
  wide: 'span-wide',
  tall: 'span-tall',
  large: 'span-large',
};

export default function PhotoMosaic({ images, closeLabel, prevLabel, nextLabel }: PhotoMosaicProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
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

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="mosaic">
        {images.map((img, i) => (
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

      {active && (
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
            {String(activeIndex! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </div>
      )}
    </>
  );
}
