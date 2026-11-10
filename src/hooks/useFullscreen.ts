import { useState, useEffect, useCallback } from 'react';

export const useFullscreen = (onViolation: () => void) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = useCallback(async () => {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        await (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        await (el as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.error('Exit fullscreen failed:', err);
      }
    }
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        onViolation();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && isFullscreen) {
        onViolation();
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        if (isFullscreen) onViolation();
      }, 0);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // Disable right click, copy, paste
    const preventDefaults = (e: Event) => e.preventDefault();
    if (isFullscreen) {
      document.addEventListener('contextmenu', preventDefaults);
      document.addEventListener('copy', preventDefaults);
      document.addEventListener('cut', preventDefaults);
      document.addEventListener('paste', preventDefaults);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', preventDefaults);
      document.removeEventListener('copy', preventDefaults);
      document.removeEventListener('cut', preventDefaults);
      document.removeEventListener('paste', preventDefaults);
    };
  }, [isFullscreen, onViolation]);

  return { isFullscreen, requestFullscreen, exitFullscreen };
};
