import { settingsReducer } from './settings.reducer';

import {
  REQUEST_SETTINGS,
  LOAD_SETTINGS_SUCCESS,
  ADD_SETTINGS_SUCCESS,
  ADD_SETTINGS_FAILURE,
  EDIT_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAILURE
} from '../actions/settings.actions';

const state = {
  'data': [
    {
      '_id': '1',
      'name': 'test',
      'case': '1',
      'invpre': 'test',
      'location': 'test',
    }
  ]
}

const payload = {
  '_id': '',
  'name': '',
  'case': '',
  'invpre': '',
  'location': ''
}

const payloadEdit = {
  '_id': '1',
  'name': '',
  'case': '',
  'invpre': '',
  'location': ''
}

describe('The settings reducer', () => {
  it('should fall through', () => {
    const subject = settingsReducer(state, { type: REQUEST_SETTINGS })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeFalsy();
  });

  it('should handle LOAD_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer(state, { type: LOAD_SETTINGS_SUCCESS, payload: state.data })
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer(state, { type: ADD_SETTINGS_SUCCESS, payload: payload })
    expect(subject.data.length).toEqual(2);
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_SETTINGS_FAILURE', () => {
    const subject = settingsReducer(state, { type: ADD_SETTINGS_FAILURE, payload: payload })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeTruthy();
  });

  it('should handle EDIT_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer(state, { type: EDIT_SETTINGS_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('');
    expect(subject.data[0].case).toEqual('');
    expect(subject.data[0].invpre).toEqual('');
    expect(subject.data[0].location).toEqual('');
    expect(subject.error).toBeFalsy();
  });

  it('should handle EDIT_SETTINGS_FAILURE', () => {
    const subject = settingsReducer(state, { type: EDIT_SETTINGS_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].case).toEqual('1');
    expect(subject.data[0].invpre).toEqual('test');
    expect(subject.data[0].location).toEqual('test');
    expect(subject.error).toBeTruthy();
  });

  it('should fall through', () => {
    const subject = settingsReducer(state, { type: REQUEST_SETTINGS })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeFalsy();
  });
});
