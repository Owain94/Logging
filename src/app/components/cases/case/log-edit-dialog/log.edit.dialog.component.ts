import { Component, ChangeDetectionStrategy, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Log as LogItem } from '../../../../store/models/log.model';

import { Log } from '../../../../decorators/log.decorator';

@Component({
  selector: 'app-log-edit-dialog',
  templateUrl: './log.edit.dialog.component.pug',
  styleUrls: ['./log.edit.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogEditDialogComponent implements OnInit {

  public editLogForm: FormGroup;

  // tslint:disable-next-line:no-inferrable-types
  public prefix: string = '';

  constructor(public dialogRef: MdDialogRef<LogEditDialogComponent>,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MD_DIALOG_DATA) public logItem: LogItem) { }

  ngOnInit(): void {
    this.initForm();
    this.fillForm();
  }

  private initForm(): void {
    this.editLogForm = this.formBuilder.group({
      'who': [{value: null, disabled: true}, Validators.required],
      'what': [null, Validators.required],
      'where': [null, Validators.required],
      'when': [{value: null, disabled: true}, Validators.required],
      'why': [null, Validators.required],
      'how': [null, Validators.required],
      'with': [null, Validators.required],
      'result': [null]
    });
  }

  private fillForm(): void {
    const reason = this.logItem.why.split(/\[(.+)/)[1].split(/\](.+)/);

    this.prefix = `[ ${reason[0].trim()} ]`;

    const whoField = this.editLogForm.get('who');
    const whatField = this.editLogForm.get('what');
    const whereField = this.editLogForm.get('where');
    const whenField = this.editLogForm.get('when');
    const whyField = this.editLogForm.get('why');
    const howField = this.editLogForm.get('how');
    const withField = this.editLogForm.get('with');
    const resultField = this.editLogForm.get('result');

    if (whoField) {
      whoField.setValue(this.logItem.who);
    }

    if (whatField) {
      whatField.setValue(this.logItem.what);
    }

    if (whereField) {
      whereField.setValue(this.logItem.where);
    }

    if (whenField) {
      whenField.setValue(this.logItem.when);
    }

    if (whyField) {
      whyField.setValue(reason[1].trim());
    }

    if (howField) {
      howField.setValue(this.logItem.how);
    }

    if (withField) {
      withField.setValue(this.logItem.with);
    }

    if (resultField && this.logItem.result) {
      resultField.setValue(this.logItem.result);
    }

    this.changeDetectorRef.markForCheck();
  }

  public submitForm(log: LogItem): void {
    log._id = this.logItem._id;
    log.who = this.logItem.who;
    log.when = this.logItem.when;
    log.case = this.logItem.case;
    log.why = `${this.prefix} ${log.why}`;
    if (log.result) {
      log.result = log.result.replace(/(?:\r\n|\r|\n)/g, '\n');
    }
    this.dialogRef.close(log)
  }
}
