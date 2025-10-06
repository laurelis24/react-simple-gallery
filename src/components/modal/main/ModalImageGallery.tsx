import { useRef, useReducer } from 'react';
import reducer from '../../../functions/reducer';
import { Direction } from '../../../types/types';
import styles from '../../../style.module.css';
import ThumbnailNavigation from '../footer/ModalThumbnailFooter';
import Slider from './ModalSlider';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import ModalNavbar from '../nav/ModalNavbar';

export function ModalImageGallery() {
  const { imageCount, imageIndex, sliderThumbnail } = useImageGalleryContext();
  const refSlider = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    pos: (imageIndex || 0) + 1,
    direction: 'right',
    imageCount: imageCount,
  });
  const handleSwipePosition = (direction: Direction, position?: number) => {
    dispatch({ direction: direction, pos: position });
  };

  return (
    <div ref={refSlider} className={styles['fullscreen-wrapper']}>
      <ModalNavbar state={state} refSlider={refSlider} />
      <Slider state={state} swipePosition={handleSwipePosition} />
      {sliderThumbnail && <ThumbnailNavigation setPosition={handleSwipePosition} state={state} />}
    </div>
  );
}
