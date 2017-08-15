
import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { getSettings } from '../../../../store/reducers/settings.reducer';

import { Settings } from '../../../../store/models/settings.model';
import { Log as LogItem } from '../../../../store/models/log.model';

import { Log } from '../../../../decorators/log.decorator';
import { logObservable } from '../../../../decorators/log.observable.decorator';

import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-log-add',
  templateUrl: './log.add.component.pug',
  styleUrls: ['./log.add.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogAddComponent implements OnInit, OnDestroy {

  @Input() id: string;

  @Output() addLog: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() notification: EventEmitter<[boolean, string]> = new EventEmitter<[boolean, string]>();

  @logObservable public settings: Observable<any> = null;
  private datetime: Observable<number> = null;

  public addLogForm: FormGroup;

  private datetimeSubscription: Subscription;

  // tslint:disable-next-line:no-inferrable-types
  public prefix: string = '';
  private formSubmitAttempt: boolean;
  // tslint:disable-next-line:no-inferrable-types
  public datetimeValue: Subject<number> = new Subject<number>();

  constructor(private formBuilder: FormBuilder,
              private store: Store<Settings>) {
    this.settings = this.store.select<Settings>(getSettings);
    this.datetime = IntervalObservable.create();
  }

  ngOnInit(): void {
    this.initForm();

    this.datetime = IntervalObservable.create(1000);

    this.datetimeSubscription = this.datetime.subscribe(() =>
      this.datetimeValue.next(new Date().getTime())
    );
  }

  ngOnDestroy(): void {
    // pass
  }

  private initForm(): void {
    this.addLogForm = this.formBuilder.group({
      'what': [null, Validators.required],
      'why': [null, Validators.required],
      'how': [null, Validators.required],
      'with': [null, Validators.required],
      'result': [null]
    });
  }

  public isFieldValid(field: string) {
    return !this.addLogForm.get(field).valid && this.formSubmitAttempt;
  }

  public submitForm(log: LogItem): void {
    this.formSubmitAttempt = true;
    if (this.addLogForm.valid) {
      this.settings.take(1).subscribe((settings: Settings) => {
        log.who = settings.name;
        log.where = settings.location;
        log.when = new Date().getTime();
        log.case = this.id;
        log.why = `[ ${settings.invpre} ] ${log.why}`;
        if (log.result) {
          log.result = log.result.replace(/(?:\r\n|\r|\n)/g, '\n');
        }

        this.addLog.emit(log);
      });
    }
  }

}
