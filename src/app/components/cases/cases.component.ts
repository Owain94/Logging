import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppActions } from '../../store/app.actions';
import {
  AddCase,
  EditCase,
  DeleteCase,
  ADD_CASE_SUCCESS,
  ADD_CASE_FAILURE,
  EDIT_CASE_FAILURE,
  EDIT_CASE_SUCCESS,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_FAILURE
} from '../../store/actions/case.actions';

import { getCaseState, CaseState } from '../../store/reducers/case.reducer';

import { Case } from '../../store/models/case.model';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { BrokerService } from '../../services/broker.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class CasesComponent implements OnInit, OnDestroy {

  @logObservable public cases: Observable<CaseState> = null;

  private addCaseSuccessSubscription: Subscription;
  private addCaseFailureSubscription: Subscription;
  private editCaseSuccessSubscription: Subscription;
  private editCaseFailureSubscription: Subscription;
  private deleteCaseSuccessSubscription: Subscription;
  private deleteCaseFailureSubscription: Subscription;

  public addCaseForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  public deleteModal: boolean = false;
  public selectedCase: Case;

  constructor(private store: Store<CaseState>,
              private actions: AppActions,
              private brokerService: BrokerService
  ) {
    this.cases = store.select<CaseState>(getCaseState);
  }

  ngOnInit(): void {
    this.HandleStates();
  }

  ngOnDestroy(): void {
    // pass
  }

  private HandleStates(): void {
    this.addCaseSuccessSubscription = this.actions.ofType(ADD_CASE_SUCCESS).subscribe(() => {
      this.notification(false, 'Case successfully added.')
    });

    this.addCaseFailureSubscription = this.actions.ofType(ADD_CASE_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t add case, try again later.');
    });

    this.editCaseSuccessSubscription = this.actions.ofType(EDIT_CASE_SUCCESS).subscribe(() => {
      this.notification(false, 'Case successfully edited.');
    });

    this.editCaseFailureSubscription = this.actions.ofType(EDIT_CASE_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t edit case, try again later.');
    });

    this.deleteCaseSuccessSubscription = this.actions.ofType(DELETE_CASE_SUCCESS).subscribe(() => {
      this.notification(false, 'Case successfully deleted.');
    });

    this.deleteCaseFailureSubscription = this.actions.ofType(DELETE_CASE_FAILURE).subscribe(() => {
      this.notification(true, 'Couldn\'t delete case, try again later.');
    });
  }

  private notification(error: boolean, description: string): void {
    this.brokerService.notificationText(
      error ? 'Error' : 'Success',
      description
    );
  }

  public addCase(singleCase: Case): void {
    this.store.dispatch(new AddCase(singleCase));
  }

  public editCase(singleCase: Case): void {
    this.store.dispatch(new EditCase(singleCase));
  }

  public deleteCase(singleCase: Case): void {
    this.selectedCase = singleCase;
    this.deleteModal = true;
  }

  public deleteCaseResult(result: boolean): void {
    this.deleteModal = false;

    if (result) {
      this.store.dispatch(new DeleteCase(this.selectedCase));
    }
  }

  public trackByFn(index: number, item: Case): string {
    return(item._id);
  }
}
