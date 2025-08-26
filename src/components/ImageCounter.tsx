import styles from '../style.module.css';

interface ImageCounterProps {
  imagePosition: number;
  imageCount: number;
}
export default function ImageCounter({ imagePosition, imageCount }: ImageCounterProps) {
  return (
    <span className={styles['image-counter']}>
      {imagePosition} / {imageCount}
    </span>
  );
}
