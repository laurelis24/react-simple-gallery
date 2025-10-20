import { useContext } from 'react';
import { ImageGalleryContext } from '../context/ImageGalleryContext';

export default function useImageGalleryContext() {
  const context = useContext(ImageGalleryContext);

  if (!context) {
    throw new Error('Something went wrong with image gallery!');
  }
  return {
    children: context.children,
    arrowButtons: context.arrowButtons,
    swipeable: context.swipeable,
    imageCount: context.imageCount,
    imageIndex: context.imageIndex,
    refSlide: context.refSlide,
    keyboard: context.keyboard || false,
    fullScreenButton: context.fullScreenButton,
    sliderThumbnail: context.sliderThumbnail || false,
    sliderIndex: context.sliderIndex,
    sliderTheme: context.sliderTheme,
    sliderAnimationDuration: context.sliderAnimationDuration,
    onClose: context.onClose,
  };
}
