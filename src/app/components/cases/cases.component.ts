import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, AfterViewChecked, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { Store } from '@ngrx/store';

import { TransferState } from '../../modules/transfer-state/transfer-state';

import {
  LOAD_CASES,
  ADD_CASE,
  EDIT_CASE,
  DELETE_CASE,
  LoadCases,
  AddCase,
  EditCase,
  DeleteCase
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
export class CasesComponent implements OnInit, AfterViewChecked {

  @logObservable public cases: Observable<any> = null;

  private casesSubscription: Subscription;
  private storeSubscription: Subscription;

  public addCaseForm: FormGroup;

  constructor(public dialog: MdDialog,
              private transferState: TransferState,
              private store: Store<CaseState>,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.cases = store.select<any>(getCaseState);
  }

  ngOnInit(): void {
    this.loadCasesAndHandleStates();
    this.initForm();
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.storeSubscription = this.store.take(2).subscribe(state => {
        this.transferState.set('state', state);
      });
    }
  }

  private initForm(): void {
    this.addCaseForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  private loadCasesAndHandleStates() {
    this.casesSubscription = this.cases.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(new LoadCases());
      } else {
        switch (res.type) {

          case LOAD_CASES: {
            if (res.error) {
              this.notification(true, 'Couldn\'t load cases, try again later.');
            }

            break;
          }

          case ADD_CASE: {
            if (res.error) {
              this.notification(true, 'Couldn\'t add case, try again later.');
            } else {
              this.initForm();
              this.notification(false, 'Case successfully added.');
            }

            break;
          }

          case EDIT_CASE: {
            if (res.error) {
              this.notification(true, 'Couldn\'t edit case, try again later.');
            } else {
              this.notification(false, 'Case successfully edited.');
            }

            break;
          }

          case DELETE_CASE: {
            if (res.error) {
              this.notification(true, 'Couldn\'t delete case, try again later.');
            } else {
              this.notification(false, 'Case successfully deleted.');
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

  public submitForm(singleCase: Case): void {
    this.store.dispatch(new AddCase(singleCase));
  }

  public editCase(singleCase: Case) {
    this.store.dispatch(new EditCase(singleCase));
  }

  public deleteCase(singleCase: Case) {
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
