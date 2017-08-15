import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ChangeDetectorRef
} from '@angular/core';

import { Log } from '../../../../../decorators/log.decorator';

import { Log as LogItem } from '../../../../../store/models/log.model';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-log-data-row',
  templateUrl: './log.data.row.component.pug',
  styleUrls: ['./log.data.row.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDataRowComponent implements OnInit {

  @Input() logItem: LogItem;
  @Input() filterText: Subject<string>;

  @Output() editLogEvent: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() deleteLogEvent: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line:no-inferrable-types
  public filter: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public deleteModal: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  public editModal: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterText.subscribe((filter) => {
      this.filter = filter;
      this.changeDetectorRef.markForCheck();
    });
  }

  public editLog(): void {
    this.editModal = true;
  }

  public editLogResult(result: LogItem | boolean): void {
    this.editModal = false;

    if (result !== false) {
      this.editLogEvent.emit(<LogItem> result);
    }
  }

  public deleteLog(): void {
    this.deleteModal = true;
  }

  public deleteLogResult(result: boolean): void {
    this.deleteModal = false;

    if (result) {
      this.deleteLogEvent.emit(this.logItem._id)
    }
  }
}
