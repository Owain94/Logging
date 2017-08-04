import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  LoadCases,
  AddCase,
  EditCase,
  DeleteCase,
  LOAD_CASES_SUCCESS,
  ADD_CASE_SUCCESS,
  ADD_CASE_FAILURE,
  EDIT_CASE_SUCCESS,
  EDIT_CASE_FAILURE,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_FAILURE
} from '../actions/case.actions';

import { CaseEffects } from './case.effects';

import { Case } from '../models/case.model';

import { CaseService } from '../../services/case.service';

import { ReplaySubject } from 'rxjs/ReplaySubject';
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
  '_id': '1',
  'name': '',
  'description': ''
}

describe('The case effects', () => {
  let caseEffects: CaseEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CaseEffects,
        { provide: CaseService, useValue: MockCaseService },
          provideMockActions(() => actions)
      ]
    });

    caseEffects = TestBed.get(CaseEffects);
  });

  it('should return a LOAD_CASES_SUCCESS action after REQUEST_CASES', () => {
    actions = new ReplaySubject(1);
    actions.next(new LoadCases());

    caseEffects.loadCases.subscribe(result => {
      expect(result.type).toEqual(LOAD_CASES_SUCCESS);
    });
  });

  it('should return a ADD_CASE_SUCCESS action after a successful ADD_CASE', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new AddCase(payload));

    caseEffects.addCase.subscribe(result => {
      expect(result.type).toEqual(ADD_CASE_SUCCESS);
    });
  });

  it('should return a ADD_CASE_FAILURE action after a failed ADD_CASE', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new AddCase(payload));

    caseEffects.addCase.subscribe(result => {
      expect(result.type).toEqual(ADD_CASE_FAILURE);
    });
  });

  it('should return a EDIT_CASE_SUCCESS action after a successful EDIT_CASE', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new EditCase(payload));

    caseEffects.editCase.subscribe(result => {
      expect(result.type).toEqual(EDIT_CASE_SUCCESS);
    });
  });

  it('should return a EDIT_CASE_FAILURE action after a failed EDIT_CASE', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new EditCase(payload));

    caseEffects.editCase.subscribe(result => {
      expect(result.type).toEqual(EDIT_CASE_FAILURE);
    });
  });

  it('should return a DELETE_CASE_SUCCESS action after a successful DELETE_CASE', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new DeleteCase(payload));

    caseEffects.deleteCase.subscribe(result => {
      expect(result.type).toEqual(DELETE_CASE_SUCCESS);
    });
  });

  it('should return a DELETE_CASE_FAILURE action after a failed DELETE_CASE', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new DeleteCase(payload));

    caseEffects.deleteCase.subscribe(result => {
      expect(result.type).toEqual(DELETE_CASE_FAILURE);
    });
  });
});
