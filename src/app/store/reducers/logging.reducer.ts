import { Action } from '@ngrx/store';

export function logger(reducer: any) {
  return function newReducer(state: any, action: Action) {
    const nextState = reducer(state, action);
    if (process.env.NODE_ENV === 'development' && process.env.NODE_PLATFORM === 'client') {
      console.groupCollapsed(`State change: ${action.type}`);
      console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
      console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
      console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
      console.groupEnd();
    }
    return nextState;
  }
}
