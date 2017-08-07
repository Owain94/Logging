import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CountoDirective } from './counto.directive';

@Component({
  selector: 'app-test-component',
  template: '<div appCountoDirective></div>'
})
class TestComponent {}

describe('CountoDirective', () => {
  let countoDirective: CountoDirective;
  let testComponentFixture: DebugElement;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CountoDirective
      ],
    });
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestComponent);
    testComponentFixture = testFixture.debugElement.query(By.directive(CountoDirective));
    countoDirective = testComponentFixture.injector.get(CountoDirective);
  });

  it('should create the test component', () => {
    expect(testFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should count up', ((done: any) => {
    let i = 0;

    countoDirective.countoChange.subscribe(
      (res: any) => {
        if (i === 0 || res === 1) {
          expect(res).toEqual(0);
        } else if (i === 2) {
          expect(res).toEqual(1000);
          done()
        }
        i++;
      }
    );

    countoDirective.countFrom = '0';
    countoDirective.countTo = '1000';
    countoDirective.step = '1000';
    countoDirective.duration = '1';
  }));

  it('should count down', ((done: any) => {
    let i = 0;

    countoDirective.countoChange.subscribe(
      (res: any) => {
        if (i === 0 || res === 1) {
          expect(res).toEqual(1000);
        } else if (i === 2) {
          expect(res).toEqual(0);
          done()
        }
        i++;
      }
    );

    countoDirective.countFrom = '1000';
    countoDirective.countTo = '0';
    countoDirective.step = '1000';
    countoDirective.duration = '1';
  }));

});
