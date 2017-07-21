import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewChecked, PLATFORM_ID, Inject, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { TransferState } from '../../modules/transfer-state/transfer-state';

import { LoadCases } from '../../store/actions/case.actions';
import { LoadSettings } from '../../store/actions/settings.actions';

import { getCaseState, CaseState } from './../../store/reducers/case.reducer';
import { getSettingsState, SettingsState } from './../../store/reducers/settings.reducer';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class HomeComponent implements OnInit, AfterViewChecked {

  @logObservable public settings: Observable<any> = null;
  @logObservable public cases: Observable<any> = null;

  public settingsSubscription: Subscription;
  public caseSubscription: Subscription;
  public storeSubscription: Subscription;

  constructor(private transferState: TransferState,
              private store: Store<CaseState | SettingsState>,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.cases = store.select<CaseState>(getCaseState);
    this.settings = store.select<SettingsState>(getSettingsState);
  }

  ngOnInit(): void {
    this.loadCasesAndHandleStates();
    this.loadSettingsAndHandleStates();
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.storeSubscription = this.store.take(3).subscribe(state => {
        this.transferState.set('state', state);
      });
    }
  }

  private loadCasesAndHandleStates() {
    this.caseSubscription = this.cases.subscribe((res) => {
      if (typeof(res) !== 'undefined') {
        if (typeof(res.data) === 'undefined') {
          this.store.dispatch(new LoadCases());
        }
      }
    });
  }

  private loadSettingsAndHandleStates() {
    this.settingsSubscription = this.settings.subscribe((res) => {
      if (typeof(res) !== 'undefined') {
        if (typeof(res.data) === 'undefined') {
          this.store.dispatch(new LoadSettings());
        }
      }
    });
  }

}
