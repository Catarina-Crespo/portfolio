const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#';

class TextScrambler {
  private el: HTMLElement;
  private words: string[];
  private index = 0;
  private frame = 0;
  private frameRequest: number | null = null;
  private queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
  private resolveFn: () => void = () => {};
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(el: HTMLElement, words: string[]) {
    this.el = el;
    this.words = words;
  }

  start() {
    this.el.textContent = this.words[0];
    this.queueNext();
  }

  stop() {
    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
    if (this.timer) clearTimeout(this.timer);
  }

  private queueNext() {
    this.timer = setTimeout(() => {
      this.index = (this.index + 1) % this.words.length;
      this.setText(this.words[this.index]).then(() => this.queueNext());
    }, 2200);
  }

  private setText(newText: string) {
    const oldText = this.el.textContent || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolveFn = resolve));

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 18);
      const end = start + Math.floor(Math.random() * 18) + 4;
      this.queue.push({ from, to, start, end });
    }

    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  private update = () => {
    let output = '';
    let complete = 0;

    for (const item of this.queue) {
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.3) {
          item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        output += `<span class="scramble-char">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolveFn();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  };
}

function initScramble() {
  const el = document.querySelector<HTMLElement>('[data-scramble]');
  if (!el) return;

  const raw = el.dataset.scrambleWords;
  if (!raw) return;
  let words: string[] = [];
  try {
    words = JSON.parse(raw);
  } catch {
    return;
  }
  if (!words.length) return;

  // Cycling, randomized text isn't essential content — anyone who's asked
  // for reduced motion just gets the first word, statically.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0];
    return;
  }

  new TextScrambler(el, words).start();
}

initScramble();
document.addEventListener('astro:page-load', initScramble);
