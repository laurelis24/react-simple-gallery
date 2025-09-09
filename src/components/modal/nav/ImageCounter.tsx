import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import styles from '../../../style.module.css';

interface ImageCounterProps {
  imagePosition: number;
}
export default function ImageCounter({ imagePosition }: ImageCounterProps) {
  const { imageCount } = useImageGalleryContext();

  return (
    <span className={styles['image-counter']}>
      {imagePosition} / {imageCount}
    </span>
  );
}
