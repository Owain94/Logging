import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import {
  LOAD_SETTINGS,
  ADD_SETTINGS,
  EDIT_SETTINGS,
  LoadSettings,
  AddSettings,
  EditSettings
} from '../../store/actions/settings.actions';

import { getCaseState, CaseState } from '../../store/reducers/case.reducer';
import { getSettingsState, SettingsState } from '../../store/reducers/settings.reducer';

import { Case } from '../../store/models/case.model';
import { Settings } from '../../store/models/settings.model';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { BrokerService } from '../../services/broker.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-home',
  templateUrl: './settings.component.pug',
  styleUrls: ['./settings.component.styl']
})
@Log()
@AutoUnsubscribe()
export class SettingsComponent implements OnInit, AfterContentInit {

  @logObservable public settings: Observable<any> = null;
  @logObservable public cases: Observable<any> = null;

  public settingsForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  private initialSettings: boolean = false;
  private settingsId: string;
  private formSubmitAttempt: boolean;

  private settingsSubscription: Subscription;

  constructor(private store: Store<SettingsState | CaseState>,
              private formBuilder: FormBuilder,
              private brokerService: BrokerService
  ) {
    this.settings = store.select<SettingsState>(getSettingsState);
    this.cases = store.select<CaseState>(getCaseState);
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterContentInit(): void {
    this.loadSettingsAndHandleStates();
  }

  private initForm(caseId: string = '', name: string = '', invpre: string = '', location: string = ''): void {
    if (caseId !== '' && name !== '' && invpre !== '' && location !== '') {
      this.settingsForm = this.formBuilder.group({
        'name': [name, Validators.required],
        'case': [caseId, Validators.required],
        'invpre': [invpre, Validators.required],
        'location': [location, Validators.required]
      });
    } else {
      this.settingsForm = this.formBuilder.group({
        'name': [null, Validators.required],
        'case': [null, Validators.required],
        'invpre': [null, Validators.required],
        'location': [null, Validators.required]
      });
    }
  }

  private loadSettingsAndHandleStates() {
    this.settingsSubscription = this.settings.subscribe((res) => {
      if (typeof(res.data) !== 'undefined') {
        if (res.data.length > 0) {
          this.initialSettings = true;
        } else {
          this.initialSettings = false;
        }

        switch (res.type) {

          case ADD_SETTINGS:
          case EDIT_SETTINGS: {
            if (res.error) {
              this.notification(false, 'Couldn\'t edit settings, try again later.');
            } else {
              this.notification(false, 'Settings successfully edited.');
            }

            this.store.dispatch(new LoadSettings());

            break;
          }

          case LOAD_SETTINGS: {
            if (res.error) {
              this.notification(false, 'Couldn\'t load settings, try again later.');
            } else if (res.data.length > 0) {
              this.settingsId = res.data[0]._id;
              this.initForm(
                res.data[0].case,
                res.data[0].name,
                res.data[0].invpre,
                res.data[0].location
              );
            }

            break;
          }

        }
      }
    });
  }

  private notification(error: boolean, description: string): void {
    this.brokerService.notificationText(
      error ? 'Error' : 'Success',
      description
    );
  }

  public isFieldValid(field: string): boolean {
    return !this.settingsForm.get(field).valid && this.formSubmitAttempt;
  }

  public submitForm(settings: Settings): void {
    this.formSubmitAttempt = true;
    if (this.settingsForm.valid) {
      if (this.initialSettings) {
        settings._id = this.settingsId;
        this.store.dispatch(new EditSettings(settings));
      } else {
        this.store.dispatch(new AddSettings(settings));
      }
      this.formSubmitAttempt = false;
    }
  }

  public trackByFn(index: number, item: Case): string {
    return(item._id);
  }
}
