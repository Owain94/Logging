import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';

import { CaseActions } from './../../store/actions/case.actions';

import { Case } from './../../store/models/case.model';

import { Log } from '../../decorators/log.decorator';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.pug',
  styleUrls: ['./cases.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CasesComponent implements OnInit {

  public cases: Observable<any> = null;
  public addCaseForm: FormGroup;

  constructor(private store: Store<Case>,
              private caseActions: CaseActions,
              private formBuilder: FormBuilder
  ) {
    this.cases = store.select('cases');
  }

  ngOnInit(): void {
    this.loadCases();
    this.initForm();

    this.cases.subscribe((res: any) => {
      console.log('OBSERVER');
      console.log(res);

      if (res.type === CaseActions.ADD_CASE) {
        if (res.error) {
          console.log('error');
        } else {
          this.initForm();
        }
      }
    });
  }

  private initForm(): void {
    this.addCaseForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  public submitForm(singleCase: Case): void {
    this.store.dispatch({ type: 'ADD_CASE', payload: singleCase });
  }

  private loadCases() {

    // this.cases.subscribe((res) => console.log(res));

    this.store.dispatch(this.caseActions.loadCases());

    /* const timeoutId = setTimeout(() => {
      this.cases.subscribe((res) => console.log(res));
      clearTimeout(timeoutId);
    }, 1000); */
  }

  addCase(singleCase: Case) {
    this.store.dispatch({ type: 'ADD_CASE', payload: singleCase });
  }

  deleteCase(singleCase: Case) {
    this.store.dispatch({ type: 'DELETE_CASE', payload: singleCase });
  }

  public trackByFn(index: number, item: Case): string {
    return(item._id);
  }
}
