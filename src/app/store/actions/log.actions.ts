import { Action } from '@ngrx/store'

import { Log } from '../models/log.model';

export const REQUEST_LOG = 'REQUEST_LOG';
export const LOAD_LOG = 'LOAD_LOG';
export const LOAD_LOG_SUCCESS = 'LOAD_LOGS_SUCCESS';
export const ADD_LOG = 'ADD_LOG';
export const ADD_LOG_SUCCESS = 'ADD_LOG_SUCCESS';
export const ADD_LOG_FAILURE = 'ADD_LOG_FAILURE';
export const EDIT_LOG = 'EDIT_LOG';
export const EDIT_LOG_SUCCESS = 'EDIT_LOG_SUCCESS';
export const EDIT_LOG_FAILURE = 'EDIT_LOG_FAILURE';
export const DELETE_LOG = 'DELETE_LOG';
export const DELETE_LOG_SUCCESS = 'DELETE_LOG_SUCCESS';
export const DELETE_LOG_FAILURE = 'DELETE_LOG_FAILURE';

export class LoadLog implements Action {
  readonly type = REQUEST_LOG;
}

export class LoadLogSuccess implements Action {
  readonly type = LOAD_LOG_SUCCESS;

  constructor(public payload: Array<Log>) {}
}

export class AddLog implements Action {
  readonly type = ADD_LOG;

  constructor(public payload: Log) {}
}

export class AddLogSuccess implements Action {
  readonly type = ADD_LOG_SUCCESS;

  constructor(public payload: Log) {}
}

export class AddLogFailure implements Action {
  readonly type = ADD_LOG_FAILURE;
}

export class EditLogSuccess implements Action {
  readonly type = EDIT_LOG_SUCCESS;

  constructor(public payload: Log) {}
}

export class EditLog implements Action {
  readonly type = EDIT_LOG;

  constructor(public payload: Log) {}
}

export class EditLogFailure implements Action {
  readonly type = EDIT_LOG_FAILURE;
}

export class DeleteLogSuccess implements Action {
  readonly type = DELETE_LOG_SUCCESS;

  constructor(public payload: Log) {}
}

export class DeleteLog implements Action {
  readonly type = DELETE_LOG;

  constructor(public payload: Log) {}
}

export class DeleteLogFailure implements Action {
  readonly type = DELETE_LOG_FAILURE;
}

export type Actions =
  | LoadLog
  | LoadLogSuccess
  | AddLogSuccess
  | AddLogFailure
  | EditLogSuccess
  | EditLogFailure
  | DeleteLogSuccess
  | DeleteLogFailure;
