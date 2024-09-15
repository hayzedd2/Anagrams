import { useRef, useCallback } from 'react';

export const useSound = (soundPath: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundPath);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  }, [soundPath]);

  return playSound;
};