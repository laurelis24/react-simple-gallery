import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import styles from '../../../style.module.css';

interface ImageCounterProps {
  imagePosition: number;
}
export default function ImageCounter({ imagePosition }: ImageCounterProps) {
  const { imageCount } = useImageGalleryContext();
  const logicalIndex = (() => {
    if (imagePosition === 0) return imageCount;
    if (imagePosition === imageCount + 1) return 1;
    return imagePosition;
  })();
  return (
    <div className={styles['image-position']}>
      <span className={styles['current']}>{Math.min(Math.max(logicalIndex, 1), imageCount)}</span>
      <span className={styles['divider']}>/</span>
      <span className={styles['total']}>{imageCount}</span>
    </div>
  );
}
