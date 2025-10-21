import { useState } from 'react';
import styles from '../../../style.module.css';
import LoadingSpinner from '../../loaders/LoadingSpinner';
export default function SliderImageContainer({ src, alt }: { src: string; alt?: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles['slide-container']}>
      <div className={styles['img-container']}>
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          draggable={false}
          style={{ display: loading ? 'hidden' : 'inherit' }}
        />

        {loading && <LoadingSpinner className="modal-spinner" />}
      </div>
    </div>
  );
}
