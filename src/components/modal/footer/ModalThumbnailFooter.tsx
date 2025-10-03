import { Children, useEffect, useRef } from 'react';
import styles from '../../../style.module.css';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { Direction, MyState } from '../../../types/types';
import useImageGalleryContext from '../../../hooks/useImageGalleryContext';

interface ModalThumbnailProps {
  state: MyState;
  setPosition: (direction: Direction, position: number) => void;
}

export default function ModalThumbnailFooter({ state, setPosition }: ModalThumbnailProps) {
  const { children } = useImageGalleryContext();
  const refThumbnailSlider = useRef<HTMLDivElement>(null);
  const offsetX = useRef(0);
  const velocityX = useRef(0);
  let animationFrame: number | null = null;
  const clickThreshold = 5; // max movement allowed to count as click
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!refThumbnailSlider.current) return;
    startX = e.clientX;
    startY = e.clientY;
    isDragging = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!refThumbnailSlider.current) return;
    if (Math.abs(e.clientX - startX) > clickThreshold || Math.abs(e.clientY - startY) > clickThreshold) {
      isDragging = true;
    }
  };

  const slideAnimation = (data: SwipeEventData) => {
    if (!refThumbnailSlider.current) return;
    const slider = refThumbnailSlider.current;

    // Disable transition while dragging
    slider.style.transition = 'none';

    const container = slider.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const contentWidth = slider.scrollWidth;
    if (contentWidth <= containerWidth) return;
    const minX = Math.min(0, containerWidth - contentWidth - 5);
    const maxX = Math.max(0, Math.abs(containerWidth - contentWidth) + 5);

    let newX = offsetX.current + data.deltaX;

    // Clamp
    if (newX > maxX) newX = maxX;
    if (newX < minX) newX = minX;

    slider.style.transform = `translateX(${newX}px)`;
  };

  const handleSwipeEnd = (data: SwipeEventData) => {
    if (!refThumbnailSlider.current) return;
    const slider = refThumbnailSlider.current;

    // Store final offset
    const style = getComputedStyle(slider);
    const matrix = new WebKitCSSMatrix(style.transform);
    offsetX.current = matrix.m41;

    // Calculate momentum
    velocityX.current = data.velocity * (data.dir === 'Left' ? -1 : 1);
    startMomentum();
  };

  const scrollToIndex = (index: number) => {
    if (!refThumbnailSlider.current) return;
    const slider = refThumbnailSlider.current;
    const container = slider.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const contentWidth = slider.scrollWidth;
    if (contentWidth <= containerWidth) return;
    const minX = Math.min(0, containerWidth - contentWidth - 5);
    const maxX = Math.max(0, Math.abs(containerWidth - contentWidth) + 5);

    const child = slider.children[index] as HTMLElement;
    if (!child) return;

    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    let newX = containerWidth / 2 - childCenter;

    // Clamp
    if (newX > maxX) newX = maxX;
    if (newX < minX) newX = minX;

    offsetX.current = newX;

    // Apply transition only when snapping to thumbnail
    slider.style.transition = 'transform 0.3s';
    slider.style.transform = `translateX(${newX}px)`;
  };

  const handleClick = (index: number) => {
    if (!isDragging) {
      setPosition('set-position', index + 1);
      scrollToIndex(index);
    }
  };

  useEffect(() => {
    scrollToIndex(state.pos - 1);
  }, [state.pos]);

  const startMomentum = () => {
    const slider = refThumbnailSlider.current;
    const container = slider?.parentElement;
    if (!slider || !container) return;

    const containerWidth = container.clientWidth;
    const contentWidth = slider.scrollWidth;
    if (contentWidth <= containerWidth) return;

    const minX = Math.min(0, containerWidth - contentWidth - 5);
    const maxX = Math.max(0, Math.abs(containerWidth - contentWidth) + 5);

    const step = () => {
      // Apply velocity
      offsetX.current += velocityX.current * 20; // 20 = speed multiplier

      // Friction
      velocityX.current *= 0.95; // slows down gradually

      // Clamp edges
      if (offsetX.current > maxX) {
        offsetX.current = maxX;
        velocityX.current = 0;
      }
      if (offsetX.current < minX) {
        offsetX.current = minX;
        velocityX.current = 0;
      }

      // Apply transform
      slider.style.transform = `translateX(${offsetX.current}px)`;

      // Continue until velocity is negligible
      if (Math.abs(velocityX.current) > 0.1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    if (animationFrame) cancelAnimationFrame(animationFrame);
    step();
  };

  const handleSwiper = useSwipeable({
    onSwiping: slideAnimation,
    onSwiped: handleSwipeEnd,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className={styles['thumbnail-footer-container']}>
      <div className={styles['thumbnail-footer']}>
        <div
          {...handleSwiper}
          ref={(el) => {
            refThumbnailSlider.current = el;
            handleSwiper.ref(el);
          }}
          className={`${styles['thumbnail-slider']} ${styles['unselectable']}`}
        >
          {Children.map(children, (child, idx) => (
            <div
              className={`${state.pos === idx + 1 ? styles['selected'] : ''}`}
              key={idx}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={() => handleClick(idx)}
            >
              <img src={child.props.src} alt={child.props.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
