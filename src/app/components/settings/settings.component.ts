import { Case } from './../../store/models/case.model';
import { isPlatformBrowser } from '@angular/common';
import {
  Component, ChangeDetectionStrategy, AfterContentInit, AfterViewChecked, PLATFORM_ID, Inject, OnInit, ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { TransferState } from '../../modules/transfer-state/transfer-state';

import { CaseActions } from '../../store/actions/case.actions';
import { SettingsActions } from '../../store/actions/settings.actions';

import { Settings } from '../../store/models/settings.model';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { NotificationsService } from '../../services/notifications.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-home',
  templateUrl: './settings.component.pug',
  styleUrls: ['./settings.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class SettingsComponent implements OnInit, AfterContentInit, AfterViewChecked {

  @logObservable public settings: Observable<any> = null;
  @logObservable public cases: Observable<any> = null;

  private allCases: Array<Case>;
  public settingsForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  private initialSettings: boolean = false;
  private settingsId: string;

  private settingsSubscription: Subscription;
  private caseSubscription: Subscription;
  private storeSubscription: Subscription;

  constructor(private transferState: TransferState,
              private store: Store<any>,
              private caseActions: CaseActions,
              private settingsActions: SettingsActions,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.settings = store.select('settings');
    this.cases = store.select('cases');
  }

  ngOnInit(): void {
    this.loadCasesAndHandleStates();
    this.initForm();
  }

  ngAfterContentInit(): void {
    this.loadSettingsAndHandleStates();
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.storeSubscription = this.store.take(1).subscribe(state => {
        this.transferState.set('state', state);
      });
    }
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

    this.changeDetectorRef.markForCheck();
  }

  private loadCasesAndHandleStates() {
    this.caseSubscription = this.cases.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(this.caseActions.loadCases());
      } else {
        switch (res.type) {

          case CaseActions.LOAD_CASES: {
            if (res.error) {
              this.notification(false, 'Couldn\'t load cases, try again later.');
            } else {
              this.allCases = res.data;
            }

            break;
          }

        }
      }
    });
  }

  private loadSettingsAndHandleStates() {
    this.store.dispatch(this.settingsActions.loadSettings());
    this.settingsSubscription = this.settings.subscribe((res) => {
      if (typeof(res.data) !== 'undefined') {
        if (res.data.length > 0) {
          this.initialSettings = true;
        } else {
          this.initialSettings = false;
        }

        switch (res.type) {

          case SettingsActions.ADD_SETTINGS:
          case SettingsActions.EDIT_SETTINGS: {
            if (res.error) {
              this.notification(false, 'Couldn\'t edit settings, try again later.');
            } else {
              this.notification(false, 'Settings successfully edited.');
            }

            break;
          }

          case SettingsActions.LOAD_SETTINGS: {
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

  private notification(error: boolean, description: string) {
    if (error) {
      this.notificationsService.error(
        'Error',
        description
      );
    } else {
      this.notificationsService.success(
        'Success',
        description
      );
    }

    this.changeDetectorRef.markForCheck();
  }

  public submitForm(settings: Settings): void {

    if (this.initialSettings) {
      settings._id = this.settingsId;
      this.store.dispatch({ type: SettingsActions.EDIT_SETTINGS, payload: settings });
    } else {
      this.store.dispatch({ type: SettingsActions.ADD_SETTINGS, payload: settings });
    }
  }
}
