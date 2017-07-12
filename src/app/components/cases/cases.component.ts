import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, AfterViewChecked, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';

import { TransferState } from '../../modules/transfer-state/transfer-state';

import { CaseActions } from './../../store/actions/case.actions';

import { Case } from './../../store/models/case.model';

import { Log } from '../../decorators/log.decorator';

import { NotificationsService } from '../../services/notifications.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.pug',
  styleUrls: ['./cases.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CasesComponent implements OnInit, AfterViewChecked {

  public cases: Observable<any> = null;
  public addCaseForm: FormGroup;

  constructor(private transferState: TransferState,
              private store: Store<Case>,
              private caseActions: CaseActions,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.cases = store.select('cases');
  }

  ngOnInit(): void {
    this.loadCasesAndHandleStates();
    this.initForm();
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.store.take(1).subscribe(state => {
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
    this.cases.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(this.caseActions.loadCases());
      } else {
        switch (res.type) {

          case CaseActions.ADD_CASE: {
            if (res.error) {
              this.notification(false, 'Couldn\'t add case, try again later.');
            } else {
              this.initForm();
              this.notification(false, 'Case successfully added.');
            }

            break;
          }

          case CaseActions.EDIT_CASE: {
            if (res.error) {
              this.notification(false, 'Couldn\'t edit case, try again later.');
            } else {
              this.notification(false, 'Case successfully edited.');
            }

            break;
          }

          case CaseActions.DELETE_CASE: {
            if (res.error) {
              this.notification(false, 'Couldn\'t delete case, try again later.');
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
  }

  public submitForm(singleCase: Case): void {
    this.store.dispatch({ type: CaseActions.ADD_CASE, payload: singleCase });
  }

  public editCase(singleCase: Case) {
    this.store.dispatch({ type: CaseActions.EDIT_CASE, payload: singleCase });
  }

  public deleteCase(singleCase: Case) {
    this.store.dispatch({ type: CaseActions.DELETE_CASE, payload: singleCase });
  }

  public trackByFn(index: number, item: Case): string {
    return(item._id);
  }
}
