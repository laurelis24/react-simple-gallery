export type Direction = 'left' | 'right' | 'set-position';
export type GalleryLayout = 'flex' | 'masonry';

export interface Rectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MyState {
  pos: number;
  direction: Direction;
  imageCount: number;
}

export type MyAction = { direction: Direction; pos?: number };
