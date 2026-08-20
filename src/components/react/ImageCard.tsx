import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageCardProps {
  src: string;
  title: string;
  fullscreenLabel: string;
  closeLabel: string;
  aspectClassName: string; // e.g. "aspect-[3/4]", passed in so it matches WorkCard's own aspect logic
  className?: string;
}

export default function ImageCard({ src, title, fullscreenLabel, closeLabel, aspectClassName, className = '' }: ImageCardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('overflow-hidden');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${fullscreenLabel}: ${title}`}
        className={`slate-frame group relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-900 text-left ${aspectClassName} ${className}`}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/25" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/70 bg-ink-950/60 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-paper-100" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
            </svg>
          </span>
        </span>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-paper-100 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.4 6.3 6.3-6.3 6.3 1.4 1.4 6.3-6.3 6.3 6.3 1.4-1.4-6.3-6.3 6.3-6.3z"/></svg>
          </button>
          <figure
            className="slate-frame max-h-[85vh] max-w-4xl overflow-hidden rounded-[var(--radius-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title} className="max-h-[85vh] w-auto object-contain" />
          </figure>
        </div>,
        document.body,
      )}
    </>
  );
}
