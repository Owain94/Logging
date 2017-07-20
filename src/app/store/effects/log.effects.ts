import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LogService } from '../../services/log.service';

import { LogActions } from '../actions/log.actions';

import { Log } from '../models/log.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class LogEffects {

  @Effect()
  loadLog: Observable<Action> = this.actions
    .ofType(LogActions.REQUEST_LOG)
    .switchMap((action: Action) => this.logService.loadLogs())
    .map((log: Array<Log>) => this.logActions.loadlogSuccess(log));

  @Effect()
  addLog = this.actions
    .ofType(LogActions.ADD_LOG)
    .map((action: Action) => action.payload)
    .switchMap((log: Log) => this.logService.addLog(log))
    .map((log: Log) =>
      JSON.parse(log.error) ? this.logActions.addlogFailure() : this.logActions.addlogSuccess(log)
    );

  @Effect()
  editLog: Observable<Action> = this.actions
    .ofType(LogActions.EDIT_LOG)
    .switchMap((action: Action) => this.logService.editLog(action.payload))
    .map((log: Log) =>
      JSON.parse(log.error) ? this.logActions.editlogFailure() : this.logActions.editlogSuccess(log)
    );

  @Effect()
  deleteLog = this.actions
    .ofType(LogActions.DELETE_LOG)
    .map((action: Action) => action.payload)
    .switchMap((log: Log) => this.logService.deleteLog(log))
    .map((log: Log) =>
      JSON.parse(log.error) ? this.logActions.deletelogFailure() : this.logActions.deletelogSuccess(log)
    );

  constructor(private actions: Actions,
              private logService: LogService,
              private logActions: LogActions
  ) { }
}
