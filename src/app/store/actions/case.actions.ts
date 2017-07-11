import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store'

import { Case } from './../models/case.model';

@Injectable()
export class CaseActions {
  static REQUEST_CASES = 'REQUEST_CASES';
  static LOAD_CASES = 'LOAD_CASES';
  static LOAD_CASES_SUCCESS = 'LOAD_CASES_SUCCESS';
  static ADD_CASE = 'ADD_CASE';
  static ADD_CASE_SUCCESS = 'ADD_CASE_SUCCESS';
  static ADD_CASE_FAILURE = 'ADD_CASE_FAILURE';
  static EDIT_CASE = 'EDIT_CASE';
  static EDIT_CASE_SUCCESS = 'EDIT_CASE_SUCCESS';
  static DELETE_CASE = 'DELETE_CASE';
  static DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';

  loadCases(): Action {
    return {
      type: CaseActions.REQUEST_CASES
    };
  }

  loadCasesSuccess(cases: Array<Case>): Action {
    return {
      type: CaseActions.LOAD_CASES_SUCCESS,
      payload: cases
    };
  }

  addCaseSuccess(singleCase: Case): Action {
    return {
      type: CaseActions.ADD_CASE_SUCCESS,
      payload: singleCase
    };
  }

  addCaseFailure(): Action {
    return {
      type: CaseActions.ADD_CASE_FAILURE
    };
  }

  editCaseSuccess(singleCase: Case): Action {
    return {
      type: CaseActions.EDIT_CASE_SUCCESS,
      payload: singleCase
    };
  }

  deleteCaseSuccess(singleCase: Case): Action {
    return {
      type: CaseActions.DELETE_CASE_SUCCESS,
      payload: singleCase
    };
  }
}
