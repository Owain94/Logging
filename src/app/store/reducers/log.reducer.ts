import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  Actions,
  LOAD_LOG,
  LOAD_LOG_SUCCESS,
  ADD_LOG,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
  EDIT_LOG,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_FAILURE,
  DELETE_LOG,
  DELETE_LOG_SUCCESS,
  DELETE_LOG_FAILURE
} from '../actions/log.actions';

import { Log } from '../models/log.model';

export interface LogState {
  data: Array<Log>,
  type?: Actions,
  error?: boolean
}

export interface State {
  log: LogState;
}

const initialState: LogState = {
  data: []
};

export function logReducer(state: LogState = initialState, action: Actions) {

  switch (action.type) {

    case LOAD_LOG_SUCCESS: {
      return {
        data: action.payload,
        type: LOAD_LOG,
        error: false
      }
    }

    case ADD_LOG_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: ADD_LOG,
        error: false
      }
    }

    case ADD_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: ADD_LOG,
        error: true
      }
    }

    case EDIT_LOG_SUCCESS: {
      const logIndex = state.data.findIndex((singleLog: Log) => singleLog._id === action.payload._id);

      return {
        data: [
          ...state.data.slice(0, logIndex),
          action.payload,
          ...state.data.slice(logIndex + 1)
        ],
        type: EDIT_LOG,
        error: false
      }
    }

    case EDIT_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: EDIT_LOG,
        error: true
      }
    }

    case DELETE_LOG_SUCCESS: {
      return {
        data: state.data.filter((singleLog: Log) => {
          return singleLog._id !== action.payload._id;
        }),
        type: DELETE_LOG,
        error: false
      };
    }

    case DELETE_LOG_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: DELETE_LOG,
        error: true
      }
    }

    default: {
      return state;
    }
  }
};

const getLoggingState = createFeatureSelector<any>('logging');

const getLogState = createSelector(
  getLoggingState,
  (state: State) => state.log
);

export const getLogsForCase = (id: string) => createSelector(
  getLogState,
  (allLogs) => {
    return allLogs.data.filter((log) => {
      return log.case === id;
    });
  }
);
