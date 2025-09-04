import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export type AnimatedButtonProps = React.ComponentProps<typeof Button>;

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <Button asChild {...props}>
      <motion.button whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 600, damping: 30 }}>
        {children}
      </motion.button>
    </Button>
  );
}
