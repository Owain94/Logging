import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MdDialog } from '@angular/material';

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

import { CaseDeleteDialogComponent } from '../cases/case-delete-dialog/case.delete.dialog.component';

import { Log } from '../../decorators/log.decorator';
import { logObservable } from '../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { NotificationsService } from '../../services/notifications.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.pug',
  styleUrls: ['./cases.component.styl'],
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

  constructor(public dialog: MdDialog,
              private store: Store<CaseState>,
              private actions: AppActions,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService
  ) {
    this.cases = store.select<CaseState>(getCaseState);
  }

  ngOnInit(): void {
    this.HandleStates();
    this.initForm();
  }

  ngOnDestroy(): void {
    // pass
  }

  private initForm(): void {
    this.addCaseForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  private HandleStates(): void {
    this.addCaseSuccessSubscription = this.actions.ofType(ADD_CASE_SUCCESS).subscribe(() => {
      this.initForm();
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

  public submitForm(singleCase: Case): void {
    this.store.dispatch(new AddCase(singleCase));
  }

  public editCase(singleCase: Case): void {
    this.store.dispatch(new EditCase(singleCase));
  }

  public deleteCase(singleCase: Case): void {
    const dialogRef = this.dialog.open(CaseDeleteDialogComponent, {
      data: `${singleCase.name} - ${singleCase.description}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCase(singleCase));
      }
    });
  }

  public trackByFn(index: number, item: Case): string {
    return(item._id);
  }
}
