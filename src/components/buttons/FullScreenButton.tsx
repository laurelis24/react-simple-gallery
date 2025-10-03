import { RefObject, useEffect, useState } from 'react';
import styles from '../../style.module.css';
import useImageGalleryContext from '../../hooks/useImageGalleryContext';

interface FullScreenButtonProps {
  refSlide: RefObject<HTMLDivElement | null>;
}

export default function FullScreenButton({ refSlide }: FullScreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === refSlide.current);
    };

    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      refSlide.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button onClick={handleFullScreen} className={styles['fullscreen-btn']}>
      {!isFullscreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"
          />
        </svg>
      )}
    </button>
  );
}
