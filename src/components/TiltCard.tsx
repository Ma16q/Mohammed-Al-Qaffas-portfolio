import React from 'react';
import { motion, useReducedMotion, useSpring, type HTMLMotionProps } from 'motion/react';
import { trackSpotlight } from '../lib/pointer';

interface TiltCardProps extends HTMLMotionProps<'article'> {
  tilt?: boolean;
  maxTilt?: number;
}

const spring = { stiffness: 200, damping: 18, mass: 0.5 };

// Glass card that leans toward the cursor in 3D and lights its border where the pointer is.
export const TiltCard: React.FC<TiltCardProps> = ({ tilt = true, maxTilt = 6, className = '', children, ...rest }) => {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lift = useSpring(0, spring);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    trackSpotlight(e);
    if (reduceMotion || e.pointerType !== 'mouse') return;
    lift.set(-8);
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 2 * maxTilt);
    rotateX.set(-py * 2 * maxTilt);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return (
    <motion.article
      className={`tilt-card ${className}`}
      style={{ rotateX, rotateY, y: lift, transformPerspective: 1100 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </motion.article>
  );
};
