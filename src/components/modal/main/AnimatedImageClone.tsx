import { CSSProperties, RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { Rectangle } from '../../../types/types';
import styles from '../../../style.module.css';

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

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStyle({
        top: endRect.top + window.scrollY,
        left: endRect.left + window.scrollX,
        width: endRect.width,
        height: endRect.height,
        opacity: 0.3,
      });
    });
    return () => cancelAnimationFrame(id);
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

// import { CSSProperties, RefObject, useEffect, useState } from 'react';
// import { Rectangle } from '../../../types/types';
// import styles from '../../../style.module.css';

// interface AnimatedImageCloneProps {
//   src: string;
//   refAnimatedImage: RefObject<HTMLImageElement | null>;
//   startRect: Rectangle;
//   endRect: Rectangle;
//   onAnimationEnd: () => void;
// }

// export default function AnimatedImageClone({
//   src,
//   refAnimatedImage,
//   startRect,
//   endRect,
//   onAnimationEnd,
// }: AnimatedImageCloneProps) {
//   // Compute the scale and translation offsets
//   const scaleX = endRect.width / startRect.width;
//   const scaleY = endRect.height / startRect.height;
//   const translateX = endRect.left - startRect.left;
//   const translateY = endRect.top - startRect.top;

//   const [style, setStyle] = useState<CSSProperties>({
//     position: 'fixed',
//     top: startRect.top,
//     left: startRect.left,
//     width: startRect.width,
//     height: startRect.height,
//     transform: 'translate3d(0, 0, 0) scale(1)',
//     transition: 'transform 0.4s, opacity 0.2s',
//     willChange: 'transform, opacity',
//     opacity: 1,
//     zIndex: 5,
//   });

//   useEffect(() => {
//     // Next frame → animate transform
//     requestAnimationFrame(() => {
//       setStyle((prev) => ({
//         ...prev,
//         transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
//         opacity: 1,
//       }));
//     });
//   }, []);

//   return (
//     <img
//       ref={refAnimatedImage}
//       src={src}
//       className={styles['animated-image-clone']}
//       style={style}
//       onTransitionEnd={onAnimationEnd}
//       draggable={false}
//     />
//   );
// }
