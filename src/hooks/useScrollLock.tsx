import { useEffect, useRef } from 'react';
import styles from '../style.module.css';

export default function useScrollLock(isOpen: boolean | null, animationDelay = 300) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      body.style.paddingRight = `${scrollbarWidth}px`;
      body.classList.add(styles['scroll-lock']);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        body.classList.remove(styles['scroll-lock']);
        body.style.paddingRight = '';
      }, animationDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, animationDelay]);
}
