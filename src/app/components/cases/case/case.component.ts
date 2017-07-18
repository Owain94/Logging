import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, AfterViewChecked, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { TransferState } from '../../../modules/transfer-state/transfer-state';

import { CaseActions } from '../../../store/actions/case.actions';

import { Case } from '../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';
import { logObservable } from '../../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../../decorators/auto.unsubscribe.decorator';

import { NotificationsService } from '../../../services/notifications.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.pug',
  styleUrls: ['./case.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class CaseComponent implements OnInit, AfterViewChecked {
  @logObservable public case: Observable<any> = null;

  private casesSubscription: Subscription;
  private storeSubscription: Subscription;

  private id: string;
  public header: [string, string] = ['', ''];

  private activatedRouteParamSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private transferState: TransferState,
              private store: Store<Case>,
              private caseActions: CaseActions,
              private notificationsService: NotificationsService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.case = store.select('cases');
  }

  ngOnInit(): void {
    this.activatedRouteParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.loadCasesAndHandleStates(this.id);
    });
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.storeSubscription = this.store.take(1).subscribe(state => {
        this.transferState.set('state', state);
      });
    }
  }

  private loadCasesAndHandleStates(id: string) {
    this.casesSubscription = this.case.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(this.caseActions.loadCases());
      } else {
        switch (res.type) {

          case CaseActions.LOAD_CASES: {
            if (res.error) {
              this.notification(false, 'Couldn\'t load case, try again later.');
            }

            break;
          }
        }

        const result = res.data.filter((singleCase: Case) => {
          return singleCase._id === this.id;
        });

        this.header = [result[0].name, result[0].description];
        this.changeDetectorRef.markForCheck();
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
}
