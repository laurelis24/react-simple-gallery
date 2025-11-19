import {
  Children,
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ImageProps } from './Image';
import AnimatedImageClone from './modal/main/AnimatedImageClone';
import { GalleryLayout, Rectangle } from '../types/types';
import styles from '../style.module.css';
import ModalImageGallery from './modal/main/ModalImageGallery';
import { ImageGalleryContext } from '../context/ImageGalleryContext';
import useScrollLock from '../hooks/useScrollLock';

export interface ImageGalleryProps {
  children: ReactElement<ImageProps>[];
  lazyLoading?: boolean;
  keyboard?: boolean;
  arrowButtons?: boolean;
  swipeable?: boolean;
  fullScreenButton?: boolean;
  showImageCount?: number;
  sliderThumbnail?: boolean;
  sliderIndex?: boolean;
  sliderTheme?: boolean;
  layout?: GalleryLayout;
  galleryImageAnimation?: boolean;
  sliderAnimationDuration?: number;
  className?: string;
  style?: CSSProperties;
}

interface AnimatedImage {
  src: string;
  startRect: Rectangle;
  endRect: Rectangle;
}

export default function ImageGallery({
  children,
  lazyLoading = true,
  keyboard = true,
  arrowButtons = true,
  swipeable = true,
  fullScreenButton = true,
  showImageCount = Infinity,
  sliderThumbnail = true,
  sliderIndex = true,
  sliderTheme = true,
  sliderAnimationDuration = 300,
  layout = 'masonry',
  galleryImageAnimation = true,
  className = '',
  style = undefined,
}: ImageGalleryProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const refGallery = useRef<HTMLDivElement>(null);
  const refSlide = useRef<HTMLDivElement>(null);
  const imageCount = Children.count(children);

  const refIsAnimating = useRef(false);
  const refAnimationTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationDuration = 350;

  const refAnimatedImage = useRef<HTMLImageElement>(null);
  const [animatedImage, setAnimatedImage] = useState<AnimatedImage | null>(null);

  useScrollLock(imageIndex !== null ? true : false, animationDuration);

  useEffect(() => {
    return () => {
      if (refAnimationTimeout.current) {
        clearTimeout(refAnimationTimeout.current);
      }
    };
  }, []);

  const openModal = (idx: number) => {
    if (refIsAnimating.current) return;
    refIsAnimating.current = true;
    setImageIndex(idx);
    requestAnimationFrame(() => {
      const [image, modalImage] = imageAndModalImage(idx);
      if (galleryImageAnimation) {
        setAnimatedImage({
          src: image.src,
          startRect: image.getBoundingClientRect(),
          endRect: modalImage.getBoundingClientRect(),
        });
      }
    });

    setAnimationTimeout();
  };

  const closeModal = (idx: number) => {
    if (refIsAnimating.current) return;
    refIsAnimating.current = true;

    if (showImageCount - 1 >= idx && galleryImageAnimation) {
      const [image, modalImage] = imageAndModalImage(idx);
      setAnimatedImage({
        src: image.src,
        startRect: modalImage.getBoundingClientRect(),
        endRect: image.getBoundingClientRect(),
      });
    }
    requestAnimationFrame(() => setImageIndex(null));
    setAnimationTimeout();
  };

  const imageAndModalImage = (idx: number): HTMLImageElement[] => {
    const image = refGallery.current?.children[idx] as HTMLImageElement;
    const modalImage = Array.from(refSlide.current?.children || []).slice(1, -1)[idx].firstElementChild
      ?.firstElementChild as HTMLImageElement;

    return [image, modalImage];
  };

  const setAnimationTimeout = () => {
    refAnimationTimeout.current = setTimeout(() => {
      refIsAnimating.current = false;
      refAnimationTimeout.current = null;
    }, animationDuration);
  };

  if (children.length < 2) {
    throw new Error('For gallery to work properly, please use atleast 2 images');
  }

  return (
    <ImageGalleryContext
      value={{
        children: children,
        imageCount: imageCount,
        swipeable: swipeable,
        keyboard: keyboard,
        imageIndex: imageIndex,
        arrowButtons: arrowButtons,
        refSlide: refSlide,
        fullScreenButton: fullScreenButton,
        sliderThumbnail: sliderThumbnail,
        sliderIndex: sliderIndex,
        sliderTheme: sliderTheme,
        layout: layout,
        galleryImageAnimation: galleryImageAnimation,
        sliderAnimationDuration: sliderAnimationDuration,
        onClose: closeModal,
      }}
    >
      <div
        ref={refGallery}
        style={style}
        className={`${styles.gallery} ${styles[layout]} ${className ? className : ''}`.trim()}
      >
        {Children.map(children.slice(0, showImageCount), (child, index) =>
          isValidElement<ImageProps>(child)
            ? cloneElement(child, {
                className: styles.item + (child.props?.className ? ` ${child.props?.className}` : ''),
                loading: lazyLoading ? 'lazy' : undefined,
                onClick: () => openModal(index),
              })
            : child,
        )}
      </div>

      {galleryImageAnimation && animatedImage !== null && (
        <AnimatedImageClone
          refAnimatedImage={refAnimatedImage}
          src={animatedImage.src}
          startRect={animatedImage.startRect}
          endRect={animatedImage.endRect}
          onAnimationEnd={() => setAnimatedImage(null)}
        />
      )}

      {imageIndex !== null && <ModalImageGallery />}
    </ImageGalleryContext>
  );
}
