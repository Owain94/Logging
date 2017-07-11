import { Action } from '@ngrx/store';

import { CaseActions } from './../actions/case.actions';

import { Case } from '../models/case.model';

export function initialState(): any {
  if (typeof(window) !== 'undefined' && typeof(window['TRANSFER_STATE'].state) !== 'undefined') {
    return window['TRANSFER_STATE'].state.cases;
  } else {
    return [];
  }
}

export function caseReducer(state: any = initialState(), action: Action) {

  switch (action.type) {

    case CaseActions.LOAD_CASES_SUCCESS: {
      return {
        ...state.data,
        data: action.payload,
        type: CaseActions.LOAD_CASES,
        error: false
      }
    }

    case CaseActions.ADD_CASE_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: CaseActions.ADD_CASE,
        error: false
      }
    }

    case CaseActions.ADD_CASE_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: CaseActions.ADD_CASE,
        error: true
      }
    }

    case CaseActions.DELETE_CASE_SUCCESS: {
      return {
        data: state.data.filter((singleCase: Case) => {
          return singleCase._id !== action.payload.id;
        }),
        type: CaseActions.DELETE_CASE,
        error: true
      };
    }

    default: {
      return state;
    }
  }
};
