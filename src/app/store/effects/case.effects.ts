import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { CaseService } from '../../services/case.service';

import {
  REQUEST_CASES,
  ADD_CASE,
  EDIT_CASE,
  DELETE_CASE,
  LoadCases,
  LoadCasesSuccess,
  AddCase,
  AddCaseSuccess,
  AddCaseFailure,
  EditCase,
  EditCaseSuccess,
  EditCaseFailure,
  DeleteCase,
  DeleteCaseSuccess,
  DeleteCaseFailure
} from '../actions/case.actions';

import { Case } from '../models/case.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CaseEffects {

  @Effect()
  loadCases: Observable<Action> = this.actions
    .ofType(REQUEST_CASES)
    .switchMap((action: LoadCases) => this.caseService.loadCases())
    .map((cases: Array<Case>) => new LoadCasesSuccess(cases));

  @Effect()
  addCase = this.actions
    .ofType(ADD_CASE)
    .map((action: AddCase) => action.payload)
    .switchMap((singleCase: Case) => this.caseService.addCase(singleCase))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? new AddCaseFailure() : new AddCaseSuccess(singleCase)
    );

  @Effect()
  editCase: Observable<Action> = this.actions
    .ofType(EDIT_CASE)
    .switchMap((action: EditCase) => this.caseService.editCase(action.payload))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? new EditCaseFailure() : new EditCaseSuccess(singleCase)
    );

  @Effect()
  deleteCase = this.actions
    .ofType(DELETE_CASE)
    .map((action: DeleteCase) => action.payload)
    .switchMap((singleCase: Case) => this.caseService.deleteCase(singleCase))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? new DeleteCaseFailure() : new DeleteCaseSuccess(singleCase)
    );

  constructor(private actions: Actions,
              private caseService: CaseService
  ) { }
}
