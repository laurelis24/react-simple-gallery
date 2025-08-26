import { Direction } from '../types/types';

interface MyState {
  pos: number;
  direction: Direction;
  imageCount: number;
}

type MyAction = { direction: Direction };

export default function reducer(state: MyState, action: MyAction): MyState {
  switch (action.direction) {
    case 'left':
      return {
        ...state,
        pos: state.pos === state.imageCount ? 1 : state.pos + 1,
      };

    case 'right':
      return {
        ...state,
        pos: state.pos <= 1 ? state.imageCount : state.pos - 1,
      };
  }
}
