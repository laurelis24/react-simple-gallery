import { Children, useEffect, useRef } from 'react';
import styles from '../../../style.module.css';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { Direction, MyState } from '../../../types/types';
import ChangeImageButton from '../../buttons/ChangeImageButton';
import SliderImageContainer from './SliderImageContainer';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import useAddKeyboard from '../../../hooks/useAddKeyboard';

interface ModalSliderProps {
  state: MyState;
  swipePosition: (direction: Direction, position?: number) => void;
}

export default function ModalSlider({ state, swipePosition }: ModalSliderProps) {
  const { children, arrowButtons, keyboard, swipeable, refSlide, imageCount, onClose } = useImageGalleryContext();
  const options = { swipeThreshold: 70 };
  const canSwipeRef = useRef<{ canSwipe: boolean; direction: Direction }>({ canSwipe: true, direction: 'left' });

  const slide = (dir: Direction, data: SwipeEventData) => {
    if (!refSlide.current || !canSwipeRef.current.canSwipe) return;

    refSlide.current.classList.add(styles['slider-transition']);

    const base = state.pos * 100;

    if (
      (dir === 'left' && data.deltaX > -options.swipeThreshold) ||
      (dir === 'right' && data.deltaX < options.swipeThreshold)
    ) {
      refSlide.current.classList.remove(styles['slider-transition']);
      refSlide.current.style.transform = `translateX(calc(${-base}%)`;
      return;
    }

    refSlide.current.style.transform = `translateX(calc(${-(base + (dir === 'left' ? 100 : -100))}%)`;

    canSwipeRef.current.canSwipe = false;
    canSwipeRef.current.direction = dir;
  };

  const slideAnimation = (data: SwipeEventData) => {
    if (!refSlide.current || !canSwipeRef.current.canSwipe) return;
    const base = state.pos * 100;
    refSlide.current.style.transform = `translate(calc(${-base}% + ${data.deltaX}px))`;
  };

  useEffect(() => {
    function removeTransition() {
      if (!refSlide.current || canSwipeRef.current.canSwipe) return;

      refSlide.current.classList.remove(styles['slider-transition']);
      swipePosition(canSwipeRef.current.direction);
      canSwipeRef.current.canSwipe = true;
    }
    refSlide.current?.addEventListener('transitionend', removeTransition);

    return () => {
      refSlide.current?.removeEventListener('transitionend', removeTransition);
    };
  }, [state.pos]);

  const handleSwiper = useSwipeable({
    onSwipedLeft: (data) => slide('left', data),
    onSwipedRight: (data) => slide('right', data),
    onSwipedUp: () => onClose(state.pos - 1),
    onSwipedDown: () => onClose(state.pos - 1),
    onSwiping: (data) => slideAnimation(data),
    onSwipeStart: () => {
      refSlide.current?.classList.remove(styles['slider-transition']);
    },
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const handleClick = (direction: Direction) => {
    if (!refSlide.current || !canSwipeRef.current) return;
    swipePosition(direction);
  };

  if (keyboard) {
    useAddKeyboard({ state, handleClick });
  }

  return (
    <div className={styles['slider']}>
      {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('right')} direction="left" />}

      <div
        {...(swipeable ? handleSwiper : {})}
        ref={(el) => {
          if (!refSlide) return;

          refSlide.current = el;
          if (swipeable && handleSwiper) handleSwiper.ref(el);
        }}
        className={styles['slide']}
        style={{ transform: `translateX(-${state.pos * 100}%)`, cursor: swipeable ? 'grab' : 'default' }}
      >
        {imageCount > 1 && <SliderImageContainer src={children[children.length - 1].props.src} />}
        {Children.map(children, (child) => {
          return <SliderImageContainer src={child.props.src} />;
        })}

        {imageCount > 1 && <SliderImageContainer src={children[0].props.src} />}
      </div>
      {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('left')} direction="right" />}
    </div>
  );
}
