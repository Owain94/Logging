import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Case } from '../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-add-case',
  templateUrl: './add.case.component.pug',
  styleUrls: ['./add.case.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class AddCaseComponent implements OnInit {

  @Output() addCaseEvent: EventEmitter<Case> = new EventEmitter<Case>();

  public addCaseForm: FormGroup;
  private formSumitAttempt: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addCaseForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  public isFieldValid(field: string) {
    return !this.addCaseForm.get(field).valid && this.formSumitAttempt;
  }

  public submitForm(singleCase: Case): void {
    this.formSumitAttempt = true;
    if (this.addCaseForm.valid) {
      this.addCaseEvent.emit(singleCase);
      this.addCaseForm.reset();
      this.formSumitAttempt = false;
    }
  }
}
