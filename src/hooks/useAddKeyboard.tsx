import { useEffect, useRef } from 'react';
import useImageGalleryContext from './useImageGalleryContext';
import { Direction, MyState } from '../types/types';
interface AddKeyboardEvent {
  handleClick: (direction: Direction) => void;
  state: MyState;
}
export default function useAddKeyboard({ state, handleClick }: AddKeyboardEvent) {
  const { onClose } = useImageGalleryContext();

  const handleClose = () => {
    onClose(state.pos - 1);
  };

  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    let keyPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyPressed) return;
      switch (e.key) {
        case 'ArrowLeft':
          handleClick('right');
          keyPressed = true;
          break;
        case 'ArrowRight':
          handleClick('left');
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
