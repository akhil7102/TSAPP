import React, { useEffect } from 'react';
import logoImage from 'figma:asset/4a0beeffa82cccff43eb2c512134e22623390cec.png';

interface WelcomeProps {
  language: 'english' | 'telugu';
  onStartAuth: () => void;
}

export function Welcome({ language, onStartAuth }: WelcomeProps) {
  useEffect(() => {
    const id = setTimeout(() => onStartAuth(), 700);
    return () => clearTimeout(id);
  }, [onStartAuth]);

  const texts = {
    english: { loading: 'Loading…' },
    telugu: { loading: 'లోడింగ్…' }
  } as const;
  const t = texts[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-20 h-20 rounded-full overflow-hidden gradient-primary p-2 shadow-md">
        <img src={logoImage} alt="Temple Sanathan" className="w-full h-full object-contain mix-blend-screen" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{t.loading}</p>
    </div>
  );
}
