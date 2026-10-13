import type React from 'react';

// Writes the pointer position (as % of the element) into --mx / --my so CSS
// can paint a spotlight that follows the cursor.
export const trackSpotlight = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
};
