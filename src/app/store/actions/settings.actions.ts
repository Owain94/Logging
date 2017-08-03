import { Action } from '@ngrx/store'

import { Settings } from '../models/settings.model';

export const REQUEST_SETTINGS = 'REQUEST_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export const ADD_SETTINGS = 'ADD_SETTINGS';
export const ADD_SETTINGS_SUCCESS = 'ADD_SETTINGS_SUCCESS';
export const ADD_SETTINGS_FAILURE = 'ADD_SETTINGS_FAILURE';
export const EDIT_SETTINGS = 'EDIT_SETTINGS';
export const EDIT_SETTINGS_SUCCESS = 'EDIT_SETTINGS_SUCCESS';
export const EDIT_SETTINGS_FAILURE = 'EDIT_SETTINGS_FAILURE';

export class LoadSettings implements Action {
  readonly type = REQUEST_SETTINGS;
}

export class LoadSettingsSuccess implements Action {
  readonly type = LOAD_SETTINGS_SUCCESS;

  constructor(public payload: Array<Settings>) {}
}

export class AddSettings implements Action {
  readonly type = ADD_SETTINGS;

  constructor(public payload: Settings) {}
}

export class AddSettingsSuccess implements Action {
  readonly type = ADD_SETTINGS_SUCCESS;

  constructor(public payload: Settings) {}
}

export class AddSettingsFailure implements Action {
  readonly type = ADD_SETTINGS_FAILURE;
}

export class EditSettings implements Action {
  readonly type = EDIT_SETTINGS;

  constructor(public payload: Settings) {}
}

export class EditSettingsSuccess implements Action {
  readonly type = EDIT_SETTINGS_SUCCESS;

  constructor(public payload: Settings) {}
}

export class EditSettingsFailure implements Action {
  readonly type = EDIT_SETTINGS_FAILURE;
}

export type Actions =
  | LoadSettings
  | LoadSettingsSuccess
  | AddSettings
  | AddSettingsSuccess
  | AddSettingsFailure
  | EditSettings
  | EditSettingsSuccess
  | EditSettingsFailure;
