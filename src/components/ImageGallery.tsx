import { Children, cloneElement, isValidElement, ReactElement, useRef, useState } from 'react';
import '../style.css';
import { ImageSlider } from './ImageSlider';
import { ImageProps } from './Image';

interface ImageGalleryProps {
  children: ReactElement<ImageProps>[];
  lazyLoading?: boolean;
  keyboard?: boolean;
  arrowKeys?: boolean;
  swipable?: boolean;
  className?: string;
}

export default function ImageGallery({
  children,
  lazyLoading = true,
  keyboard = true,
  arrowKeys = true,
  swipable = true,
  className = '',
}: ImageGalleryProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const openModal = (idx: number) => {
    setImageIndex(idx);
  };

  const closeModal = () => {
    setImageIndex(null);
  };
  return (
    <>
      <div ref={galleryRef} className={`gallery ${className}`.trim()}>
        {Children.map(children, (child, index) =>
          isValidElement<ImageProps>(child)
            ? cloneElement(child, {
                className: `item ${child.props?.className}`.trim(),
                loading: lazyLoading ? 'lazy' : 'eager',
                onClick: () => openModal(index),
              })
            : child,
        )}
      </div>

      {imageIndex !== null && (
        <ImageSlider
          maxImages={Children.count(children)}
          galleryRef={galleryRef}
          imageIndex={imageIndex}
          keyboard={keyboard}
          arrowButtons={arrowKeys}
          swipable={swipable}
          onClose={closeModal}
        />
      )}
    </>
  );
}
