import { Component, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Log as LogItem } from '../../../../../../store/models/log.model';

import { Log } from '../../../../../../decorators/log.decorator';

import { BrokerService } from '../../../../../../services/broker.service';

@Component({
  selector: 'app-log-data-row-edit-dialog',
  templateUrl: './log.data.row.edit.dialog.component.pug',
  styleUrls: ['./log.data.row.edit.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDataRowEditDialogComponent implements OnInit {
  @Input() public logItem: LogItem;

  @Output() public result = new EventEmitter<boolean | LogItem>();

  public editLogForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  public prefix: string = '';
  private formSubmitAttempt: boolean;

  // tslint:disable-next-line:no-inferrable-types
  public hide: boolean = false;

  constructor(private brokerService: BrokerService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.brokerService.stopScroll(true);
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

  public isFieldValid(field: string) {
    return !this.editLogForm.get(field).valid && this.formSubmitAttempt;
  }

  public submitForm(log: LogItem): void {
    this.formSubmitAttempt = true;
    if (this.editLogForm.valid) {
      log._id = this.logItem._id;
      log.who = this.logItem.who;
      log.when = this.logItem.when;
      log.case = this.logItem.case;
      log.why = `${this.prefix} ${log.why}`;
      if (log.result) {
        log.result = log.result.replace(/(?:\r\n|\r|\n)/g, '\n');
      }
      this.returnValue(log)
    }
  }

  public returnValue(result: boolean | LogItem): void {
    this.hide = true;
    setTimeout(
      () => {
        this.brokerService.stopScroll(false);
        this.result.emit(result);
      }, 200
    );
  }
}
