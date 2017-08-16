import { Component, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Case } from '../../../../store/models/case.model';

import { Log } from '../../../../decorators/log.decorator';

import { BrokerService } from '../../../../services/broker.service';

@Component({
  selector: 'app-case-row-edit-dialog',
  templateUrl: './case.row.edit.dialog.component.pug',
  styleUrls: ['./case.row.edit.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseRowEditDialogComponent implements OnInit {
  @Input() public singleCase: Case;

  @Output() public result = new EventEmitter<boolean | Case>();

  public editCaseForm: FormGroup;

  // tslint:disable-next-line:no-inferrable-types
  public hide: boolean = false;
  private formSubmitAttempt: boolean;

  constructor(private brokerService: BrokerService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editCaseForm = this.formBuilder.group({
      'name': [this.singleCase.name, Validators.required],
      'description': [this.singleCase.description, Validators.required]
    });
  }

  public isFieldValid(field: string): boolean {
    return !this.editCaseForm.get(field).valid && this.formSubmitAttempt;
  }

  public submitForm(singleCase: Case): void {
    this.formSubmitAttempt = true;
    if (this.editCaseForm.valid) {
      singleCase._id = this.singleCase._id;
      this.returnValue(singleCase)
    }
  }

  public returnValue(result: boolean | Case): void {
    this.hide = true;
    setTimeout(
      () => {
        this.brokerService.stopScroll(false);
        this.result.emit(result);
      }, 200
    );
  }
}
