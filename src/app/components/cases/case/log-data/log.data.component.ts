import { isPlatformBrowser } from '@angular/common';
import { WebworkerService } from './../../../../services/webworker.service';

import {
  Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, PLATFORM_ID, Inject, OnDestroy
} from '@angular/core';

import { Log as LogItem } from '../../../../store/models/log.model';

import { Log } from '../../../../decorators/log.decorator';
import { logObservable } from '../../../../decorators/log.observable.decorator';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
  @Output() allCategoriesEvent: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() allCategorizedLogsEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private logSubscription: Subscription;

  public allLogs: Array<LogItem> = [];
  public allCategories: Array<string> = [];
  public allCategorizedLogs: Object = {};

  private static handleLog(allLogs: any): [Array<string>, Object] {
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

    if (allCategories.length > 0 && allLogs.length > 0) {
      allCategories.unshift('All');
      allCategorizedLogs['All'] = allLogs;
    }

    return [allCategories, allCategorizedLogs];
  }

  constructor(private webworkerService: WebworkerService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.handleStates();
  }

  ngOnDestroy(): void {
    // pass
  }

  private handleStates(): void {
    this.logSubscription = this.log.subscribe((res) => {
      this.allLogs = res;

      if (isPlatformBrowser(this.platformId)) {
        const handleLogPromise = this.webworkerService.run(LogDataComponent.handleLog, this.allLogs);
        handleLogPromise.then((result: any) => {
          this.resolveHandleLog(result[0], result[1]);
          this.webworkerService.terminate(handleLogPromise);
        });
      } else {
        const resolveHandleLog = LogDataComponent.handleLog(this.allLogs);
        this.resolveHandleLog(resolveHandleLog[0], resolveHandleLog[1]);
      }
    });
  }

  private resolveHandleLog(allCategories: Array<string>, allCategorizedLogs: Object): void {
    this.allCategories = allCategories;
    this.allCategorizedLogs = allCategorizedLogs;

    this.allCategoriesEvent.emit(this.allCategories);
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
