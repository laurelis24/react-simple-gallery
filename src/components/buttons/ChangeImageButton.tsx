import { useRef } from 'react';
import '../../style.css';

interface ButtonProps {
  handleButtonClick: () => void;
  direction: 'left' | 'right';
}

export default function ChangeImageButton({ handleButtonClick, direction }: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  let clicked = useRef(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();

        if (ref.current && !clicked.current) {
          clicked.current = true;
          handleButtonClick();
          ref.current.classList.add('clicked');

          setTimeout(() => {
            ref.current?.classList.remove('clicked');
            clicked.current = false;
          }, 400);
        }
      }}
      className={direction === 'left' ? 'left-btn' : 'right-btn'}
      ref={ref}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
}
