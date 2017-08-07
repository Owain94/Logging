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

  @Input() set allCategories(value: Array<string>) {
    this._allCategories = value;
    if (this._allCategories.length > 0 && this.selectedCategory === '') {
      this.selectCategory(this._allCategories[0]);
    }
  }

  @Output() changeCategoryEvent: EventEmitter<string> = new EventEmitter<string>();

  public _allCategories: Array<string> = [];
  // tslint:disable-next-line:no-inferrable-types
  public selectedCategory: string = '';

  public selectCategory(category: string): void {
    this.selectedCategory = category;
    this.changeCategoryEvent.emit(category);
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }
}
