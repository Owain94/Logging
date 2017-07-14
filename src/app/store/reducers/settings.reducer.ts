import { Action } from '@ngrx/store';

import { SettingsActions } from '../actions/settings.actions';

export function initialState(): any {
  /* istanbul ignore if */
  if (typeof(window) !== 'undefined' &&
      typeof(window['TRANSFER_STATE']) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state) !== 'undefined' &&
      typeof(window['TRANSFER_STATE'].state.settings) !== 'undefined') {
    return window['TRANSFER_STATE'].state.settings;
  } else {
    return [];
  }
}

export function settingsReducer(state: any = initialState(), action: Action) {

  switch (action.type) {

    case SettingsActions.LOAD_SETTINGS_SUCCESS: {
      return {
        ...state.data,
        data: action.payload,
        type: SettingsActions.LOAD_SETTINGS,
        error: false
      }
    }

    case SettingsActions.ADD_SETTINGS_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: SettingsActions.ADD_SETTINGS,
        error: false
      }
    }

    case SettingsActions.ADD_SETTINGS_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: SettingsActions.ADD_SETTINGS,
        error: true
      }
    }

    case SettingsActions.EDIT_SETTINGS_SUCCESS: {
      return {
        data: [
          action.payload
        ],
        type: SettingsActions.EDIT_SETTINGS,
        error: false
      }
    }

    case SettingsActions.EDIT_SETTINGS_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: SettingsActions.EDIT_SETTINGS,
        error: true
      }
    }

    default: {
      return state;
    }
  }
};
