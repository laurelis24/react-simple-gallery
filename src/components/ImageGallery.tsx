import { Children, cloneElement, isValidElement, ReactElement, useRef, useState } from 'react';
import { ImageProps } from './Image';
import AnimatedImageClone from './modal/main/AnimatedImageClone';
import { Rectangle } from '../types/types';

import styles from '../style.module.css';
import { ModalImageGallery } from './modal/main/ModalImageGallery';
import { ImageGalleryContext } from '../context/ImageGalleryContext';

export interface ImageGalleryProps {
  children: ReactElement<ImageProps>[];
  lazyLoading?: boolean;
  keyboard?: boolean;
  arrowButtons?: boolean;
  swipeable?: boolean;
  className?: string;
}

interface AnimatedImage {
  src: string;
  startRect: Rectangle;
  endRect: Rectangle;
}

export default function ImageGallery({
  children,
  lazyLoading = true,
  keyboard = true,
  arrowButtons = true,
  swipeable = true,
  className = '',
}: ImageGalleryProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const refGallery = useRef<HTMLDivElement>(null);
  const refSlide = useRef<HTMLDivElement>(null);
  const refAnimatedImage = useRef<HTMLImageElement>(null);
  const imageCount = Children.count(children);

  const [animatedImage, setAnimatedImage] = useState<AnimatedImage | null>(null);

  const openModal = (idx: number) => {
    setImageIndex(idx);
    requestAnimationFrame(() => {
      const [image, modalImage] = imageAndModalImage(idx);
      setAnimatedImage({
        src: image.src,
        startRect: image.getBoundingClientRect(),
        endRect: modalImage.getBoundingClientRect(),
      });
    });
  };

  const closeModal = (idx: number) => {
    const [image, modalImage] = imageAndModalImage(idx);

    setAnimatedImage({
      src: image.src,
      startRect: modalImage.getBoundingClientRect(),
      endRect: image.getBoundingClientRect(),
    });

    requestAnimationFrame(() => setImageIndex(null));
  };

  const imageAndModalImage = (idx: number): HTMLImageElement[] => {
    const image = refGallery.current?.children[idx] as HTMLImageElement;
    const modalImage = Array.from(refSlide.current?.children || []).slice(1, -1)[idx].firstElementChild
      ?.firstElementChild as HTMLImageElement;

    return [image, modalImage];
  };

  return (
    <ImageGalleryContext
      value={{
        children: children,
        imageCount: imageCount,
        swipeable: swipeable,
        keyboard: keyboard,
        imageIndex: imageIndex,
        arrowButtons: arrowButtons,
        refSlide: refSlide,
        onClose: closeModal,
      }}
    >
      <div ref={refGallery} className={styles.gallery + (className ? ` ${className}` : '')}>
        {Children.map(children, (child, index) =>
          isValidElement<ImageProps>(child)
            ? cloneElement(child, {
                className: styles.item + (child.props?.className ? ` ${child.props?.className}` : ''),
                loading: lazyLoading ? 'lazy' : undefined,
                onClick: () => openModal(index),
              })
            : child,
        )}
      </div>

      {animatedImage !== null && (
        <AnimatedImageClone
          refAnimatedImage={refAnimatedImage}
          src={animatedImage.src}
          startRect={animatedImage.startRect}
          endRect={animatedImage.endRect}
          onAnimationEnd={() => setAnimatedImage(null)}
        />
      )}

      {imageIndex !== null && <ModalImageGallery />}
    </ImageGalleryContext>
  );
}
