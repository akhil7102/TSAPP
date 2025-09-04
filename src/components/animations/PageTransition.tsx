import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function PageTransition({ children, screenKey, direction = 1 }: { children: React.ReactNode; screenKey: string; direction?: 1 | -1 }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screenKey}
        initial={{ opacity: 0, x: 16 * direction }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 * direction }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.6 }}
        style={{ height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
