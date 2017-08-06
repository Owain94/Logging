import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppActions } from '../../../store/app.actions';
import {
  EditLog,
  DeleteLog,
  AddLog,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_FAILURE,
  DELETE_LOG_SUCCESS,
  DELETE_LOG_FAILURE
} from '../../../store/actions/log.actions';

import { getSingleCase } from '../../../store/reducers/case.reducer';
import { getLogsForCase } from '../../../store/reducers/log.reducer';

import { Case } from '../../../store/models/case.model';
import { Log as LogItem } from '../../../store/models/log.model';

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
export class CaseComponent implements OnInit, OnDestroy {
  @logObservable public case: Observable<Case> = null;
  public log: Observable<Array<LogItem>> = null;

  private addLogSuccessSubscription: Subscription;
  private addLogFailureSubscription: Subscription;
  private editLogSuccessSubscription: Subscription;
  private editLogFailureSubscription: Subscription;
  private deleteLogSuccessSubscription: Subscription;
  private deleteLogFailureSubscription: Subscription;
  private activatedRouteParamSubscription: Subscription;

  private id: string;
  // tslint:disable-next-line:no-inferrable-types
  public addLogToggle: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  public selectedCategory: string = '';
  public allCategories: Array<string> = [];
  public allCategorizedLogs: Object = {};

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<Array<LogItem> | Case>,
              private actions: AppActions,
              private notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.activatedRouteParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.case = this.store.select<Case>(getSingleCase(this.id));
      this.log = this.store.select<Array<LogItem>>(getLogsForCase(this.id));

      this.handleStates();
    });
  }

  ngOnDestroy(): void {
    // pass
  }

  public allCategorizedLogsEvent(categorizedLogs: Object) {
    this.allCategorizedLogs = categorizedLogs;
  }

  public addLog(log: LogItem): void {
    this.store.dispatch(new AddLog(log));
  }

  public editLog(log: LogItem): void {
    this.store.dispatch(new EditLog(log));
  }

  public deleteLog(id: string): void {
    this.store.dispatch(new DeleteLog({'_id': id}));
  }

  private handleStates(): void {
    this.addLogSuccessSubscription = this.actions.ofType(ADD_LOG_SUCCESS).subscribe(() => {
      this.addLogToggle = !this.addLogToggle;
      this.notification(false, 'Log successfully added.')
    });

    this.addLogFailureSubscription = this.actions.ofType(ADD_LOG_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t add log, try again later.');
    });

    this.editLogSuccessSubscription = this.actions.ofType(EDIT_LOG_SUCCESS).subscribe(() => {
      this.notification(false, 'Log successfully edited.');
    });

    this.editLogFailureSubscription = this.actions.ofType(EDIT_LOG_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t edit log, try again later.');
    });

    this.deleteLogSuccessSubscription = this.actions.ofType(DELETE_LOG_SUCCESS).subscribe(() => {
      this.notification(false, 'Log successfully deleted.');
    });

    this.deleteLogFailureSubscription = this.actions.ofType(DELETE_LOG_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t delete log, try again later.');
    });
  }

  public notificationEvent(input: [boolean, string]): void {
    this.notification(input[0], input[1]);
  }

  private notification(error: boolean, description: string): void {
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
  }
}
