export type VideoProvider = 'youtube' | 'vimeo' | 'file' | 'unknown';

export function getVideoProvider(url: string): VideoProvider {
  if (!url) return 'unknown';
  if (/youtu\.?be/.test(url)) return 'youtube';
  if (/vimeo\.com/.test(url)) return 'vimeo';
  if (/\.(mp4|webm|mov)$/i.test(url)) return 'file';
  return 'unknown';
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

/** Returns a src suitable for an <iframe>, or null if it's a direct file / unknown link. */
export function getEmbedUrl(url: string): string | null {
  const provider = getVideoProvider(url);
  if (provider === 'youtube') {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null;
  }
  if (provider === 'vimeo') {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0` : null;
  }
  return null;
}

/** Auto-derives a thumbnail for YouTube links; returns null for providers that need an explicit thumbnail. */
export function getAutoThumbnail(url: string): string | null {
  const provider = getVideoProvider(url);
  if (provider === 'youtube') {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }
  return null;
}

/**
 * Muted, controls-free, looping embed URL for a purely decorative background
 * video (e.g. the homepage hero) — no play/pause/fullscreen UI, autoplays,
 * and loops a single video indefinitely. Pair with pointer-events-none on
 * the iframe so nothing here is actually clickable either.
 */
export function getBackgroundEmbedUrl(url: string): string | null {
  const provider = getVideoProvider(url);
  if (provider === 'youtube') {
    const id = getYouTubeId(url);
    if (!id) return null;
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      loop: '1',
      playlist: id, // required by YouTube for a single video to loop
      modestbranding: '1',
      disablekb: '1',
      iv_load_policy: '3',
      rel: '0',
      playsinline: '1',
    });
    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
  }
  if (provider === 'vimeo') {
    const id = getVimeoId(url);
    if (!id) return null;
    // Vimeo's `background=1` is purpose-built for this: mutes, hides all
    // controls, autoplays and loops.
    const params = new URLSearchParams({ background: '1', autoplay: '1', loop: '1', muted: '1' });
    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
  }
  return null;
}
