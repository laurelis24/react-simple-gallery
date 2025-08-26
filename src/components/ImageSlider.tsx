import { useRef, useEffect, useReducer, RefObject, ReactElement, Children } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import ChangeImageButton from './buttons/ChangeImageButton';
import ExitButton from './buttons/ExitButton';
import ImageCounter from './ImageCounter';
import FullScreenButton from './buttons/FullScreenButton';
import { ImageProps } from './Image';
import reducer from '../functions/reducer';
import { Direction } from '../types/types';
import SliderImageContainer from './SliderImageContainer';

import styles from '../style.module.css';

interface ImageSliderProps {
  imageCount: number;
  children: ReactElement<ImageProps>[];
  refSlide: RefObject<HTMLDivElement | null>;
  imageIndex: number;
  keyboard?: boolean;
  arrowButtons?: boolean;
  swipable?: boolean;
  onClose: (idx: number) => void;
}

export function ImageSlider({
  imageCount,
  children,
  imageIndex,
  refSlide,
  keyboard = true,
  arrowButtons = true,
  swipable = true,
  onClose,
}: ImageSliderProps) {
  const options = { swipeThreshold: 70 };
  const refSlider = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, { pos: imageIndex + 1, direction: 'right', imageCount });
  const canSwipeRef = useRef<{ canSwipe: boolean; direction: Direction }>({ canSwipe: true, direction: 'left' });

  const slide = (dir: Direction, data: SwipeEventData) => {
    if (!refSlide.current || !canSwipeRef.current.canSwipe) return;
    refSlide.current?.classList.add(styles['slider-transition']);

    const base = state.pos * 100;

    if (
      (dir === 'left' && data.deltaX > -options.swipeThreshold) ||
      (dir === 'right' && data.deltaX < options.swipeThreshold)
    ) {
      refSlide.current?.classList.remove(styles['slider-transition']);
      refSlide.current.style.transform = `translateX(calc(${-base}%)`;
      return;
    }

    refSlide.current.style.transform = `translateX(calc(${-(base + (dir === 'left' ? 100 : -100))}%)`;

    canSwipeRef.current.canSwipe = false;
    canSwipeRef.current.direction = dir;
  };

  const slideAnimation = (data: SwipeEventData) => {
    if (!refSlide.current || !canSwipeRef.current.canSwipe) return;
    if (refSlide.current) {
      const base = state.pos * 100;
      refSlide.current.style.transform = `translate(calc(${-base}% + ${data.deltaX}px))`;
    }
  };

  useEffect(() => {
    function removeTransition() {
      if (!refSlide.current || canSwipeRef.current.canSwipe) return;
      refSlide.current?.classList.remove(styles['slider-transition']);
      dispatch({ direction: canSwipeRef.current.direction });
      canSwipeRef.current.canSwipe = true;
    }

    refSlide.current?.addEventListener('transitionend', removeTransition);

    return () => {
      if (!refSlide.current) return;
      refSlide.current.removeEventListener('transitionend', removeTransition);
    };
  }, [state.pos]);

  const handleClick = (direction: Direction) => {
    if (!refSlide.current || !canSwipeRef.current) return;
    dispatch({ direction: direction });
  };

  const handleClose = () => {
    onClose(state.pos - 1);
  };
  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    if (!keyboard) return;
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

  return (
    <div ref={refSlider} className={styles['fullscreen-wrapper']}>
      <div className={styles['nav-container']}>
        <div className={styles['left-container']}>
          <ImageCounter imagePosition={state.pos} imageCount={imageCount} />
        </div>
        <div className={styles['right-container']}>
          <FullScreenButton refSlider={refSlider} />
          <ExitButton handleClose={() => onClose(state.pos - 1)} />
        </div>
      </div>

      <div className={styles['slider']}>
        {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('right')} direction="left" />}

        <div
          {...handleSwiper}
          ref={(el) => {
            refSlide.current = el;
            if (swipable && handleSwiper) handleSwiper.ref(el);
          }}
          className={styles['slide']}
          style={{ transform: `translateX(-${state.pos * 100}%)` }}
        >
          {imageCount > 1 && <SliderImageContainer src={children[children.length - 1].props.src} />}
          {Children.map(children, (child) => {
            return <SliderImageContainer src={child.props.src} />;
          })}

          {imageCount > 1 && <SliderImageContainer src={children[0].props.src} />}
        </div>
        {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('left')} direction="right" />}
      </div>
    </div>
  );
}
