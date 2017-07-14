import { settingsReducer, initialState } from './settings.reducer';
import { SettingsActions } from '../actions/settings.actions';

const state = {
  data: [
    {
      _id: '1',
      name: 'test',
      'case': '1',
      invpre: 'test',
      location: 'test',
    }
  ],
  type: 'LOAD_SETTINGS',
  error: false
}

const payload = {
  _id: '',
  name: '',
  'case': '',
  invpre: '',
  location: '',
}

const payloadEdit = {
  _id: '1',
  name: '',
  'case': '',
  invpre: '',
  location: '',
}

describe('The settings reducer', () => {
  it('initial state should roturn empty', () => {
    expect(
      initialState()
    )
    .toEqual([]);
  });

  it('should handle initial state', () => {
    expect(
      settingsReducer([], { type: '' })
    )
    .toEqual([]);
  });

  it('should fall through when the action type is invalid', () => {
    expect(
      settingsReducer([], { type: '' })
    )
    .toEqual([]);
  });

  it('should handle LOAD_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer([], { type: SettingsActions.LOAD_SETTINGS_SUCCESS, payload: state })
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer(state, { type: SettingsActions.ADD_SETTINGS_SUCCESS, payload: payload })
    expect(subject.data.length).toEqual(2);
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_SETTINGS_FAILURE', () => {
    const subject = settingsReducer(state, { type: SettingsActions.ADD_SETTINGS_FAILURE, payload: payload })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeTruthy();
  });

  it('should handle EDIT_SETTINGS_SUCCESS', () => {
    const subject = settingsReducer(state, { type: SettingsActions.EDIT_SETTINGS_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('');
    expect(subject.data[0].case).toEqual('');
    expect(subject.data[0].invpre).toEqual('');
    expect(subject.data[0].location).toEqual('');
    expect(subject.error).toBeFalsy();
  });

  it('should handle EDIT_SETTINGS_FAILURE', () => {
    const subject = settingsReducer(state, { type: SettingsActions.EDIT_SETTINGS_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].case).toEqual('1');
    expect(subject.data[0].invpre).toEqual('test');
    expect(subject.data[0].location).toEqual('test');
    expect(subject.error).toBeTruthy();
  });

});
