import { TestBed } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import { SettingsEffects } from './settings.effects';
import { inject } from '@angular/core/testing';

import { Settings } from '../models/settings.model';

import { SettingsActions } from '../actions/settings.actions';

import { SettingsService } from '../../services/settings.service';

import { Observable } from 'rxjs/Observable';

let error: boolean;

const MockSettingsService = {
  loadSettings: () => {
    return Observable.of(
      [{
        '_id': '1',
        'name': 'test',
        'case': '1',
        'invpre': 'test',
        'location': 'test'
      }]
    );
  },
  addSettings: (settings: Settings) => {
    return Observable.of(
      {
        'error': error,
        '_id': settings._id,
        'name': settings.name,
        'case': settings.case,
        'invpre': settings.invpre,
        'location': settings.location
      }
    );
  },
  editSettings: (settings: Settings) => {
    return Observable.of(
      {
        'error': error,
        '_id': settings._id,
        'name': settings.name,
        'case': settings.case,
        'invpre': settings.invpre,
        'location': settings.location
      }
    );
  }
}

const payload = {
  _id: '1',
  name: '',
  description: ''
}

describe('The settings effects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      SettingsActions,
      SettingsEffects,
      { provide: SettingsService, useValue: MockSettingsService}
    ]
  }));

  let runner: EffectsRunner;
  let settingsEffects: SettingsEffects;
  let settingsActions: SettingsActions;

  beforeEach(inject([
      EffectsRunner,
      SettingsEffects,
      SettingsActions
    ], (_runner: EffectsRunner, _settingsEffects: SettingsEffects, _settingsActions: SettingsActions) => {
      runner = _runner;
      settingsEffects = _settingsEffects;
      settingsActions = _settingsActions;
    }
  ));

  it('should return a REQUEST_SETTINGS action', () => {
    expect(settingsActions.loadSettings().type).toEqual(SettingsActions.REQUEST_SETTINGS);
  });

  it('should return a LOAD_SETTINGS action after REQUEST_SETTINGS', () => {
    runner.queue({ type: SettingsActions.REQUEST_SETTINGS });

    settingsEffects.loadSettings.subscribe(result => {
      expect(result.type).toEqual(SettingsActions.LOAD_SETTINGS_SUCCESS);
    });
  });

  it('should return a ADD_SETTINGS_SUCCESS action after a successful ADD_SETTINGS', () => {
    error = false;

    runner.queue({ type: SettingsActions.ADD_SETTINGS, payload: payload });

    settingsEffects.addSettings.subscribe(result => {
      expect(result.type).toEqual(SettingsActions.ADD_SETTINGS_SUCCESS);
    });
  });

  it('should return a ADD_SETTINGS_FAILURE action after a failed ADD_SETTINGS', () => {
    error = true;

    runner.queue({ type: SettingsActions.ADD_SETTINGS, payload: payload });

    settingsEffects.addSettings.subscribe(result => {
      expect(result.type).toEqual(SettingsActions.ADD_SETTINGS_FAILURE);
    });
  });

  it('should return a EDIT_SETTINGS_SUCCESS action after a successful EDIT_SETTINGS', () => {
    error = false;

    runner.queue({ type: SettingsActions.EDIT_SETTINGS, payload: payload });

    settingsEffects.editSettings.subscribe(result => {
      expect(result.type).toEqual(SettingsActions.EDIT_SETTINGS_SUCCESS);
    });
  });

  it('should return a EDIT_SETTINGS_FAILURE action after a failed EDIT_SETTINGS', () => {
    error = true;

    runner.queue({ type: SettingsActions.EDIT_SETTINGS, payload: payload });

    settingsEffects.editSettings.subscribe(result => {
      expect(result.type).toEqual(SettingsActions.EDIT_SETTINGS_FAILURE);
    });
  });

});
