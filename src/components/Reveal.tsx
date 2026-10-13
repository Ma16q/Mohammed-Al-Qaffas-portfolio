import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

// Fades and lifts its children into place the first time they scroll into view.
export const Reveal: React.FC<RevealProps> = ({ delay = 0, y = 32, children, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 18, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
