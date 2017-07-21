import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, AfterViewChecked, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { TransferState } from '../../../modules/transfer-state/transfer-state';

import { LOAD_CASES, LoadCases } from '../../../store/actions/case.actions';
import { LOAD_SETTINGS, LoadSettings } from '../../../store/actions/settings.actions';
import { LOAD_LOG, ADD_LOG, LoadLog, AddLog } from '../../../store/actions/log.actions';

import { getLogState, LogState } from '../../../store/reducers/log.reducer';
import { getSettingsState, SettingsState } from '../../../store/reducers/settings.reducer';
import { getCaseState, CaseState } from '../../../store/reducers/case.reducer';

import { Case } from '../../../store/models/case.model';
import { Settings } from '../../../store/models/settings.model';
import { Log as LogItem } from '../../../store/models/log.model';

import { Log } from '../../../decorators/log.decorator';
import { logObservable } from '../../../decorators/log.observable.decorator';
import { AutoUnsubscribe } from '../../../decorators/auto.unsubscribe.decorator';

import { NotificationsService } from '../../../services/notifications.service';
import { WebworkerService } from '../../../services/webworker.service';

import { Subscription } from 'rxjs/Subscription';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import 'rxjs/add/operator/take';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.pug',
  styleUrls: ['./case.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
@AutoUnsubscribe()
export class CaseComponent implements OnInit, AfterViewChecked {
  @logObservable public case: Observable<any> = null;
  @logObservable public settings: Observable<any> = null;
  @logObservable public log: Observable<any> = null;
  private datetime: Observable<number> = null;

  private casesSubscription: Subscription;
  private settingsSubscription: Subscription;
  private logSubscription: Subscription;
  private storeSubscription: Subscription;
  private activatedRouteParamSubscription: Subscription;
  private datetimeSubscription: Subscription;

  private id: string;
  private currentSettings: Settings = null;
  public header: [string, string] = ['', ''];
  // tslint:disable-next-line:no-inferrable-types
  public prefix: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public addLog: boolean = false;
  public allLogs: Array<LogItem> = [];
  public allCategories: Array<string> = [];
  // tslint:disable-next-line:no-inferrable-types
  public selectedCategory: string = '';
  public allCategorizedLogs: Object = {};

  public addLogForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  public browser: boolean = false;

  private static handleLog(input: any) {
    const res = input[0];
    const id = input[1];

    const allLogs = res.data.filter((log: LogItem) => {
      return log.case === id;
    });

    const allCategories =
      allLogs.map(
        (item: any) =>
          item.why.split('[')[1].split(']')[0].trim()).filter(
            (value: any, index: any, self: any) =>
              self.indexOf(value) === index);

    const allCategorizedLogs = { }
    for (const cat in allCategories) {
      if (allCategories.hasOwnProperty(cat)) {
        allCategorizedLogs[allCategories[cat]] = allLogs.filter((log: LogItem) => {
          return log.why.split('[')[1].split(']')[0].trim() === allCategories[cat];
        });
      }
    }

    if (allCategories.length > 0 && allLogs.length > 0) {
      allCategories.unshift('All');
      allCategorizedLogs['All'] = allLogs;
    }

    return [allLogs, allCategories, allCategorizedLogs];
  }

  constructor(private activatedRoute: ActivatedRoute,
              private transferState: TransferState,
              private store: Store<CaseState | SettingsState | LogState>,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private webworkerService: WebworkerService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.case = store.select<CaseState>(getCaseState);
    this.settings = store.select<SettingsState>(getSettingsState);
    this.log = store.select<LogState>(getLogState);
    this.datetime = IntervalObservable.create();
  }

  ngOnInit(): void {
    this.browser = isPlatformBrowser(this.platformId);
    this.activatedRouteParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.initForm();
      this.loadCasesAndHandleStates(this.id);
      this.loadSettingsAndHandleStates();
      this.loadLogAndHandleStates();

      this.datetime = IntervalObservable.create(1000);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.browser) {
      this.storeSubscription = this.store.take(2).subscribe(state => {
        this.transferState.set('state', state);
      });
    }
  }

  private initForm(): void {
    this.addLogForm = this.formBuilder.group({
      'who': [{value: null, disabled: true}, Validators.required],
      'what': [null, Validators.required],
      'where': [{value: null, disabled: true}, Validators.required],
      'when': [{value: null, disabled: true}, Validators.required],
      'why': [null, Validators.required],
      'how': [null, Validators.required],
      'with': [null, Validators.required],
      'result': [null, Validators.required]
    });
  }

  private fillForm(): void {
    this.prefix = `[ ${this.currentSettings.invpre} ]`;

    const nameField = this.addLogForm.get('who');
    const locationField = this.addLogForm.get('where');
    const datetimeField = this.addLogForm.get('when');

    if (nameField) {
      nameField.setValue(this.currentSettings.name);
    }

    if (locationField) {
      locationField.setValue(this.currentSettings.location);
    }

    try {
      this.datetimeSubscription.unsubscribe();
    } catch (err) {}
    this.datetimeSubscription = this.datetime.subscribe(() => {
      if (datetimeField) {
        datetimeField.setValue(new Date().toLocaleString());
      }
    });

    this.changeDetectorRef.markForCheck();
  }

  public submitForm(log: LogItem): void {
    log.who = this.currentSettings.name;
    log.where = this.currentSettings.location;
    log.when = new Date().toLocaleString();
    log.case = this.id;
    log.why = `${this.prefix} ${log.why}`;
    log.result = log.result.replace(/(?:\r\n|\r|\n)/g, '\n');

    this.store.dispatch(new AddLog(log));
  }

  private loadCasesAndHandleStates(id: string) {
    this.casesSubscription = this.case.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(new LoadCases());
      } else {
        switch (res.type) {

          case LOAD_CASES: {
            if (res.error) {
              this.notification(false, 'Couldn\'t load case, try again later.');
            }

            break;
          }
        }

        const result = res.data.filter((singleCase: Case) => {
          return singleCase._id === this.id;
        });

        this.header = [result[0].name, result[0].description];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private loadSettingsAndHandleStates() {
    this.settingsSubscription = this.settings.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(new LoadSettings());
      } else {
        switch (res.type) {

          case LOAD_SETTINGS: {
            if (res.error) {
              this.notification(false, 'Couldn\'t load settings, try again later.');
            }

            break;
          }
        }

        this.currentSettings = res.data[0];

        if (this.browser) {
          this.fillForm();
        }
      }
    });
  }

  private loadLogAndHandleStates() {
    this.logSubscription = this.log.subscribe((res) => {
      if (typeof(res.data) === 'undefined') {
        this.store.dispatch(new LoadLog());
      } else {
        switch (res.type) {

          case LOAD_LOG: {
            if (res.error) {
              this.notification(true, 'Couldn\'t load log, try again later.');
            }

            break;
          }

          case ADD_LOG: {
            if (res.error) {
              this.notification(true, 'Couldn\'t load log, try again later.');
            } else {
              this.notification(false, 'Log added!');
              this.initForm();
              this.fillForm();
              this.addLog = !this.addLog;
            }

            break;
          }
        }

        if (this.browser) {
          const handleLogPromise = this.webworkerService.run(CaseComponent.handleLog, [res, this.id]);
          handleLogPromise.then((result: any) => {
            this.allLogs = result[0];
            this.allCategories = result[1];
            this.allCategorizedLogs = result[2];

            if (this.selectedCategory === '') {
              this.selectedCategory = this.allCategories[0];
            }

            this.changeDetectorRef.markForCheck();
          });
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

    this.changeDetectorRef.markForCheck();
  }

  public trackByFn(index: number, item: Case): number {
    return index;
  }

  public exportAsExcelFile(): void {
    const allLogs = this.allCategorizedLogs;

    const allLogsJson = {};

    for (const cat in this.allCategories) {
      if (this.allCategories.hasOwnProperty(cat)) {

        for (const obj in allLogs[this.allCategories[cat]]) {
          if (allLogs[this.allCategories[cat]].hasOwnProperty(obj)) {
            delete allLogs[this.allCategories[cat]][obj]['__v'];
            delete allLogs[this.allCategories[cat]][obj]['_id'];
            delete allLogs[this.allCategories[cat]][obj]['$$index'];
            delete allLogs[this.allCategories[cat]][obj]['case'];
          }
        }

        allLogs[this.allCategories[cat]].unshift(
          {
            who: '',
            where: '',
            when: '',
            what: '',
            why: '',
            how: '',
            with: '',
            result: ''
          }
        );

        allLogsJson[this.allCategories[cat]] = XLSX.utils.json_to_sheet(
          allLogs[this.allCategories[cat]]
        );
      }
    }

    const workbook: XLSX.WorkBook = { Sheets: allLogsJson, SheetNames: this.allCategories };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'test');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().toLocaleString().replace(', ', '-')}.xlsx`);
  }
}
