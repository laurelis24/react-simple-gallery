import { createContext, RefObject } from 'react';
import { ImageGalleryProps } from '../components/ImageGallery';

interface ImageGalleryContextProps extends Readonly<Omit<ImageGalleryProps, 'lazyloading' & 'className'>> {
  imageCount: number;
  refSlide: RefObject<HTMLDivElement | null>;
  imageIndex: number | null;
  onClose: (idx: number) => void;
}

export const ImageGalleryContext = createContext<ImageGalleryContextProps | null>(null);
``;
