interface ExitButtonProps {
  handleClose: () => void;
}
export default function ExitButton({ handleClose }: ExitButtonProps) {
  return (
    <button title="Close modal" onClick={handleClose}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
