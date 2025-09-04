import React from 'react';
import logoImage from 'figma:asset/4a0beeffa82cccff43eb2c512134e22623390cec.png';
import { motion } from 'framer-motion';

export function SplashScreen({ language }: { language: 'english' | 'telugu' }) {
  const texts = {
    english: { loading: 'Loading…' },
    telugu: { loading: 'లోడవుతోంది…' },
  } as const;
  const t = texts[language];

  return (
    <div className="min-h-screen w-full flex items-center justify-center animate-card-entry" style={{ background: 'var(--background)' }}>
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-24 h-24 rounded-2xl overflow-hidden gradient-primary p-3 ring-1 ring-primary/30 shadow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        >
          <motion.img
            src={logoImage}
            alt="Temple Sanathan"
            className="w-full h-full object-contain mix-blend-screen"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="w-56 h-2 rounded-full bg-card/50 border border-primary/20 overflow-hidden">
          <div className="h-full w-full gradient-secondary shimmer" />
        </div>

        <motion.div className="text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {t.loading}
        </motion.div>
      </div>
    </div>
  );
}
