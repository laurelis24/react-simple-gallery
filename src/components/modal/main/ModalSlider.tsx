import { Children, RefObject, useEffect, useRef } from 'react';
import styles from '../../../style.module.css';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { MyState, MySwipeDirection } from '../../../types/types';
import ChangeImageButton from '../../buttons/ChangeImageButton';
import SliderImageContainer from './SliderImageContainer';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import useAddKeyboard from '../../../hooks/useAddKeyboard';

interface ModalSliderProps {
  state: MyState;
  refIndex: RefObject<number>;
  swipePosition: (direction: MySwipeDirection, position?: number) => void;
  setPosition: (direction: MySwipeDirection, position: number) => void;
}

export default function ModalSlider({ state, refIndex, swipePosition, setPosition }: ModalSliderProps) {
  const { children, arrowButtons, keyboard, swipeable, refSlide, imageCount, onClose } = useImageGalleryContext();
  const options = { swipeThreshold: 80 };
  const refCanSwipe = useRef(true);

  const slide = (data: SwipeEventData) => {
    if (!refCanSwipe.current) return;
    refCanSwipe.current = false;
    const { dir, deltaX } = data;

    refSlide.current?.classList.remove(styles['no-transition']);
    if (Math.abs(deltaX) < options.swipeThreshold) {
      refSlide.current!.style.transform = `translateX(calc(${-(state.pos * 100)}%)`;
      refCanSwipe.current = true;
      return;
    }
    swipePosition(dir);
  };

  const slideAnimation = (data: SwipeEventData) => {
    const base = state.pos * 100;
    refSlide.current!.style.transform = `translate(calc(${-base}% + ${data.deltaX}px))`;
  };

  const handleSwiper = useSwipeable({
    onSwipedUp: () => {
      if (!refCanSwipe.current) return;
      onClose(state.pos - 1);
    },
    onSwipedDown: () => {
      if (!refCanSwipe.current) return;
      onClose(state.pos - 1);
    },
    onSwiping: (data) => {
      if (!refCanSwipe.current) return;
      slideAnimation(data);
    },
    onSwiped: (data) => {
      if (!refCanSwipe.current) return;
      slide(data);
    },
    onTouchStartOrOnMouseDown: () => {
      if (!refCanSwipe.current) return;
      refSlide.current?.classList.add(styles['grabbed']);
    },
    onTouchEndOrOnMouseUp: () => {
      refSlide.current?.classList.remove(styles['grabbed']);
      refSlide.current?.classList.remove(styles['no-transition']);
    },
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const handleClick = (direction: MySwipeDirection) => {
    if (!refCanSwipe.current) return;
    refCanSwipe.current = false;
    refSlide.current?.classList.remove(styles['no-transition']);
    swipePosition(direction);
  };

  useAddKeyboard({ enabled: keyboard, state, handleClick });

  const infiniteSwipeTransitionEnd = () => {
    if (refIndex.current <= 0) {
      setPosition('BasedOnIndex', imageCount);
    } else if (refIndex.current >= imageCount + 1) {
      setPosition('BasedOnIndex', 1);
    }

    refCanSwipe.current = true;
  };

  useEffect(() => {
    refSlide.current?.addEventListener('transitionend', infiniteSwipeTransitionEnd);

    return () => {
      refSlide.current?.removeEventListener('transitionend', infiniteSwipeTransitionEnd);
    };
  }, []);

  return (
    <div className={styles['slider']}>
      {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('Right')} direction="Left" />}

      <div
        {...(swipeable ? handleSwiper : {})}
        ref={(el) => {
          refSlide.current = el;
          if (swipeable && handleSwiper) handleSwiper.ref(el);
        }}
        className={`${styles['slide']} ${styles['unselectable']} ${styles['swipeable']}`}
        style={{ transform: `translateX(-${state.pos * 100}%)` }}
      >
        {imageCount > 1 && (
          <SliderImageContainer
            src={children[children.length - 1].props.src}
            alt={children[children.length - 1].props.alt}
          />
        )}
        {Children.map(children, (child, index) => {
          return <SliderImageContainer key={index} src={child.props.src} alt={child.props.alt} />;
        })}

        {imageCount > 1 && <SliderImageContainer src={children[0].props.src} alt={children[0].props.alt} />}
      </div>
      {arrowButtons && <ChangeImageButton handleButtonClick={() => handleClick('Left')} direction="Right" />}
    </div>
  );
}
