import { CSSProperties, RefObject, useLayoutEffect, useState } from 'react';
import { Rectangle } from '../types/types';
import styles from '../style.module.css';

interface AnimatedImageClone {
  src: string;
  refAnimatedImage: RefObject<HTMLImageElement | null>;
  startRect: Rectangle;
  endRect: Rectangle;
  onAnimationEnd: () => void;
}

export default function AnimatedImageClone({
  src,
  refAnimatedImage,
  startRect,
  endRect,
  onAnimationEnd,
}: AnimatedImageClone) {
  const [style, setStyle] = useState<CSSProperties>({
    top: startRect.top + window.scrollY,
    left: startRect.left + window.scrollX,
    width: startRect.width,
    height: startRect.height,
  });

  useLayoutEffect(() => {
    setStyle({
      top: endRect.top + window.scrollY,
      left: endRect.left + window.scrollX,
      width: endRect.width,
      height: endRect.height,
      opacity: 0.3,
    });
  }, []);

  return (
    <img
      className={styles['animated-image-clone']}
      ref={refAnimatedImage}
      src={src}
      style={style}
      onTransitionEnd={onAnimationEnd}
      draggable={false}
    />
  );
}
