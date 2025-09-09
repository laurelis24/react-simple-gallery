import { useState } from 'react';
import styles from '../../../style.module.css';
import LoadingSpinner from '../../loaders/LoadingSpinner';
export default function SliderImageContainer({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles['slide-container']}>
      <div className={styles['img-container']}>
        <img src={src} onLoad={() => setLoading(false)} draggable={false} style={{ opacity: loading ? 0 : 1 }} />
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}
