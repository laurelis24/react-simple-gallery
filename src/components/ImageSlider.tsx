import { useRef, useState, useEffect, RefObject } from 'react';
import ChangeImageButton from './buttons/ChangeImageButton';
import ExitButton from './buttons/ExitButton';
import ImageCounter from './imageCounter/ImageCounter';
import { useSwipeable } from 'react-swipeable';
import FullScreenButton from './buttons/FullScreenButton';

interface ImageSliderProps {
  maxImages: number;
  galleryRef: RefObject<HTMLDivElement | null>;
  imageIndex: number;
  keyboard: boolean;
  arrowButtons: boolean;
  swipable: boolean;
  onClose: () => void;
}

export function ImageSlider({
  maxImages,
  galleryRef,
  imageIndex,
  keyboard,
  arrowButtons,
  swipable,
  onClose,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(imageIndex);
  const currentIndexRef = useRef(currentIndex);
  const refCurrentImage = useRef<HTMLImageElement>(null);
  const refSlider = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<any>({});
  useEffect(() => {
    if (keyboard) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    window.addEventListener('resize', handleResize);

    let removeClassTimeout = setTimeout(() => {
      if (refCurrentImage.current) {
        refCurrentImage.current.classList.remove('image-slide');
      }
    }, 300);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (removeClassTimeout) {
        clearTimeout(removeClassTimeout);
      }
    };
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    setImageBoundingOrigin();
  }, [currentIndex]);

  const setImageBoundingOrigin = () => {
    const rect = getBoundingRect();
    if (!rect) return null;
    const { top, left, width, height } = rect;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const originCenterX = left + width / 2;
    const originCenterY = top + height / 2;

    const deltaX = viewportCenterX - originCenterX;
    const deltaY = viewportCenterY - originCenterY;

    const scale = Math.min((0.9 * window.innerWidth) / width, (0.8 * window.innerHeight) / height);

    setStyle({
      top,
      left,
      width,
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
    });
  };

  const handleLeftBtnClick = () => {
    fadeImage();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxImages - 1));
  };
  const handleRightBtnClick = () => {
    fadeImage();
    setCurrentIndex((prev) => (prev < maxImages - 1 ? prev + 1 : 0));
  };

  const fadeImage = () => {
    if (!refCurrentImage.current) return;

    refCurrentImage.current.classList.add('fade-out');

    setTimeout(() => {
      refCurrentImage.current?.classList.remove('fade-out');
    }, 300);
  };
  const handleResize = () => {
    setImageBoundingOrigin();
  };

  const handleClose = () => {
    const rect = getBoundingRect();
    if (rect) {
      const { top, left, width } = rect;

      refCurrentImage.current?.classList.add('image-slide');
      setStyle({
        top,
        left,
        width,
      });

      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };
  const getBoundingRect = () => {
    return galleryRef?.current?.children[currentIndexRef.current].getBoundingClientRect();
  };

  let pressed = false;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!pressed && e.key === 'ArrowLeft') {
      handleLeftBtnClick();
      pressed = true;
    } else if (!pressed && e.key === 'ArrowRight') {
      handleRightBtnClick();
      pressed = true;
    } else if (!pressed && e.key === 'Escape') {
      handleClose();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    pressed = false;
  };

  const getImageSrc = () => {
    return (galleryRef?.current?.children[currentIndex] as HTMLImageElement).src;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleLeftBtnClick(),
    onSwipedRight: () => handleRightBtnClick(),
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div
      {...(swipable ? swipeHandlers : {})}
      ref={(el) => {
        refSlider.current = el;
        swipeHandlers.ref(el);
      }}
      className="fullscreen-wrapper"
    >
      <div className="nav-container">
        <div className="left-container">
          <ImageCounter imageIdx={currentIndex} maxImageCount={maxImages} />
        </div>

        <div className="right-container">
          <FullScreenButton refSlider={refSlider} />
          <ExitButton handleClose={handleClose} />
        </div>
      </div>

      <ChangeImageButton showButton={arrowButtons} handleButtonClick={handleLeftBtnClick} direction="left" />

      <img
        ref={refCurrentImage}
        className="show-image image-slide"
        style={style}
        src={getImageSrc()}
        alt=""
        draggable={false}
      />

      <ChangeImageButton showButton={arrowButtons} handleButtonClick={handleRightBtnClick} direction="right" />

      {/* <ExitButton handleClose={handleClose} /> */}
    </div>
  );
}
