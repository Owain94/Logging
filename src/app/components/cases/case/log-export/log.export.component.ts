import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-log-export',
  templateUrl: './log.export.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogExportComponent {

  @Input() caseName: string;
  @Input() categorizedLogs: Object;
  @Input() categories: Array<Object>;

  constructor() { }

  public export() {
    if (process.env.NODE_PLATFORM === 'client') {
      const webworker = require('worker-loader?name=export.worker.[hash].js!./export.worker.js');
      const worker: Worker = new webworker();
      worker.postMessage({
        categories: this.categories,
        categorizedLogs: this.categorizedLogs
      });
      worker.onmessage = (event: any) => {
        this.saveAsExcelFile(event.data.excelBuffer, this.caseName);
        worker.terminate();
      }
    }
  }

  private saveAsExcelFile(excelBuffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const data: Blob = new Blob([excelBuffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data,
      `${fileName}_logs_export_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.xlsx`
    );
  }
}
