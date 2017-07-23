import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
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
              @Inject(MD_DIALOG_DATA) public logItem: LogItem) { }

  ngOnInit(): void {
    const reason = this.logItem.why.split(/\[(.+)/)[1].split(/\](.+)/);
    this.prefix = `[ ${reason[0].trim()} ]`;

    this.editLogForm = this.formBuilder.group({
      'what': [this.logItem.what, Validators.required],
      'where': [this.logItem.where, Validators.required],
      'why': [reason[1].trim(), Validators.required],
      'how': [this.logItem.how, Validators.required],
      'with': [this.logItem.with, Validators.required],
      'result': [this.logItem.result]
    });
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
