import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store'

import { Log } from '../models/log.model';

@Injectable()
export class LogActions {
  static REQUEST_LOG = 'REQUEST_LOG';
  static LOAD_LOG = 'LOAD_LOG';
  static LOAD_LOG_SUCCESS = 'LOAD_LOGS_SUCCESS';
  static ADD_LOG = 'ADD_LOG';
  static ADD_LOG_SUCCESS = 'ADD_LOG_SUCCESS';
  static ADD_LOG_FAILURE = 'ADD_LOG_FAILURE';
  static EDIT_LOG = 'EDIT_LOG';
  static EDIT_LOG_SUCCESS = 'EDIT_LOG_SUCCESS';
  static EDIT_LOG_FAILURE = 'EDIT_LOG_FAILURE';
  static DELETE_LOG = 'DELETE_LOG';
  static DELETE_LOG_SUCCESS = 'DELETE_LOG_SUCCESS';
  static DELETE_LOG_FAILURE = 'DELETE_LOG_FAILURE';

  loadlog(): Action {
    return {
      type: LogActions.REQUEST_LOG
    };
  }

  loadlogSuccess(log: Array<Log>): Action {
    return {
      type: LogActions.LOAD_LOG_SUCCESS,
      payload: log
    };
  }

  addlogSuccess(log: Log): Action {
    return {
      type: LogActions.ADD_LOG_SUCCESS,
      payload: log
    };
  }

  addlogFailure(): Action {
    return {
      type: LogActions.ADD_LOG_FAILURE
    };
  }

  editlogSuccess(log: Log): Action {
    return {
      type: LogActions.EDIT_LOG_SUCCESS,
      payload: log
    };
  }

  editlogFailure(): Action {
    return {
      type: LogActions.EDIT_LOG_FAILURE
    };
  }

  deletelogSuccess(log: Log): Action {
    return {
      type: LogActions.DELETE_LOG_SUCCESS,
      payload: log
    };
  }

  deletelogFailure(): Action {
    return {
      type: LogActions.DELETE_LOG_FAILURE
    };
  }
}
