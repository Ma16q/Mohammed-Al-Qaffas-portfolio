import { useCallback, useEffect, useRef, useState } from 'react';

export const SECTION_IDS = ['home', 'projects', 'about', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

// Tracks which page section is under the navbar and exposes a smooth-scroll jump.
export const useSectionNav = () => {
  const [active, setActive] = useState<SectionId>('home');
  // While a click-triggered smooth scroll is running, keep the clicked section
  // highlighted instead of flashing through every section on the way.
  const lockedUntil = useRef(0);

  useEffect(() => {
    let frame = 0;

    const detect = () => {
      frame = 0;
      if (performance.now() < lockedUntil.current) return;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }

      const scrollPos = window.scrollY + 200;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(detect);
    };
    const handleScrollEnd = () => {
      lockedUntil.current = 0;
      detect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd);
    detect();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  const goTo = useCallback((id: SectionId) => {
    setActive(id);
    lockedUntil.current = performance.now() + 1200;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return { active, goTo };
};
