import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LogService } from '../../services/log.service';

import {
  REQUEST_LOG,
  ADD_LOG,
  EDIT_LOG,
  DELETE_LOG,
  LoadLog,
  LoadLogSuccess,
  AddLog,
  AddLogSuccess,
  AddLogFailure,
  EditLog,
  EditLogSuccess,
  EditLogFailure,
  DeleteLog,
  DeleteLogSuccess,
  DeleteLogFailure
} from './../actions/log.actions';

import { Log } from '../models/log.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class LogEffects {

  @Effect()
  loadLog: Observable<Action> = this.actions
    .ofType(REQUEST_LOG)
    .switchMap((action: LoadLog) => this.logService.loadLogs())
    .map((log: Array<Log>) => new LoadLogSuccess(log));

  @Effect()
  addLog = this.actions
    .ofType(ADD_LOG)
    .map((action: AddLog) => action.payload)
    .switchMap((log: Log) => this.logService.addLog(log))
    .map((log: Log) =>
      JSON.parse(log.error) ? new AddLogFailure() : new AddLogSuccess(log)
    );

  @Effect()
  editLog: Observable<Action> = this.actions
    .ofType(EDIT_LOG)
    .switchMap((action: EditLog) => this.logService.editLog(action.payload))
    .map((log: Log) =>
      JSON.parse(log.error) ? new EditLogFailure() : new EditLogSuccess(log)
    );

  @Effect()
  deleteLog = this.actions
    .ofType(DELETE_LOG)
    .map((action: DeleteLog) => action.payload)
    .switchMap((log: Log) => this.logService.deleteLog(log))
    .map((log: Log) =>
      JSON.parse(log.error) ? new DeleteLogFailure() : new DeleteLogSuccess(log)
    );

  constructor(private actions: Actions,
              private logService: LogService
  ) { }
}
