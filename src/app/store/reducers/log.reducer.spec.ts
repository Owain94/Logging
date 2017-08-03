import { logReducer } from './log.reducer';

import {
  REQUEST_LOG,
  LOAD_LOG_SUCCESS,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_FAILURE,
  DELETE_LOG_SUCCESS,
  DELETE_LOG_FAILURE
} from '../actions/log.actions';

const state = {
  'data': [
    {
      '_id': '1',
      'what': 'test',
      'why': '[ test ] test',
      'how': 'test',
      'with': 'test',
      'who': 'test',
      'where': 'test',
      'when': '19/07/2017, 04:44:45',
      'case': '1',
      'result': ''
    }
  ]
}

const payload = {
  '_id': '',
  'what': '',
  'why': '',
  'how': '',
  'with': '',
  'who': '',
  'where': '',
  'when': '',
  'case': '',
  'result': ''
}

const payloadEdit = {
  '_id': '1',
  'what': 'testing',
  'why': '[ testing ] testing',
  'how': 'testing',
  'with': 'testing',
  'who': 'testing',
  'where': 'testing',
  'when': '19/07/2017, 04:44:45',
  'case': '2',
  'result': 'testing'
}

describe('The log reducer', () => {
  it('should fall through', () => {
    const subject = logReducer(state, { type: REQUEST_LOG })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeFalsy();
  });

  it('should handle LOAD_LOG_SUCCESS', () => {
    const subject = logReducer(state, { type: LOAD_LOG_SUCCESS, payload: state.data })
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_LOG_SUCCESS', () => {
    const subject = logReducer(state, { type: ADD_LOG_SUCCESS, payload: payload })
    expect(subject.data.length).toEqual(2);
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_LOG_FAILURE', () => {
    const subject = logReducer(state, { type: ADD_LOG_FAILURE, payload: payload })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeTruthy();
  });

  it('should handle EDIT_LOG_SUCCESS', () => {
    const subject = logReducer(state, { type: EDIT_LOG_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].what).toEqual('testing');
    expect(subject.data[0].why).toEqual('[ testing ] testing');
    expect(subject.data[0].how).toEqual('testing');
    expect(subject.data[0].with).toEqual('testing');
    expect(subject.data[0].who).toEqual('testing');
    expect(subject.data[0].where).toEqual('testing');
    expect(subject.data[0].when).toEqual('19/07/2017, 04:44:45');
    expect(subject.data[0].case).toEqual('2');
    expect(subject.data[0].result).toEqual('testing');
    expect(subject.error).toBeFalsy();
  });

  it('should handle EDIT_LOG_FAILURE', () => {
    const subject = logReducer(state, { type: EDIT_LOG_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].what).toEqual('test');
    expect(subject.data[0].why).toEqual('[ test ] test');
    expect(subject.data[0].how).toEqual('test');
    expect(subject.data[0].with).toEqual('test');
    expect(subject.data[0].who).toEqual('test');
    expect(subject.data[0].where).toEqual('test');
    expect(subject.data[0].when).toEqual('19/07/2017, 04:44:45');
    expect(subject.data[0].case).toEqual('1');
    expect(subject.data[0].result).toEqual('');
    expect(subject.error).toBeTruthy();
  });

  it('should handle DELETE_LOG_SUCCESS', () => {
    const subject = logReducer(state, { type: DELETE_LOG_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(0);
    expect(subject.error).toBeFalsy();
  });

  it('should handle DELETE_LOG_FAILURE', () => {
    const subject = logReducer(state, { type: DELETE_LOG_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].what).toEqual('test');
    expect(subject.data[0].why).toEqual('[ test ] test');
    expect(subject.data[0].how).toEqual('test');
    expect(subject.data[0].with).toEqual('test');
    expect(subject.data[0].who).toEqual('test');
    expect(subject.data[0].where).toEqual('test');
    expect(subject.data[0].when).toEqual('19/07/2017, 04:44:45');
    expect(subject.data[0].case).toEqual('1');
    expect(subject.data[0].result).toEqual('');
    expect(subject.error).toBeTruthy();
  });
});
