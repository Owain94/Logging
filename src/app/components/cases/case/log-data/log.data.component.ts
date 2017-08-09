import {
  Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Log as LogItem } from '../../../../store/models/log.model';

import { Log } from '../../../../decorators/log.decorator';
import { logObservable } from '../../../../decorators/log.observable.decorator';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-log-data',
  templateUrl: './log.data.component.pug',
  styleUrls: ['./log.data.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDataComponent implements OnInit, OnDestroy {

  @Input() @logObservable log: Observable<any>;
  // tslint:disable-next-line:no-inferrable-types
  @Input() selectedCategory: string;

  @Output() editLogEvent: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() deleteLogEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() allCategoriesEvent: EventEmitter<Array<Object>> = new EventEmitter<Array<Object>>();
  @Output() allCategorizedLogsEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private logSubscription: Subscription;
  private filterInputSubscription: Subscription;

  public allLogs: Array<LogItem> = [];
  public allCategories: Array<Object> = [];
  public allCategorizedLogs: Object = {};

  // tslint:disable-next-line:no-inferrable-types
  public filterText: Subject<string> = new Subject<string>();
  public filterInput = new FormControl();

  private static handleLog(allLogs: any): [Array<Object>, Object] {
    const allCategories =
      allLogs.map(
        (item: any) =>
          item.why.split(/\[(.+)/)[1].split(/\](.+)/)[0].trim()).filter(
            (value: any, index: any, self: any) =>
              self.indexOf(value) === index);

    const allCategorizedLogs = { }
    for (const cat in allCategories) {
      if (allCategories.hasOwnProperty(cat)) {
        allCategorizedLogs[allCategories[cat]] = allLogs.filter((log: LogItem) => {
          return log.why.split(/\[(.+)/)[1].split(/\](.+)/)[0].trim() === allCategories[cat];
        });
      }
    }
    const allCountedCategories = []
    if (allCategories.length > 0 && allLogs.length > 0) {
      allCategories.unshift('All');
      allCategorizedLogs['All'] = allLogs;

      for (const cat in allCategories) {
        if (allCategories.hasOwnProperty(cat)) {
          allCountedCategories.push({
            'category': allCategories[cat],
            'entries': allCategorizedLogs[allCategories[cat]].length
          });
        }
      }
    }

    return [allCountedCategories, allCategorizedLogs];
  }

  ngOnInit(): void {
    this.handleStates();

    this.filterInputSubscription = this.filterInput
      .valueChanges
      .debounceTime(250)
      .subscribe((term) => {
        this.filterText.next(term);
      });
  }

  ngOnDestroy(): void {
    // pass
  }

  private handleStates(): void {
    this.logSubscription = this.log.subscribe((res) => {
      const resolveHandleLog = LogDataComponent.handleLog(this.allLogs = res);
      this.resolveHandleLog(resolveHandleLog[0], resolveHandleLog[1]);
    });
  }

  private resolveHandleLog(allCategories: Array<Object>, allCategorizedLogs: Object): void {
    this.allCategories = allCategories;
    this.allCategorizedLogs = allCategorizedLogs;

    this.allCategoriesEvent.emit(allCategories);
    this.allCategorizedLogsEvent.emit(this.allCategorizedLogs);
  }

  public editLog(logItem: LogItem): void {
    this.editLogEvent.emit(logItem);
  }

  public deleteLog(id: string): void {
    this.deleteLogEvent.emit(id);
  }

  public trackByFn(index: number, item: LogItem): string {
    return(item._id);
  }
}
