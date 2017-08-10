import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  LoadLog,
  AddLog,
  EditLog,
  DeleteLog,
  LOAD_LOG_SUCCESS,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_FAILURE,
  DELETE_LOG_SUCCESS,
  DELETE_LOG_FAILURE
} from '../actions/log.actions';

import { Log } from '../models/log.model';

import { LogEffects } from './log.effects';

import { LogService } from '../../services/log.service';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

let error: boolean;

const MockLogService = {
  loadLogs: () => {
    return Observable.of(
      [{
        '_id': '1',
        'what': 'test',
        'why': '[ test ] test',
        'how': 'test',
        'with': 'test',
        'who': 'Owain van Brakel',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': null
      }]
    );
  },
  addLog: (log: Log) => {
    return Observable.of(
      {
        'error': error,
        '_id': log._id,
        'what': log.what,
        'why': log.why,
        'how': log.how,
        'with': log.with,
        'who': log.who,
        'where': log.where,
        'when': log.when,
        'case': log.case,
      }
    );
  },
  editLog: (log: Log) => {
    return Observable.of(
      {
        'error': error,
        '_id': log._id,
        'what': log.what,
        'why': log.why,
        'how': log.how,
        'with': log.with,
        'who': log.who,
        'where': log.where,
        'when': log.when,
        'case': log.case,
      }
    );
  },
  deleteLog: (log: Log) => {
    return Observable.of(
      { 'error': error, '_id': log._id }
    );
  },
}

const payload = {
  '_id': '1',
  'what': 'testing',
  'why': '[ testing ] testing',
  'how': 'testing',
  'with': 'testing',
  'who': 'testing',
  'where': 'testing',
  'when': 1,
  'case': '2'
}

describe('The log effects', () => {
  let logEffects: LogEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogEffects,
        { provide: LogService, useValue: MockLogService },
          provideMockActions(() => actions)
      ]
    });

    logEffects = TestBed.get(LogEffects);
  });

  it('should return a LOAD_LOG_SUCCESS action after REQUEST_LOG', () => {
    actions = new ReplaySubject(1);
    actions.next(new LoadLog());

    logEffects.loadLog.subscribe(result => {
      expect(result.type).toEqual(LOAD_LOG_SUCCESS);
    });
  });

  it('should return a ADD_LOG_SUCCESS action after a successful ADD_LOG', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new AddLog(payload));

    logEffects.addLog.subscribe(result => {
      expect(result.type).toEqual(ADD_LOG_SUCCESS);
    });
  });

  it('should return a ADD_LOG_FAILURE action after a failed ADD_LOG', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new AddLog(payload));

    logEffects.addLog.subscribe(result => {
      expect(result.type).toEqual(ADD_LOG_FAILURE);
    });
  });

  it('should return a EDIT_LOG_SUCCESS action after a successful EDIT_LOG', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new EditLog(payload));

    logEffects.editLog.subscribe(result => {
      expect(result.type).toEqual(EDIT_LOG_SUCCESS);
    });
  });

  it('should return a EDIT_LOG_FAILURE action after a failed EDIT_LOG', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new EditLog(payload));

    logEffects.editLog.subscribe(result => {
      expect(result.type).toEqual(EDIT_LOG_FAILURE);
    });
  });

  it('should return a DELETE_LOG_SUCCESS action after a successful DELETE_LOG', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new DeleteLog(payload));

    logEffects.deleteLog.subscribe(result => {
      expect(result.type).toEqual(DELETE_LOG_SUCCESS);
    });
  });

  it('should return a DELETE_LOG_FAILURE action after a failed DELETE_LOG', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new DeleteLog(payload));

    logEffects.deleteLog.subscribe(result => {
      expect(result.type).toEqual(DELETE_LOG_FAILURE);
    });
  });
});
