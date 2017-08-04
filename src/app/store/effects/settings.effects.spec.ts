import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  LoadSettings,
  AddSettings,
  EditSettings,
  LOAD_SETTINGS_SUCCESS,
  ADD_SETTINGS_SUCCESS,
  ADD_SETTINGS_FAILURE,
  EDIT_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAILURE,
} from '../actions/settings.actions';

import { SettingsEffects } from './settings.effects';

import { Settings } from '../models/settings.model';

import { SettingsService } from '../../services/settings.service';

import { ReplaySubject } from 'rxjs/ReplaySubject';
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
  '_id': '1',
  'name': 'testing',
  'case': '2',
  'invpre': 'testing',
  'location': 'testing'
}

describe('The settings effects', () => {
  let settingsEffects: SettingsEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        { provide: SettingsService, useValue: MockSettingsService},
        provideMockActions(() => actions)
      ]
    });

    settingsEffects = TestBed.get(SettingsEffects);
  });

  it('should return a LOAD_SETTINGS action after REQUEST_SETTINGS', () => {
    actions = new ReplaySubject(1);
    actions.next(new LoadSettings());

    settingsEffects.loadSettings.subscribe(result => {
      expect(result.type).toEqual(LOAD_SETTINGS_SUCCESS);
    });
  });

  it('should return a ADD_SETTINGS_SUCCESS action after a successful ADD_SETTINGS', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new AddSettings(payload));

    settingsEffects.addSettings.subscribe(result => {
      expect(result.type).toEqual(ADD_SETTINGS_SUCCESS);
    });
  });

  it('should return a ADD_SETTINGS_FAILURE action after a failed ADD_SETTINGS', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new AddSettings(payload));

    settingsEffects.addSettings.subscribe(result => {
      expect(result.type).toEqual(ADD_SETTINGS_FAILURE);
    });
  });

  it('should return a EDIT_SETTINGS_SUCCESS action after a successful EDIT_SETTINGS', () => {
    error = false;

    actions = new ReplaySubject(1);
    actions.next(new EditSettings(payload));

    settingsEffects.editSettings.subscribe(result => {
      expect(result.type).toEqual(EDIT_SETTINGS_SUCCESS);
    });
  });

  it('should return a EDIT_SETTINGS_FAILURE action after a failed EDIT_SETTINGS', () => {
    error = true;

    actions = new ReplaySubject(1);
    actions.next(new EditSettings(payload));

    settingsEffects.editSettings.subscribe(result => {
      expect(result.type).toEqual(EDIT_SETTINGS_FAILURE);
    });
  });
});
