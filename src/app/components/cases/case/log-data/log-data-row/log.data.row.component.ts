import { isPlatformServer } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

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
export class LogDataRowComponent implements OnInit, AfterViewInit {

  @Input() logItem: LogItem;
  @Input() i: number;
  @Input() filterText: Subject<string>;

  @Output() editLogEvent: EventEmitter<LogItem> = new EventEmitter<LogItem>();
  @Output() deleteLogEvent: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line:no-inferrable-types
  public filter: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public deleteModal: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  public editModal: boolean = false;
  public server: boolean;

  constructor(private brokerService: BrokerService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.server = isPlatformServer(this.platformId)
  }

  ngOnInit(): void {
    this.filterText.subscribe((filter) => {
      this.filter = filter;
      this.setHtmlText();
    });
  }

  ngAfterViewInit(): void {
    this.setHtmlText(50);
  }

  private newlineTransform(value: string): string {
    if (typeof(value) !== 'undefined' && value !== null) {
      return value.replace(new RegExp('\n', 'g'), '<br />');
    }
    return value;
  }

  private filterTransform(text: string, search: string): string {
    try {
      if (typeof(search) !== 'undefined' && search !== null) {
        const pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        /* pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
        }).join('|'); */
        const regex = new RegExp(pattern, 'gi');

        return search ? text.replace(regex, (match) => `<mark>${match}</mark>`) : text;
      }
    } catch (err) {}
    return search;
  }

  private setHtmlText(timeout: number = 0): void {
    const where = this.filterTransform(this.logItem.where, this.filter);
    const what = this.filterTransform(this.logItem.what, this.filter);
    const why = this.filterTransform(this.logItem.why, this.filter);
    const how = this.filterTransform(this.logItem.how, this.filter);
    const withWhat = this.filterTransform(this.logItem.with, this.filter);
    const result = this.filterTransform(this.newlineTransform(this.logItem.result), this.filter);

    this.brokerService.setText({
      'i': this.i,
      'where': where,
      'what': what,
      'why': why,
      'how': how,
      'with': withWhat,
      'result': result,
      'timeout': timeout
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
