import { Action } from '@ngrx/store';

import { LogActions } from '../actions/log.actions';

import { Log } from '../models/log.model';

export function initialState(): any {
  /* istanbul ignore if */
  if (typeof(window) !== 'undefined' &&
      typeof(window['TRANSFER_STATE']) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state.log) !== 'undefined') {
    return window['TRANSFER_STATE'].state.log;
  } else {
    return [];
  }
}

export function logReducer(state: any = initialState(), action: Action) {

  switch (action.type) {

    case LogActions.LOAD_LOG_SUCCESS: {
      return {
        ...state.data,
        data: action.payload,
        type: LogActions.LOAD_LOG,
        error: false
      }
    }

    case LogActions.ADD_LOG_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: LogActions.ADD_LOG,
        error: false
      }
    }

    case LogActions.ADD_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: LogActions.ADD_LOG,
        error: true
      }
    }

    case LogActions.EDIT_LOG_SUCCESS: {
      const logIndex = state.data.findIndex((singleLog: Log) => singleLog._id === action.payload._id);

      return {
        data: [
          ...state.data.slice(0, logIndex),
          action.payload,
          ...state.data.slice(logIndex + 1)
        ],
        type: LogActions.EDIT_LOG,
        error: false
      }
    }

    case LogActions.EDIT_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: LogActions.EDIT_LOG,
        error: true
      }
    }

    case LogActions.DELETE_LOG_SUCCESS: {
      return {
        data: state.data.filter((singleLog: Log) => {
          return singleLog._id !== action.payload._id;
        }),
        type: LogActions.DELETE_LOG,
        error: false
      };
    }

    case LogActions.DELETE_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: LogActions.DELETE_LOG,
        error: true
      }
    }

    default: {
      return state;
    }
  }
};
