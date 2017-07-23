import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  Actions,
  LOAD_SETTINGS,
  LOAD_SETTINGS_SUCCESS,
  ADD_SETTINGS,
  ADD_SETTINGS_SUCCESS,
  ADD_SETTINGS_FAILURE,
  EDIT_SETTINGS,
  EDIT_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAILURE
} from '../actions/settings.actions';

import { Settings } from '../models/settings.model';

export interface SettingsState {
  data: Array<Settings>,
  type?: Actions,
  error?: boolean
}

const initialState: SettingsState = {
  data: [],
};

export function settingsReducer(state: SettingsState = initialState, action: Actions) {

  switch (action.type) {

    case LOAD_SETTINGS_SUCCESS: {
      return {
        data: action.payload,
        type: LOAD_SETTINGS,
        error: false
      }
    }

    case ADD_SETTINGS_SUCCESS: {
      return {
        data: [
          ...state.data,
          action.payload
        ],
        type: ADD_SETTINGS,
        error: false
      }
    }

    case ADD_SETTINGS_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: ADD_SETTINGS,
        error: true
      }
    }

    case EDIT_SETTINGS_SUCCESS: {
      return {
        data: [
          action.payload
        ],
        type: EDIT_SETTINGS,
        error: false
      }
    }

    case EDIT_SETTINGS_FAILURE: {
      return {
        data: [
          ...state.data
        ],
        type: EDIT_SETTINGS,
        error: true
      }
    }

    default: {
      return state;
    }
  }
};

export const getSettingsState = createFeatureSelector<SettingsState>('settings');

export const getSettings = createSelector(
  getSettingsState,
  (settings) => {
    return settings.data[0];
  }
);
