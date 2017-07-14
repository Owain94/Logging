import { TestBed } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import { CaseEffects } from './case.effects';
import { inject } from '@angular/core/testing';

import { Case } from '../models/case.model';

import { CaseActions } from '../actions/case.actions';

import { CaseService } from '../../services/case.service';

import { Observable } from 'rxjs/Observable';

let error: boolean;

const MockCaseService = {
  loadCases: () => {
    return Observable.of(
      [{ '_id': '1', 'name': 'test', 'description': 'test' }]
    );
  },
  addCase: (singleCase: Case) => {
    return Observable.of(
      { 'error': error, '_id': singleCase._id, 'name': singleCase.name, 'description': singleCase.description }
    );
  },
  editCase: (singleCase: Case) => {
    return Observable.of(
      { 'error': error, '_id': singleCase._id, 'name': singleCase.name, 'description': singleCase.description }
    );
  },
  deleteCase: (singleCase: Case) => {
    return Observable.of(
      { 'error': error, '_id': singleCase._id }
    );
  },
}

const payload = {
  _id: '1',
  name: '',
  description: ''
}

describe('The case effects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CaseActions,
      CaseEffects,
      { provide: CaseService, useValue: MockCaseService}
    ]
  }));

  let runner: EffectsRunner;
  let caseEffects: CaseEffects;
  let caseActions: CaseActions;

  beforeEach(inject([
      EffectsRunner,
      CaseEffects,
      CaseActions
    ], (_runner: EffectsRunner, _caseEffects: CaseEffects, _caseActions: CaseActions) => {
      runner = _runner;
      caseEffects = _caseEffects;
      caseActions = _caseActions;
    }
  ));

  it('should return a REQUEST_CASES action', () => {
    expect(caseActions.loadCases().type).toEqual(CaseActions.REQUEST_CASES);
  });

  it('should return a LOAD_CASES_SUCCESS action after REQUEST_CASES', () => {
    runner.queue({ type: CaseActions.REQUEST_CASES });

    caseEffects.loadCases.subscribe(result => {
      expect(result.type).toEqual(CaseActions.LOAD_CASES_SUCCESS);
    });
  });

  it('should return a ADD_CASE_SUCCESS action after a successful ADD_CASE', () => {
    error = false;

    runner.queue({ type: CaseActions.ADD_CASE, payload: payload });

    caseEffects.addCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.ADD_CASE_SUCCESS);
    });
  });

  it('should return a ADD_CASE_FAILURE action after a failed ADD_CASE', () => {
    error = true;

    runner.queue({ type: CaseActions.ADD_CASE, payload: payload });

    caseEffects.addCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.ADD_CASE_FAILURE);
    });
  });

  it('should return a EDIT_CASE_SUCCESS action after a successful EDIT_CASE', () => {
    error = false;

    runner.queue({ type: CaseActions.EDIT_CASE, payload: payload });

    caseEffects.editCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.EDIT_CASE_SUCCESS);
    });
  });

  it('should return a EDIT_CASE_FAILURE action after a failed EDIT_CASE', () => {
    error = true;

    runner.queue({ type: CaseActions.EDIT_CASE, payload: payload });

    caseEffects.editCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.EDIT_CASE_FAILURE);
    });
  });

  it('should return a DELETE_CASE_SUCCESS action after a successful DELETE_CASE', () => {
    error = false;

    runner.queue({ type: CaseActions.DELETE_CASE, payload: payload });

    caseEffects.deleteCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.DELETE_CASE_SUCCESS);
    });
  });

  it('should return a DELETE_CASE_FAILURE action after a failed DELETE_CASE', () => {
    error = true;

    runner.queue({ type: CaseActions.DELETE_CASE, payload: payload });

    caseEffects.deleteCase.subscribe(result => {
      expect(result.type).toEqual(CaseActions.DELETE_CASE_FAILURE);
    });
  });

});
