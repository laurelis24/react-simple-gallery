import styles from '../style.module.css';
export default function SliderImageContainer({ src }: { src: string }) {
  return (
    <div className={styles['slide-container']}>
      <div className={styles['img-container']}>
        <img src={src} draggable={false} />
      </div>
    </div>
  );
}
