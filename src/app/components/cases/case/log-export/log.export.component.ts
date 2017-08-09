import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';

import { LocaleDatePipe } from './../../../../pipes/locale.date.pipe';

import { BrokerService } from '../../../../services/broker.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-export',
  templateUrl: './log.export.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogExportComponent {

  @Input() caseName: string;
  @Input() categorizedLogs: Object;
  @Input() categories: Array<{ 'category': string, 'entries': number }>;

  constructor(private brokerService: BrokerService) {}

  public export() {
    const localeDate = new LocaleDatePipe();
    const categories = [];
    const allLogsJson = {};

    for (const cat in this.categories) {
      if (this.categories.hasOwnProperty(cat)) {
        categories.push(this.categories[cat].category);
      }
    }

    for (const cat in categories) {
      if (categories.hasOwnProperty(cat)) {

        const charCount = {
          'who': 4,
          'where': 6,
          'when': 21,
          'what': 5,
          'why': 4,
          'how': 4,
          'with': 5
        };

        for (const obj in this.categorizedLogs[categories[cat]]) {
          if (this.categorizedLogs[categories[cat]].hasOwnProperty(obj)) {
            delete this.categorizedLogs[categories[cat]][obj]['__v'];
            delete this.categorizedLogs[categories[cat]][obj]['_id'];
            delete this.categorizedLogs[categories[cat]][obj]['$$index'];
            delete this.categorizedLogs[categories[cat]][obj]['case'];
            delete this.categorizedLogs[categories[cat]][obj]['error'];

            const date = this.categorizedLogs[categories[cat]][obj]['when'];
            this.categorizedLogs[categories[cat]][obj]['when'] = localeDate.transform(date);

            charCount.who = this.categorizedLogs[categories[cat]][obj]['who'].length;

            const whereLength = this.categorizedLogs[categories[cat]][obj]['where'].length;
            if (whereLength > charCount.where) {
              charCount.where = this.categorizedLogs[categories[cat]][obj]['where'].length;
            }

            const whatLength = this.categorizedLogs[categories[cat]][obj]['what'].length;
            if (whatLength > charCount.what) {
              charCount.what = this.categorizedLogs[categories[cat]][obj]['what'].length;
            }

            const whyLength = this.categorizedLogs[categories[cat]][obj]['why'].length;
            if (whyLength > charCount.why) {
              charCount.why = this.categorizedLogs[categories[cat]][obj]['why'].length;
            }

            const howLength = this.categorizedLogs[categories[cat]][obj]['how'].length;
            if (howLength > charCount.how) {
              charCount.how = this.categorizedLogs[categories[cat]][obj]['how'].length;
            }

            const withLength = this.categorizedLogs[categories[cat]][obj]['with'].length;
            if (withLength > charCount.with) {
              charCount.with = this.categorizedLogs[categories[cat]][obj]['with'].length;
            }
          }
        }

        this.categorizedLogs[categories[cat]].unshift(
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

        allLogsJson[categories[cat]] = XLSX.utils.json_to_sheet(
          this.categorizedLogs[categories[cat]]
        );
        allLogsJson[categories[cat]]['!cols'] = [
          { wch: charCount.who },
          { wch: charCount.where },
          { wch: charCount.when },
          { wch: charCount.what },
          { wch: charCount.why },
          { wch: charCount.how },
          { wch: charCount.with },
          { wch: 75 }
        ];
      }
    }

    const workbook = { Sheets: allLogsJson, SheetNames: categories };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'buffer' });

    this.brokerService.publishData([excelBuffer, this.caseName]);
  }
}
