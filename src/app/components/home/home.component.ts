import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { getCaseState, CaseState } from '../../store/reducers/case.reducer';
import { getSettingsState, SettingsState } from '../../store/reducers/settings.reducer';

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
export class HomeComponent {

  @logObservable public settings: Observable<SettingsState> = null;
  @logObservable public cases: Observable<CaseState> = null;

  public settingsSubscription: Subscription;
  public caseSubscription: Subscription;
  public storeSubscription: Subscription;

  constructor(private store: Store<CaseState | SettingsState>
  ) {
    this.cases = this.store.select<CaseState>(getCaseState);
    this.settings = this.store.select<SettingsState>(getSettingsState);
  }
}
