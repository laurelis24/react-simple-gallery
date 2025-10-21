import useFullscreen from '../../hooks/useFullscreen';

interface FullScreenButtonProps {
  refSlider: React.RefObject<HTMLDivElement | null>;
}
export default function FullScreenButton({ refSlider }: FullScreenButtonProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen(refSlider);

  return (
    <button title="Toggle full-screen mode" onClick={toggleFullscreen}>
      {!isFullscreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"
          />
        </svg>
      )}
    </button>
  );
}
