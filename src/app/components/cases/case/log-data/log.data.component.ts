import { LogDeleteDialogComponent } from './../log-delete-dialog/log.delete.dialog.component';
import { LogEditDialogComponent } from './../log-edit-dialog/log.edit.dialog.component';
import { MdDialog } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { WebworkerService } from './../../../../services/webworker.service';

import {
  Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, PLATFORM_ID, Inject, OnDestroy
} from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';
import { Observable } from 'rxjs/Observable';
import { logObservable } from '../../../../decorators/log.observable.decorator';
import { Log as LogItem } from '../../../../store/models/log.model';
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
  @Input() selectedCategory: string;

  @Output() editLogEvent: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() deleteLogEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() allCategoriesEvent: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() allCategorizedLogsEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private logSubscription: Subscription;

  public allLogs: Array<LogItem> = [];
  public allCategories: Array<string> = [];
  public allCategorizedLogs: Object = {};

  // tslint:disable-next-line:no-inferrable-types
  public browser: boolean = false;

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

  constructor(public dialog: MdDialog,
              private webworkerService: WebworkerService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.browser = isPlatformBrowser(this.platformId);
    this.handleStates();
  }

  ngOnDestroy(): void {
    // pass
  }

  private handleStates(): void {
    this.logSubscription = this.log.subscribe((res) => {
      if (this.browser) {
        const handleLogPromise = this.webworkerService.run(LogDataComponent.handleLog, this.allLogs = res);
        handleLogPromise.then((result: any) => {
          this.allCategories = result[0];
          this.allCategorizedLogs = result[1];

          this.allCategoriesEvent.emit(this.allCategories);
          this.allCategorizedLogsEvent.emit(this.allCategorizedLogs);
          this.webworkerService.terminate(handleLogPromise);
        });
      }
    });
  }

  public editLog(id: string): void {
    const dialogRef = this.dialog.open(LogEditDialogComponent, {
      data: this.allLogs.filter((log: LogItem) => {
        return log._id === id;
      })[0]
    });
    dialogRef.afterClosed().subscribe((result: LogItem | null) => {
      if (result !== null) {
        this.editLogEvent.emit(result);
      }
    });
  }

  public deleteLog(id: string): void {
    const dialogRef = this.dialog.open(LogDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLogEvent.emit(id);
      }
    });
  }
}
