import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-export',
  templateUrl: './log.export.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogExportComponent {

  @Input() categorizedLogs: Object;
  @Input() categories: Array<string>;

  constructor() { }

  public exportAsExcelFile(): void {
    const allLogs = this.categorizedLogs;

    const allLogsJson = {};

    for (const cat in this.categories) {
      if (this.categories.hasOwnProperty(cat)) {

        const charCount = {
          'who': 4,
          'where': 6,
          'when': 21,
          'what': 5,
          'why': 4,
          'how': 4,
          'with': 5
        };

        for (const obj in allLogs[this.categories[cat]]) {
          if (allLogs[this.categories[cat]].hasOwnProperty(obj)) {
            delete allLogs[this.categories[cat]][obj]['__v'];
            delete allLogs[this.categories[cat]][obj]['_id'];
            delete allLogs[this.categories[cat]][obj]['$$index'];
            delete allLogs[this.categories[cat]][obj]['case'];
            delete allLogs[this.categories[cat]][obj]['error'];

            charCount.who = allLogs[this.categories[cat]][obj]['who'].length;

            const whereLength = allLogs[this.categories[cat]][obj]['where'].length
            if (whereLength > charCount.where) {
              charCount.where = allLogs[this.categories[cat]][obj]['where'].length;
            }

            const whatLength = allLogs[this.categories[cat]][obj]['what'].length
            if (whatLength > charCount.what) {
              charCount.what = allLogs[this.categories[cat]][obj]['what'].length;
            }

            const whyLength = allLogs[this.categories[cat]][obj]['why'].length
            if (whyLength > charCount.why) {
              charCount.why = allLogs[this.categories[cat]][obj]['why'].length;
            }

            const howLength = allLogs[this.categories[cat]][obj]['how'].length
            if (howLength > charCount.how) {
              charCount.how = allLogs[this.categories[cat]][obj]['how'].length;
            }

            const withLength = allLogs[this.categories[cat]][obj]['with'].length
            if (withLength > charCount.with) {
              charCount.with = allLogs[this.categories[cat]][obj]['with'].length;
            }
          }
        }

        allLogs[this.categories[cat]].unshift(
          {
            who: '',
            where: '',
            when: '',
            what: '',
            why: '',
            how: '',
            with: '',
            result: ''
          }
        );

        allLogsJson[this.categories[cat]] = XLSX.utils.json_to_sheet(
          allLogs[this.categories[cat]]
        );
        allLogsJson[this.categories[cat]]['!cols'] = [
          {wch: charCount.who},
          {wch: charCount.where},
          {wch: charCount.when},
          {wch: charCount.what},
          {wch: charCount.why},
          {wch: charCount.how},
          {wch: charCount.with},
          {wch: 75}
        ];
      }
    }

    const workbook: XLSX.WorkBook = { Sheets: allLogsJson, SheetNames: this.categories };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'test');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().toLocaleString().replace(', ', '-')}.xlsx`);
  }

}
