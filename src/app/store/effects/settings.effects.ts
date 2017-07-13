import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { SettingsService } from '../../services/settings.service';

import { SettingsActions } from '../actions/settings.actions';

import { Settings } from '../models/settings.model';

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SettingsEffects {

  @Effect()
  loadSettings: Observable<Action> = this.actions
    .ofType(SettingsActions.REQUEST_SETTINGS)
    .switchMap((action: Action) => this.settingsService.loadSettings())
    .map((settings: Settings) => this.settingsActions.loadSettingsSuccess(settings));

  @Effect()
  addSettings = this.actions
    .ofType(SettingsActions.ADD_SETTINGS)
    .map((action: Action) => action.payload)
    .switchMap((settings: Settings) => this.settingsService.addSettings(settings))
    .map((settings: Settings) =>
      JSON.parse(settings.error) ? this.settingsActions.addSettingsFailure() : this.settingsActions.addSettingsSuccess(settings)
    );

  @Effect()
  editSettings: Observable<Action> = this.actions
    .ofType(SettingsActions.EDIT_SETTINGS)
    .switchMap((action: Action) => this.settingsService.editSettings(action.payload))
    .map((settings: Settings) =>
      JSON.parse(settings.error) ? this.settingsActions.editSettingsFailure() : this.settingsActions.editSettingsSuccess(settings)
    );

  constructor(private actions: Actions,
              private settingsService: SettingsService,
              private settingsActions: SettingsActions
  ) { }
}
