import { useRef, useReducer } from 'react';
import reducer from '../../../functions/reducer';
import styles from '../../../style.module.css';
import ThumbnailNavigation from '../footer/ModalThumbnailFooter';
import Slider from './ModalSlider';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import ModalNavbar from '../nav/ModalNavbar';
import { MySwipeDirection } from '../../../types/types';

export function ModalImageGallery() {
  const { imageCount, imageIndex, sliderThumbnail, refSlide } = useImageGalleryContext();
  const refSlider = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    pos: (imageIndex || 0) + 1,
    direction: 'Right',
    imageCount: imageCount,
  });

  const refIndex = useRef(state.pos);

  const handleSwipePosition = (direction: MySwipeDirection, position?: number) => {
    dispatch({ direction: direction, pos: position, refIndex });
  };

  const handleSetPosition = (direction: MySwipeDirection, position?: number) => {
    refSlide.current?.classList.add(styles['no-transition']);
    dispatch({ direction: direction, pos: position, refIndex });
  };

  return (
    <div ref={refSlider} className={styles['fullscreen-wrapper']}>
      <ModalNavbar state={state} refSlider={refSlider} />
      <Slider refIndex={refIndex} state={state} swipePosition={handleSwipePosition} setPosition={handleSetPosition} />
      {sliderThumbnail && <ThumbnailNavigation setPosition={handleSetPosition} state={state} />}
    </div>
  );
}
