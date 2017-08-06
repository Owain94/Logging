import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter
} from '@angular/core';

import { MdDialog } from '@angular/material';

import { Log } from '../../../../../decorators/log.decorator';

import { Log as LogItem } from '../../../../../store/models/log.model';

import { LogEditDialogComponent } from '../../log-edit-dialog/log.edit.dialog.component';
import { LogDeleteDialogComponent } from '../../log-delete-dialog/log.delete.dialog.component';

@Component({
  selector: 'app-log-data-row',
  templateUrl: './log.data.row.component.pug',
  styleUrls: ['./log.data.row.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDataRowComponent {

  @Input() logItem: LogItem;

  @Output() editLogEvent: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() deleteLogEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public dialog: MdDialog) {
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
        console.log(this.logItem._id);
        this.deleteLogEvent.emit(this.logItem._id);
      }
    });
  }
}
