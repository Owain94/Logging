import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { SettingsService } from '../../services/settings.service';

import {
  REQUEST_SETTINGS,
  ADD_SETTINGS,
  EDIT_SETTINGS,
  LoadSettings,
  LoadSettingsSuccess,
  AddSettings,
  AddSettingsSuccess,
  AddSettingsFailure,
  EditSettings,
  EditSettingsSuccess,
  EditSettingsFailure
} from '../actions/settings.actions';

import { Settings } from '../models/settings.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

@Injectable()
export class SettingsEffects {

  @Effect()
  loadSettings: Observable<Action> = this.actions
    .ofType(REQUEST_SETTINGS)
    .startWith(new LoadSettings())
    .switchMap((action: LoadSettings) => this.settingsService.loadSettings())
    .map((settings: Array<Settings>) => new LoadSettingsSuccess(settings));

  @Effect()
  addSettings = this.actions
    .ofType(ADD_SETTINGS)
    .map((action: AddSettings) => action.payload)
    .switchMap((settings: Settings) => this.settingsService.addSettings(settings))
    .map((settings: Settings) =>
      JSON.parse(settings.error) ? new AddSettingsFailure() : new AddSettingsSuccess(settings)
    );

  @Effect()
  editSettings: Observable<Action> = this.actions
    .ofType(EDIT_SETTINGS)
    .switchMap((action: EditSettings) => this.settingsService.editSettings(action.payload))
    .map((settings: Settings) =>
      JSON.parse(settings.error) ? new EditSettingsFailure() : new EditSettingsSuccess(settings)
    );

  constructor(private actions: Actions,
              private settingsService: SettingsService
  ) { }
}
