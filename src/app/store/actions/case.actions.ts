import { Action } from '@ngrx/store'

import { Case } from '../models/case.model';

export const REQUEST_CASES = 'REQUEST_CASES';
export const LOAD_CASES = 'LOAD_CASES';
export const LOAD_CASES_SUCCESS = 'LOAD_CASES_SUCCESS';
export const ADD_CASE = 'ADD_CASE';
export const ADD_CASE_SUCCESS = 'ADD_CASE_SUCCESS';
export const ADD_CASE_FAILURE = 'ADD_CASE_FAILURE';
export const EDIT_CASE = 'EDIT_CASE';
export const EDIT_CASE_SUCCESS = 'EDIT_CASE_SUCCESS';
export const EDIT_CASE_FAILURE = 'EDIT_CASE_FAILURE';
export const DELETE_CASE = 'DELETE_CASE';
export const DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';
export const DELETE_CASE_FAILURE = 'DELETE_CASE_FAILURE';

export class LoadCases implements Action {
  readonly type = REQUEST_CASES;
}

export class LoadCasesSuccess implements Action {
  readonly type = LOAD_CASES_SUCCESS;

  constructor(public payload: Array<Case>) {}
}

export class AddCase implements Action {
  readonly type = ADD_CASE;

  constructor(public payload: Case) {}
}

export class AddCaseSuccess implements Action {
  readonly type = ADD_CASE_SUCCESS;

  constructor(public payload: Case) {}
}

export class AddCaseFailure implements Action {
  readonly type = ADD_CASE_FAILURE;
}

export class EditCase implements Action {
  readonly type = EDIT_CASE;

  constructor(public payload: Case) {}
}

export class EditCaseSuccess implements Action {
  readonly type = EDIT_CASE_SUCCESS;

  constructor(public payload: Case) {}
}

export class EditCaseFailure implements Action {
  readonly type = EDIT_CASE_FAILURE;
}

export class DeleteCaseSuccess implements Action {
  readonly type = DELETE_CASE_SUCCESS;

  constructor(public payload: Case) {}
}

export class DeleteCase implements Action {
  readonly type = DELETE_CASE;

  constructor(public payload: Case) {}
}

export class DeleteCaseFailure implements Action {
  readonly type = DELETE_CASE_FAILURE;
}

export type Actions =
  | LoadCases
  | LoadCasesSuccess
  | AddCase
  | AddCaseSuccess
  | AddCaseFailure
  | EditCase
  | EditCaseSuccess
  | EditCaseFailure
  | DeleteCase
  | DeleteCaseSuccess
  | DeleteCaseFailure;
