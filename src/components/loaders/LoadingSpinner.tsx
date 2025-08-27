import styles from '../../style.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles['spinner-container']}>
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
