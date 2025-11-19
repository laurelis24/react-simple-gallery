import { ImgHTMLAttributes } from 'react';
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  key?: string | number;
  src: string;
  title?: string;
  description?: string;
}

export default function Image({ ...rest }: ImageProps) {
  return <img {...rest} />;
}
