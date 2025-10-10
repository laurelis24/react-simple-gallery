import { useEffect, useRef, useState } from 'react';
import useImageGalleryContext from './useImageGalleryContext';
import { MyState, MySwipeDirection, Rectangle } from '../types/types';

interface AnimatedImageProps {
  enabled: boolean;
}

interface AnimatedImage {
  src: string;
  startRect: Rectangle;
  endRect: Rectangle;
}

export default function useAnimatedImage({ enabled }: AnimatedImageProps) {
  const refAnimatedImage = useRef<HTMLImageElement>(null);
  const [animatedImage, setAnimatedImage] = useState<AnimatedImage | null>(null);

  return [refAnimatedImage, animatedImage, setAnimatedImage];
}
