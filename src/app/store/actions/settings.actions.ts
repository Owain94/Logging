import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store'

import { Settings } from './../models/settings.model';

@Injectable()
export class SettingsActions {
  static REQUEST_SETTINGS = 'REQUEST_SETTINGS';
  static LOAD_SETTINGS = 'LOAD_SETTINGS';
  static LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
  static ADD_SETTINGS = 'ADD_SETTINGS';
  static ADD_SETTINGS_SUCCESS = 'ADD_SETTINGS_SUCCESS';
  static ADD_SETTINGS_FAILURE = 'ADD_SETTINGS_FAILURE';
  static EDIT_SETTINGS = 'EDIT_SETTINGS';
  static EDIT_SETTINGS_SUCCESS = 'EDIT_SETTINGS_SUCCESS';
  static EDIT_SETTINGS_FAILURE = 'EDIT_SETTINGS_FAILURE';

  loadSettings(): Action {
    return {
      type: SettingsActions.REQUEST_SETTINGS
    };
  }

  loadSettingsSuccess(settings: Settings): Action {
    return {
      type: SettingsActions.LOAD_SETTINGS_SUCCESS,
      payload: settings
    };
  }

  addSettingsSuccess(settings: Settings): Action {
    return {
      type: SettingsActions.ADD_SETTINGS_SUCCESS,
      payload: settings
    };
  }

  addSettingsFailure(): Action {
    return {
      type: SettingsActions.ADD_SETTINGS_FAILURE
    };
  }

  editSettingsSuccess(settings: Settings): Action {
    return {
      type: SettingsActions.EDIT_SETTINGS_SUCCESS,
      payload: settings
    };
  }

  editSettingsFailure(): Action {
    return {
      type: SettingsActions.EDIT_SETTINGS_FAILURE
    };
  }
}
