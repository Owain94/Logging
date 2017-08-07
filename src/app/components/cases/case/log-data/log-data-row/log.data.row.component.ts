import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ChangeDetectorRef
} from '@angular/core';

import { MdDialog } from '@angular/material';

import { Log } from '../../../../../decorators/log.decorator';

import { Log as LogItem } from '../../../../../store/models/log.model';

import { LogEditDialogComponent } from '../../log-edit-dialog/log.edit.dialog.component';
import { LogDeleteDialogComponent } from '../../log-delete-dialog/log.delete.dialog.component';

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

  public filter = '';

  constructor(public dialog: MdDialog,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterText.subscribe((filter) => {
      this.filter = filter;
      this.changeDetectorRef.markForCheck();
    });
  }

  public editLog(): void {
    const dialogRef = this.dialog.open(LogEditDialogComponent, {
      data: this.logItem
    });
    dialogRef.afterClosed().subscribe((result: LogItem | null) => {
      if (result !== null) {
        this.editLogEvent.emit(result);
      }
    });
  }

  public deleteLog(): void {
    const dialogRef = this.dialog.open(LogDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLogEvent.emit(this.logItem._id);
      }
    });
  }
}
