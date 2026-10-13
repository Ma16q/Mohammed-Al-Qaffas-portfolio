import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const spring = { stiffness: 90, damping: 20, mass: 0.6 };

// Soft glow that trails the mouse behind the glass panels (mouse devices only).
export const CursorAura: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-aura"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      aria-hidden="true"
    />
  );
};
