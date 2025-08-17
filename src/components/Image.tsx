import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export default function Image({ src, alt = '', ...rest }: ImageProps) {
  return <img src={src} alt={alt} {...rest} />;
}
