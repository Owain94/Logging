import { Component, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Case } from '../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';

import { BrokerService } from '../../../services/broker.service';

@Component({
  selector: 'app-case-delete-dialog',
  templateUrl: './case.delete.dialog.component.pug',
  styleUrls: ['./case.delete.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseDeleteDialogComponent implements OnInit {
  @Input() public singleCase: Case;

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
