import { createFeatureSelector } from '@ngrx/store';

import {
  Actions,
  LOAD_CASES,
  LOAD_CASES_SUCCESS,
  ADD_CASE,
  ADD_CASE_SUCCESS,
  ADD_CASE_FAILURE,
  EDIT_CASE,
  EDIT_CASE_SUCCESS,
  EDIT_CASE_FAILURE,
  DELETE_CASE,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_FAILURE
} from '../actions/case.actions';

import { Case } from '../models/case.model';

export interface CaseState {
  data: Array<Case>,
  type?: Actions,
  error?: boolean
}

export function initialState(): CaseState {
  /* istanbul ignore if */
  if (typeof(window) !== 'undefined' &&
      typeof(window['TRANSFER_STATE']) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state.cases) !== 'undefined') {
    return window['TRANSFER_STATE'].state.cases;
  } else {
    return {
      data: undefined
    };
  }
}

export function caseReducer(state: CaseState = initialState(), action: Actions) {

  switch (action.type) {


    case LOAD_CASES_SUCCESS: {
      return {
        ...state.data,
        data: action.payload,
        type: LOAD_CASES,
        error: false
      }
    }

    case ADD_CASE_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: ADD_CASE,
        error: false
      }
    }

    case ADD_CASE_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: ADD_CASE,
        error: true
      }
    }

    case EDIT_CASE_SUCCESS: {
      const caseIndex = state.data.findIndex((singleCase: Case) => singleCase._id === action.payload._id);

      return {
        data: [
          ...state.data.slice(0, caseIndex),
          action.payload,
          ...state.data.slice(caseIndex + 1)
        ],
        type: EDIT_CASE,
        error: false
      }
    }

    case EDIT_CASE_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: EDIT_CASE,
        error: true
      }
    }

    case DELETE_CASE_SUCCESS: {
      return {
        data: state.data.filter((singleCase: Case) => {
          return singleCase._id !== action.payload._id;
        }),
        type: DELETE_CASE,
        error: false
      };
    }

    case DELETE_CASE_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: DELETE_CASE,
        error: true
      }
    }

    default: {
      return state;
    }
  }
};

export const getCaseState = createFeatureSelector<CaseState>('cases');
