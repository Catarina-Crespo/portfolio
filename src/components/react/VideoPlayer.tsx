import { useState } from 'react';
import { getEmbedUrl, getAutoThumbnail, getVideoProvider } from '../../utils/media';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnail?: string;
  title: string;
  playLabel: string;
  aspect?: 'video' | 'portrait' | 'shorts' | 'square';
  className?: string;
}

const aspectClass: Record<string, string> = {
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  shorts: 'aspect-[9/16]',
  square: 'aspect-square',
};

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  playLabel,
  aspect = 'video',
  className = '',
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const provider = videoUrl ? getVideoProvider(videoUrl) : 'unknown';
  const poster = thumbnail || (videoUrl ? getAutoThumbnail(videoUrl) : null);

  if (playing && embedUrl) {
    return (
      <div className={`slate-frame overflow-hidden rounded-[var(--radius-card)] bg-ink-900 ${aspectClass[aspect]} ${className}`}>
        <iframe
          src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (playing && provider === 'file' && videoUrl) {
    return (
      <div className={`slate-frame overflow-hidden rounded-[var(--radius-card)] bg-ink-900 ${aspectClass[aspect]} ${className}`}>
        <video src={videoUrl} className="h-full w-full object-cover" controls autoPlay />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      disabled={!videoUrl}
      className={`slate-frame group relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-900 text-left ${aspectClass[aspect]} ${className}`}
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
