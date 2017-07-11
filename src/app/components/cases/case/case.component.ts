import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Case } from './../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.pug',
  styleUrls: ['./case.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseComponent implements OnInit {

  @Input('singleCase') public singleCase: Case;

  @Output() public onEdit = new EventEmitter<Case>();
  @Output() public onDelete = new EventEmitter<Case>();

  public cases: Observable<any> = null;
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
    this.onEdit.emit({
      _id: this.singleCase._id,
      name: singleCase.name,
      description: singleCase.description
    });
    this.editing = false;
  }

  public editCase() {
    this.editing = true;
  }

  public deleteCase() {
    this.onDelete.emit(this.singleCase);
  }
}
