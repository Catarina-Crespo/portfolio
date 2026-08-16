import { useEffect, useRef, useState } from 'react';
import { getEmbedUrl, getAutoThumbnail, getVideoProvider } from '../../utils/media';

// Each VideoPlayer island is a separate, isolated React root (that's how
// Astro islands work), so they can't coordinate via React state/context —
// a plain window event is the simplest way for "another video started
// playing" to reach every instance on the page, including ones inside
// different components entirely (Filming, Stop Motion, Selected Work...).
const VIDEO_PLAY_EVENT = 'portfolio:video-play';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnail?: string;
  title: string;
  playLabel: string;
  fullscreenLabel?: string;
  aspect?: 'video' | 'portrait' | 'shorts' | 'square' | 'fill';
  className?: string;
}

const aspectClass: Record<string, string> = {
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  shorts: 'aspect-[9/16]',
  square: 'aspect-square',
  fill: 'h-full w-full',
};

// Requests fullscreen on the actual <video>/<iframe> element (not a
// wrapping div), which is what makes the browser preserve the media's own
// aspect ratio (letterboxed) instead of stretching it to the screen —
// and gives every provider a reliable trigger, since YouTube/Vimeo's own
// in-player fullscreen button can be hidden entirely on narrow embeds.
function requestFullscreen(el: HTMLElement | null) {
  if (!el) return;
  const anyEl = el as any;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (anyEl.webkitRequestFullscreen) anyEl.webkitRequestFullscreen();
  else if (anyEl.webkitEnterFullscreen) anyEl.webkitEnterFullscreen(); // iOS Safari <video>
}

function FullscreenButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded border border-ink-700/70 bg-ink-950/70 text-paper-100 backdrop-blur-sm transition-colors hover:border-amber-500 hover:text-amber-500"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
      </svg>
    </button>
  );
}

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  playLabel,
  fullscreenLabel = 'Fullscreen',
  aspect = 'video',
  className = '',
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const instanceId = useRef(Math.random().toString(36).slice(2));

  useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const startedId = (e as CustomEvent<string>).detail;
      if (startedId !== instanceId.current) setPlaying(false);
    };
    window.addEventListener(VIDEO_PLAY_EVENT, handleOtherPlay);
    return () => window.removeEventListener(VIDEO_PLAY_EVENT, handleOtherPlay);
  }, []);

  function play() {
    window.dispatchEvent(new CustomEvent(VIDEO_PLAY_EVENT, { detail: instanceId.current }));
    setPlaying(true);
  }

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const provider = videoUrl ? getVideoProvider(videoUrl) : 'unknown';
  const poster = thumbnail || (videoUrl ? getAutoThumbnail(videoUrl) : null);
  const rounded = aspect === 'fill' ? 'rounded-none' : 'rounded-[var(--radius-card)]';

  if (playing && embedUrl) {
    return (
      <div className={`slate-frame relative overflow-hidden ${rounded} bg-ink-900 ${aspectClass[aspect]} ${className}`}>
        <iframe
          ref={iframeRef}
          src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Custom button only for reels: YouTube/Vimeo hide their own
            fullscreen control on narrow embeds like these. Regular
            (wider) videos keep the provider's default fullscreen UI. */}
        {aspect === 'shorts' && (
          <FullscreenButton label={fullscreenLabel} onClick={() => requestFullscreen(iframeRef.current)} />
        )}
      </div>
    );
  }

  if (playing && provider === 'file' && videoUrl) {
    return (
      <div className={`slate-frame relative overflow-hidden ${rounded} bg-ink-900 ${aspectClass[aspect]} ${className}`}>
        <video ref={videoRef} src={videoUrl} className="h-full w-full object-cover" controls autoPlay playsInline />
        {/* Custom button only for reels — regular videos rely on the
            native <video controls> fullscreen button as before. */}
        {aspect === 'shorts' && (
          <FullscreenButton label={fullscreenLabel} onClick={() => requestFullscreen(videoRef.current)} />
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      disabled={!videoUrl}
      className={`slate-frame group relative block w-full overflow-hidden ${rounded} bg-ink-900 text-left ${aspectClass[aspect]} ${className}`}
      aria-label={`${playLabel}: ${title}`}
    >
      {poster ? (
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-ink-800 to-ink-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      {videoUrl && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/70 bg-ink-950/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 group-hover:bg-amber-500/90">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-5 w-5 fill-paper-100 transition-colors group-hover:fill-ink-950"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      )}
    </button>
  );
}
