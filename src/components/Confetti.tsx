import React, { useState } from 'react';
import { motion } from 'motion/react';

const COLORS = ['#38bdf8', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
const PIECES = 22;

interface Piece {
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
  duration: number;
}

const createPieces = (): Piece[] =>
  Array.from({ length: PIECES }, (_, i) => {
    const angle = (i / PIECES) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 60 + Math.random() * 90;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 30,
      rotate: Math.random() * 540 - 270,
      color: COLORS[i % COLORS.length],
      size: 5 + Math.random() * 5,
      duration: 0.9 + Math.random() * 0.5
    };
  });

// One celebratory burst from the center of its (positioned) parent. Remount with a new key to fire again.
export const Confetti: React.FC = () => {
  const [pieces] = useState(createPieces);

  return (
    <span className="confetti" aria-hidden="true">
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          className="confetti-piece"
          style={{ background: piece.color, width: piece.size, height: piece.size * 0.6 }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: piece.x,
            y: [0, piece.y, piece.y + 70],
            scale: [0, 1, 0.7],
            opacity: [1, 1, 0],
            rotate: piece.rotate
          }}
          transition={{ duration: piece.duration, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </span>
  );
};
