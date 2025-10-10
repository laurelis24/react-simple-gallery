import { useEffect, useRef } from 'react';
import useImageGalleryContext from './useImageGalleryContext';
import { MyState, MySwipeDirection } from '../types/types';

interface AddKeyboardEvent {
  enabled: boolean;
  state: MyState;
  handleClick: (direction: MySwipeDirection) => void;
}

export default function useAddKeyboard({ enabled, state, handleClick }: AddKeyboardEvent) {
  const { onClose } = useImageGalleryContext();

  const handleClose = () => {
    onClose(state.pos - 1);
  };

  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    if (!enabled) return;

    let keyPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyPressed) return;

      switch (e.key) {
        case 'ArrowLeft':
          handleClick('Right');
          keyPressed = true;
          break;
        case 'ArrowRight':
          handleClick('Left');
          keyPressed = true;
          break;
        case 'Escape':
          handleCloseRef.current();
          break;
      }
    };

    const handleKeyUp = () => {
      keyPressed = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
}
