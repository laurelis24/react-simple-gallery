interface ThumbnailNavigationButtonProps {
  onToggleThumbnailNavigation: () => void;
}

export default function ThumbnailNavigationButton({ onToggleThumbnailNavigation }: ThumbnailNavigationButtonProps) {
  return (
    <button onClick={onToggleThumbnailNavigation} title="Toggle thumbnail navigation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Main slider window */}
        <rect x="3" y="3" width="18" height="12" rx="2" ry="2" />

        {/* Thumbnail indicators below */}
        <rect x="5" y="18" width="3" height="3" rx="0.5" />
        <rect x="10.5" y="18" width="3" height="3" rx="0.5" />
        <rect x="16" y="18" width="3" height="3" rx="0.5" />
      </svg>
    </button>
  );
}
