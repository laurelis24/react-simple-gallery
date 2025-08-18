import { useRef, useState, useEffect, useCallback, RefObject, CSSProperties } from 'react';
import { useSwipeable } from 'react-swipeable';
import ChangeImageButton from './buttons/ChangeImageButton';
import ExitButton from './buttons/ExitButton';
import ImageCounter from './imageCounter/ImageCounter';
import FullScreenButton from './buttons/FullScreenButton';

interface ImageSliderProps {
  maxImages: number;
  galleryRef: RefObject<HTMLDivElement | null>;
  imageIndex: number;
  keyboard?: boolean;
  arrowButtons?: boolean;
  swipable?: boolean;
  onClose: () => void;
}

export function ImageSlider({
  maxImages,
  galleryRef,
  imageIndex,
  keyboard = true,
  arrowButtons = true,
  swipable = true,
  onClose,
}: ImageSliderProps) {
  console.log(galleryRef?.current?.children);
  // ---------- State & Refs ----------
  const [currentIndex, setCurrentIndex] = useState(imageIndex);
  const currentIndexRef = useRef(currentIndex);
  const refCurrentImage = useRef<HTMLDivElement>(null);
  const refSlider = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  // ---------- Utils ----------
  const getBoundingRect = useCallback(() => {
    return galleryRef.current?.children[currentIndexRef.current]?.getBoundingClientRect();
  }, [galleryRef]);

  const getCurrentImageSrc = useCallback(() => {
    return (galleryRef.current?.children[currentIndexRef.current] as HTMLImageElement)?.src || '';
  }, [galleryRef]);

  // ---------- Image Animation ----------
  const updateImageStyle = useCallback(() => {
    const rect = getBoundingRect();
    if (!rect) return;

    const { top, left, width, height } = rect;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2 - 50;
    const originCenterX = left + width / 2;
    const originCenterY = top + height / 2;

    const deltaX = viewportCenterX - originCenterX;
    const deltaY = viewportCenterY - originCenterY;

    const scale = Math.min((0.8 * window.innerWidth) / width, (0.75 * window.innerHeight) / height);

    setStyle({
      top,
      left,
      width,
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
      position: 'fixed',
    });
  }, [getBoundingRect]);

  const fadeImage = useCallback(() => {
    if (!refCurrentImage.current) return;
    const img = refCurrentImage.current;
    img.classList.add('fade-out');
    setTimeout(() => img.classList.remove('fade-out'), 300);
  }, []);

  // ---------- Navigation ----------
  const handleLeft = useCallback(() => {
    fadeImage();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxImages - 1));
  }, [fadeImage, maxImages]);

  const handleRight = useCallback(() => {
    fadeImage();
    setCurrentIndex((prev) => (prev < maxImages - 1 ? prev + 1 : 0));
  }, [fadeImage, maxImages]);

  const handleClose = useCallback(() => {
    const rect = getBoundingRect();
    if (rect) {
      const { top, left, width } = rect;
      refCurrentImage.current?.classList.add('image-slide');
      setStyle({ top, left, width, position: 'fixed' });
      setTimeout(onClose, 300);
    } else {
      onClose();
    }
  }, [getBoundingRect, onClose]);

  // ---------- Keyboard ----------
  useEffect(() => {
    if (!keyboard) return;

    let keyPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyPressed) return;
      switch (e.key) {
        case 'ArrowLeft':
          handleLeft();
          keyPressed = true;
          break;
        case 'ArrowRight':
          handleRight();
          keyPressed = true;
          break;
        case 'Escape':
          handleClose();
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
  }, [keyboard, handleLeft, handleRight, handleClose]);

  // ---------- Effects ----------
  useEffect(() => {
    currentIndexRef.current = currentIndex;
    updateImageStyle();
  }, [currentIndex, updateImageStyle]);

  useEffect(() => {
    window.addEventListener('resize', updateImageStyle);
    const removeClass = () => {
      refCurrentImage.current?.classList.remove('image-slide');
    };

    if (refCurrentImage?.current) {
      refCurrentImage.current?.addEventListener('transitionend', removeClass);
    }
    //
    return () => {
      window.removeEventListener('resize', updateImageStyle);
      if (refCurrentImage?.current) {
        refCurrentImage.current?.removeEventListener('transitionend', removeClass);
      }
    };
  }, [updateImageStyle]);

  // ---------- Swipe ----------
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleRight,
    onSwipedRight: handleLeft,
    trackMouse: true,
    trackTouch: true,
  });
  const swipeHandlers2 = useSwipeable({
    onSwiped: (eventData) => {
      eventData.event.stopPropagation();
      console.log('SWIPEEED');
    },
  });

  // ---------- Render ----------
  return (
    <div
      {...(swipable ? swipeHandlers : {})}
      ref={(el) => {
        refSlider.current = el;
        if (swipable) swipeHandlers.ref(el);
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
      <div className="background-test" style={{ backgroundImage: `url(${getCurrentImageSrc()})` }}></div>

      <ChangeImageButton showButton={arrowButtons} handleButtonClick={handleLeft} direction="left" />
      <div ref={refCurrentImage} className="image-container image-slide" style={style}>
        <img
          // ref={refCurrentImage}
          // className="show-image image-slide"
          // style={style}
          src={getCurrentImageSrc()}
          draggable={false}
        />
      </div>

      <ChangeImageButton showButton={arrowButtons} handleButtonClick={handleRight} direction="right" />

      {galleryRef.current?.children && (
        <div className="bottom-container">
          {Array.from(galleryRef.current.children).map((child, index) => {
            const img = child as HTMLImageElement; // type assertion
            return (
              <img
                onClick={() => {
                  fadeImage();
                  setCurrentIndex(index);
                }}
                src={img.src}
                className={currentIndex === index ? 'active' : ''}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
