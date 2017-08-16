import { Component, ChangeDetectionStrategy, Output, OnInit, EventEmitter } from '@angular/core';

import { Log } from '../../../../../../decorators/log.decorator';

import { BrokerService } from '../../../../../../services/broker.service';

@Component({
  selector: 'app-log-data-row-delete-dialog',
  templateUrl: './log.data.row.delete.dialog.component.pug',
  styleUrls: ['./log.data.row.delete.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDataRowDeleteDialogComponent implements OnInit {
  @Output() public result = new EventEmitter<boolean>();

  // tslint:disable-next-line:no-inferrable-types
  public hide: boolean = false;

  constructor(private brokerService: BrokerService) {}

  ngOnInit(): void {
    this.brokerService.stopScroll(true);
  }

  public returnValue(result: boolean): void {
    this.hide = true;
    setTimeout(
      () => {
        this.brokerService.stopScroll(false);
        this.result.emit(result);
      }, 200
    );
  }
}
