import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Settings } from '../../store/models/settings.model';

import { getSettings } from '../../store/reducers/settings.reducer';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class HomeComponent implements OnDestroy {

  @logObservable public settings: Observable<Settings>;

  constructor(private store: Store<Settings>) {
    this.settings = this.store.select<Settings>(getSettings);
  }

  ngOnDestroy(): void {
    // pass
  }
}
