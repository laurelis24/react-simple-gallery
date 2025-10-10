import { MyAction, MyState } from '../types/types';

export default function reducer(state: MyState, action: MyAction): MyState {
  const leftPos = action.direction === 'Left' && state.pos === state.imageCount + 1 ? 1 : state.pos + 1;
  const rightPos = action.direction === 'Right' && state.pos <= 0 ? state.imageCount : state.pos - 1;

  action.refIndex.current = action.direction === 'Right' ? rightPos : leftPos;

  switch (action.direction) {
    case 'Left':
      return {
        ...state,
        pos: leftPos,
      };

    case 'Right':
      return {
        ...state,
        pos: rightPos,
      };

    case 'Down':
      return state;

    case 'Up':
      return state;

    case 'BasedOnIndex':
      return {
        ...state,
        pos: action.pos || 1,
      };
  }
}
