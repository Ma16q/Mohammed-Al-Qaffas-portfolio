import { useEffect, useState } from 'react';

const TYPE_MS = 65;
const ERASE_MS = 32;
const HOLD_MS = 1600;

// Types each phrase, holds it, erases it, then moves on to the next one.
export const useTypewriter = (phrases: string[], enabled = true) => {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [erasing, setErasing] = useState(false);

  const phrase = phrases[index % phrases.length] ?? '';

  useEffect(() => {
    if (!enabled) return;

    let delay = erasing ? ERASE_MS : TYPE_MS;
    if (!erasing && length === phrase.length) delay = HOLD_MS;

    const timer = setTimeout(() => {
      if (!erasing) {
        if (length === phrase.length) setErasing(true);
        else setLength(length + 1);
      } else if (length === 0) {
        setErasing(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setLength(length - 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, erasing, length, phrase, phrases.length]);

  return enabled ? phrase.slice(0, length) : phrase;
};
