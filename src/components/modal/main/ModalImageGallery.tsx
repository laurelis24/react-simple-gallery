import { useRef, useReducer, useState } from 'react';
import reducer from '../../../functions/reducer';
import styles from '../../../style.module.css';
import ThumbnailNavigation from '../footer/ModalThumbnailFooter';
import Slider from './ModalSlider';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import ModalNavbar from '../nav/ModalNavbar';
import { MySwipeDirection } from '../../../types/types';
import useTheme from '../../../hooks/useTheme';

export default function ModalImageGallery() {
  const { imageCount, imageIndex, sliderTheme, refSlide } = useImageGalleryContext();
  const [theme, toggleTheme] = useTheme();
  const [isThumbnailNavigation, setIsThumbnailNavigation] = useState(true);
  const refSlider = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, {
    pos: (imageIndex || 0) + 1,
    direction: 'Right',
    imageCount: imageCount,
  });
  const refIndex = useRef(state.pos);
  const refCanSwipe = useRef(true);

  const handleSwipePosition = (direction: MySwipeDirection, position?: number) => {
    dispatch({ direction: direction, pos: position, refIndex });
  };

  const handleSetPosition = (direction: MySwipeDirection, position?: number) => {
    refSlide.current?.classList.add(styles['no-transition']);
    dispatch({ direction: direction, pos: position, refIndex });
  };

  return (
    <div
      ref={refSlider}
      className={`${styles['fullscreen-wrapper']} ${theme === 'dark' ? styles['dark-mode'] : styles['light-mode']}`}
    >
      <ModalNavbar
        refSlider={refSlider}
        position={state.pos}
        isThumbnailNavigation={isThumbnailNavigation}
        onToggleThumbnailNavigation={setIsThumbnailNavigation}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <Slider
        refCanSwipe={refCanSwipe}
        refIndex={refIndex}
        state={state}
        swipePosition={handleSwipePosition}
        setPosition={handleSetPosition}
      />
      {isThumbnailNavigation && (
        <ThumbnailNavigation refCanSwipe={refCanSwipe} setPosition={handleSetPosition} state={state} />
      )}
    </div>
  );
}
