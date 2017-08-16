import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { LogCategoriesComponent } from './log.categories.component';
import { CountoDirective } from '../../../../directives/counto.directive';

describe('LogCategoriesComponent', () => {
  let logCategoriesComponent: LogCategoriesComponent;
  let logCategoriesFixture: ComponentFixture<LogCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogCategoriesComponent,
        CountoDirective
      ],
    });
  }));

  beforeEach(() => {
    logCategoriesFixture = TestBed.createComponent(LogCategoriesComponent);
    logCategoriesComponent = logCategoriesFixture.componentInstance;

    logCategoriesComponent.allCategories = [
      {
        'category': 'All',
        'entries': 2
      }, {
        'category': 'Test',
        'entries': 1
      }, {
        'category': 'Testing',
        'entries': 1
      }
    ];
  });

  it('should create the log category component', () => {
    expect(logCategoriesFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('initial category should be set', () => {
    expect(logCategoriesComponent.selectedCategory).toEqual(0);
  });

  it('initial category shouldn\'t be set when there are no categories', () => {
    logCategoriesComponent.allCategories = [];
    expect(logCategoriesComponent.selectedCategory).toEqual(0);
  });

  it('changing the category should emit', (done: any) => {
    logCategoriesComponent.changeCategoryEvent.subscribe(
      (res: string) => {
        expect(res).toEqual('All');
        done();
      }
    );

    logCategoriesComponent.selectCategory(0);
  });

  it('trackByFn should simply return the input', () => {
    expect(logCategoriesComponent.trackByFn(0, 'all')).toEqual(0);
    expect(logCategoriesComponent.trackByFn(1, 'test')).toEqual(1);
    expect(logCategoriesComponent.trackByFn(2, 'testing')).toEqual(2);
  });
});
