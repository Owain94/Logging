import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Case } from '../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-case-row',
  templateUrl: './case.row.component.pug',
  styleUrls: ['./case.row.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseRowComponent implements OnInit {

  @Input('singleCase') public singleCase: Case;

  @Output() public onEdit = new EventEmitter<Case>();
  @Output() public onDelete = new EventEmitter<Case>();

  public editCaseForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  public editing: boolean = false;

  constructor(private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editCaseForm = this.formBuilder.group({
      'name': [this.singleCase.name, Validators.required],
      'description': [this.singleCase.description, Validators.required]
    });
  }

  public submitForm(singleCase: Case): void {
    if (singleCase.name !== this.singleCase.name || singleCase.description !== this.singleCase.description) {
      this.onEdit.emit({
        _id: this.singleCase._id,
        name: singleCase.name,
        description: singleCase.description
      });
    }
    this.editing = false;
  }

  public editCase(): void {
    this.editing = true;
  }

  public deleteCase(): void {
    this.onDelete.emit(this.singleCase);
  }
}
