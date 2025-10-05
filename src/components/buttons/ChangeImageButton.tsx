import { Direction } from '../../types/types';
import styles from '../../style.module.css';
interface ChangeImageButtonProps {
  handleButtonClick: () => void;
  direction: Direction;
}

export default function ChangeImageButton({ handleButtonClick, direction }: ChangeImageButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleButtonClick();
      }}
      className={`${direction === 'left' ? styles['left-btn'] : styles['right-btn']}`}
      title={direction === 'left' ? 'Previous image' : 'Next image'}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      )}
    </button>
  );
}
