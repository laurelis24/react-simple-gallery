import styles from '../../style.module.css';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`${styles['spinner-container']} ${className ? styles[className] : ''}`}>
      <div className={styles['spinner']}>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
        <div className={styles['spinner-dot']}></div>
      </div>
    </div>
  );
}
