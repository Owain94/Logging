import { Component, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Log } from '../../../decorators/log.decorator';

import { BrokerService } from '../../../services/broker.service';

@Component({
  selector: 'app-notificatione-dialog',
  templateUrl: './notification.dialog.component.pug',
  styleUrls: ['./notification.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class NotificationDialogComponent implements OnInit {
  @Input() public notification: {title: string, content: string};

  @Output() public result = new EventEmitter<boolean>();

  // tslint:disable-next-line:no-inferrable-types
  public hide: boolean = false;

  constructor(private brokerService: BrokerService) {}

  ngOnInit(): void {
    this.brokerService.stopScroll(true);
  }

  public hideDialog(): void {
    this.hide = true;
    setTimeout(
      () => {
        this.brokerService.stopScroll(false);
        this.result.emit(true);
      }, 200
    );
  }
}
