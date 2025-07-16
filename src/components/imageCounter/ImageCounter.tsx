interface ImageCounterProps {
  imageIdx: number;
  maxImageCount: number;
}
export default function ImageCounter({ imageIdx, maxImageCount }: ImageCounterProps) {
  return (
    <span className="image-counter">
      {imageIdx + 1} / {maxImageCount}
    </span>
  );
}
