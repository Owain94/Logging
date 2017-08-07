import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';

@Component({
  selector: 'app-log-categories',
  templateUrl: './log.categories.component.pug',
  styleUrls: ['./log.categories.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogCategoriesComponent {

  @Input() set allCategories(value: Array<{ 'category': string,  'entries': number}>) {
    this._allCategories = value;
    if (this._allCategories.length > 0 && this.selectedCategory === -1) {
      this.selectCategory(0);
    }
  }

  @Output() changeCategoryEvent: EventEmitter<string> = new EventEmitter<string>();

  public _allCategories: Array<{ 'category': string,  'entries': number}> = [];
  // tslint:disable-next-line:no-inferrable-types
  public selectedCategory: number = -1;

  // tslint:disable-next-line:no-inferrable-types
  public countFrom: number = 0;

  public selectCategory(category: number): void {
    this.selectedCategory = category;
    this.changeCategoryEvent.emit(this._allCategories[category].category);
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }
}
