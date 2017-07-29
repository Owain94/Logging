import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Log } from '../../../../decorators/log.decorator';

@Component({
  selector: 'app-log-categories',
  templateUrl: './log.categories.component.pug',
  styleUrls: ['./log.categories.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogCategoriesComponent implements OnChanges {

  @Input() allCategories: Array<string> = [];

  @Output() changeCategoryEvent: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line:no-inferrable-types
  public selectedCategory: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.allCategories.length > 0 && this.selectedCategory === '') {
      this.selectCategory(this.allCategories[0]);
    }
  }

  public selectCategory(category: string): void {
    this.selectedCategory = category;
    this.changeCategoryEvent.emit(category);
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }
}
