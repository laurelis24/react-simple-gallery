import { useRef, useState } from 'react';
import '../style.css';
import { ImageSlider } from './ImageSlider';

export default function ImageGallery({
  images,
  lazyLoading = true,
  keyboard = true,
  className,
}: {
  images: { id: number; src: string }[];
  lazyLoading?: boolean;
  keyboard?: boolean;
  className?: string;
}) {
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
      <div ref={galleryRef} className={`gallery ${className}`}>
        {images.map((image, idx) => (
          <img
            key={image?.id || idx}
            loading={lazyLoading ? 'lazy' : 'eager'}
            className="item"
            onClick={() => openModal(idx)}
            src={image.src}
          ></img>
        ))}
      </div>

      {imageIndex !== null && (
        <ImageSlider
          maxImages={images.length}
          galleryRef={galleryRef}
          imageIndex={imageIndex}
          keyboard={keyboard}
          onClose={closeModal}
        />
      )}
    </>
  );
}
