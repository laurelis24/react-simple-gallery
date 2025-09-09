import { MyAction, MyState } from '../types/types';

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
    case 'set-position':
      return {
        ...state,
        pos: action.pos || 0,
      };
  }
}
