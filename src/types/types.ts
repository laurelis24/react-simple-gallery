import { RefObject } from 'react';
import { SwipeDirections } from 'react-swipeable';

export type Theme = 'dark' | 'light';
export type GalleryLayout = 'flex' | 'masonry' | 'responsive';
export type MySwipeDirection = SwipeDirections | 'BasedOnIndex';

export interface Rectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MyState {
  pos: number;
  direction: MySwipeDirection;
  imageCount: number;
}

export type MyAction = { direction: MySwipeDirection; pos?: number; refIndex: RefObject<number> };
