import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { LogCategoriesComponent } from './log.categories.component';

describe('LogCategoriesComponent', () => {
  let logCategoriesComponent: LogCategoriesComponent;
  let logCategoriesFixture: ComponentFixture<LogCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogCategoriesComponent
      ],
    });
  }));

  beforeEach(() => {
    logCategoriesFixture = TestBed.createComponent(LogCategoriesComponent);
    logCategoriesComponent = logCategoriesFixture.componentInstance;

    logCategoriesComponent.allCategories = ['all', 'test', 'testing'];
  });

  it('should create the log category component', () => {
    expect(logCategoriesFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('initial category should be empty', () => {
    expect(logCategoriesComponent.selectedCategory).toEqual('');
  });

  it('changing the category should emit', (done: any) => {
    logCategoriesComponent.changeCategoryEvent.subscribe(
      (res: string) => {
        expect(res).toEqual('all');
        done();
      }
    );

    logCategoriesComponent.selectCategory('all');
  });

  it('trackByFn should simply return the input', () => {
    expect(logCategoriesComponent.trackByFn(0, 'all')).toEqual(0);
    expect(logCategoriesComponent.trackByFn(1, 'test')).toEqual(1);
    expect(logCategoriesComponent.trackByFn(2, 'testing')).toEqual(2);
  });
});
