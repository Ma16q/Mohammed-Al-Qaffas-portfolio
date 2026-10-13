import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const spring = { stiffness: 220, damping: 15, mass: 0.4 };

// Pulls its child toward the cursor while hovered, then springs back.
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className = '' }) => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
};
