import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ChangeDetectorRef
} from '@angular/core';

import { Log } from '../../../../../decorators/log.decorator';

import { Log as LogItem } from '../../../../../store/models/log.model';

import { BrokerService } from '../../../../../services/broker.service';

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

  constructor(private brokerService: BrokerService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterText.subscribe((filter) => {
      this.filter = filter;
      this.changeDetectorRef.markForCheck();
    });
  }

  public editLog(): void {
    /*const dialogRef = this.dialog.open(LogEditDialogComponent, {
      data: this.logItem
    });
    dialogRef.afterClosed().subscribe((result: LogItem | null) => {
      if (result !== null) {
        this.editLogEvent.emit(result);
      }
    });*/
  }

  public deleteLog(): void {
    const deletePromtSubscription = this.brokerService.confirmReturn.subscribe(
      (res: boolean) => {
        if (res) {
          setTimeout(() => this.deleteLogEvent.emit(this.logItem._id), 100);
        }

        deletePromtSubscription.unsubscribe();
      }
    );

    this.brokerService.confirmPrompt(
      'Delete?',
      'Are you sure you want to delete the log item?',
    );
  }
}
