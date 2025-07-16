import { useRef, useState, useEffect, RefObject } from 'react';
import ChangeImageButton from './buttons/ChangeImageButton';
import ExitButton from './buttons/ExitButton';
import ImageCounter from './imageCounter/ImageCounter';

interface ImageSliderProps {
  maxImages: number;
  galleryRef: RefObject<HTMLDivElement | null>;
  imageIndex: number;
  keyboard: boolean;
  onClose: () => void;
}

export function ImageSlider({ maxImages, galleryRef, imageIndex, keyboard, onClose }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(imageIndex);
  const refCurrentImage = useRef<HTMLImageElement>(null);
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
      if (interval) {
        clearInterval(interval);
      }
      if (removeClassTimeout) {
        clearTimeout(removeClassTimeout);
      }
    };
  }, []);

  useEffect(() => {
    setImageBoundingOrigin(currentIndex);
  }, [currentIndex]);

  const setImageBoundingOrigin = (index: number, openModal: boolean = true) => {
    const rect = getBoundingRect();
    if (!rect) return null;
    const { top, left, width, height } = rect;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const originCenterX = left + width / 2;
    const originCenterY = top + height / 2;

    const deltaX = viewportCenterX - originCenterX;
    const deltaY = viewportCenterY - originCenterY;

    const scale = Math.min((0.9 * window.innerWidth) / width, (0.9 * window.innerHeight) / height);

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
    setImageBoundingOrigin(currentIndex);
  };

  const handleClose = () => {
    const rect = getBoundingRect();
    if (!rect) return;
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
  };

  const getBoundingRect = () => {
    return galleryRef?.current?.children[currentIndex].getBoundingClientRect();
  };

  let pressed = false;
  let interval: NodeJS.Timeout | null = null;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!pressed && e.key === 'ArrowLeft') {
      handleLeftBtnClick();
    } else if (!pressed && e.key === 'ArrowRight') {
      handleRightBtnClick();
    } else if (!pressed && e.key === 'Escape') {
      handleClose();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    pressed = false;
  };

  const getImageSrc = () => {
    return (galleryRef?.current?.children[currentIndex] as HTMLImageElement).src;
  };

  return (
    <div onClick={handleClose} className="fullscreen-wrapper">
      <ImageCounter imageIdx={currentIndex} maxImageCount={maxImages} />
      <ChangeImageButton handleButtonClick={handleLeftBtnClick} direction="left" />

      <img
        onClick={(e) => e.stopPropagation()}
        ref={refCurrentImage}
        className="show-image image-slide"
        style={style}
        src={getImageSrc()}
        alt=""
      />
      <ChangeImageButton handleButtonClick={handleRightBtnClick} direction="right" />

      <ExitButton />
    </div>
  );
}
