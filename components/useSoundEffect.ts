import { useRef, useEffect, useCallback } from 'react';

export const useSound = (soundPath: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(soundPath);
    audioRef.current = audio;
    const handleCanPlayThrough = () => {
      isLoadedRef.current = true;
    };
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.pause();
      audioRef.current = null;
    };
  }, [soundPath]);

  const playSound = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (!isLoadedRef.current) {
        audio.load();
      }
      
      // iOS workaround
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        audio.muted = true;
        audio.play().then(() => {
          audio.muted = false;
          audio.currentTime = 0;
          audio.play().catch(error => {
            console.error('Error playing sound:', error);
          });
        }).catch(error => {
          console.error('Error during iOS audio workaround:', error);
        });
      } else {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
    }
  }, []);

  return playSound;
};