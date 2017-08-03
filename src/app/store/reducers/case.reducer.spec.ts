import { caseReducer } from './case.reducer';

import {
  REQUEST_CASES,
  LOAD_CASES_SUCCESS,
  ADD_CASE_SUCCESS,
  ADD_CASE_FAILURE,
  EDIT_CASE_SUCCESS,
  EDIT_CASE_FAILURE,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_FAILURE
} from '../actions/case.actions';

const state = {
  'data': [
    {
      '_id': '1',
      'name': 'test',
      'description': 'test',
    }
  ]
};

const payload = {
  '_id': '',
  'name': '',
  'description': ''
}

const payloadEdit = {
  '_id': '1',
  'name': '',
  'description': ''
}

describe('the case reducer', () => {
  it('should fall through', () => {
    const subject = caseReducer(state, { type: REQUEST_CASES })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeFalsy();
  });

  it('should handle LOAD_CASES_SUCCESS', () => {
    const subject = caseReducer(state, { type: LOAD_CASES_SUCCESS, payload: state.data })
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: ADD_CASE_SUCCESS, payload: payload })
    expect(subject.data.length).toEqual(2);
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: ADD_CASE_FAILURE, payload: payload })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeTruthy();
  });

  it('should handle EDIT_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: EDIT_CASE_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('');
    expect(subject.data[0].description).toEqual('');
    expect(subject.error).toBeFalsy();
  });

  it('should handle EDIT_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: EDIT_CASE_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].description).toEqual('test');
    expect(subject.error).toBeTruthy();
  });

  it('should handle DELETE_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: DELETE_CASE_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(0);
    expect(subject.error).toBeFalsy();
  });

  it('should handle DELETE_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: DELETE_CASE_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].description).toEqual('test');
    expect(subject.error).toBeTruthy();
  });
});
