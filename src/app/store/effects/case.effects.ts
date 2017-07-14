import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { CaseService } from '../../services/case.service';

import { CaseActions } from '../actions/case.actions';

import { Case } from '../models/case.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CaseEffects {

  @Effect()
  loadCases: Observable<Action> = this.actions
    .ofType(CaseActions.REQUEST_CASES)
    .switchMap((action: Action) => this.caseService.loadCases())
    .map((cases: Array<Case>) => this.caseActions.loadCasesSuccess(cases));

  @Effect()
  addCase = this.actions
    .ofType(CaseActions.ADD_CASE)
    .map((action: Action) => action.payload)
    .switchMap((singleCase: Case) => this.caseService.addCase(singleCase))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? this.caseActions.addCaseFailure() : this.caseActions.addCaseSuccess(singleCase)
    );

  @Effect()
  editCase: Observable<Action> = this.actions
    .ofType(CaseActions.EDIT_CASE)
    .switchMap((action: Action) => this.caseService.editCase(action.payload))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? this.caseActions.editCaseFailure() : this.caseActions.editCaseSuccess(singleCase)
    );

  @Effect()
  deleteCase = this.actions
    .ofType(CaseActions.DELETE_CASE)
    .map((action: Action) => action.payload)
    .switchMap((singleCase: Case) => this.caseService.deleteCase(singleCase))
    .map((singleCase: Case) =>
      JSON.parse(singleCase.error) ? this.caseActions.deleteCaseFailure() : this.caseActions.deleteCaseSuccess(singleCase)
    );

  constructor(private actions: Actions,
              private caseService: CaseService,
              private caseActions: CaseActions
  ) { }
}
