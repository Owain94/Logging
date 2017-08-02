import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
    });
  }));

  beforeEach(() => {
    headerFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerFixture.componentInstance;
  });

  it('should create the header', () => {
    expect(headerComponent).toBeTruthy();
  });

  it('should have empty inputs', () => {
    expect(headerComponent.headerHeading).toBeUndefined();
    expect(headerComponent.headerButton).toBeUndefined();
  });

  it('should set the heading and subheading', () => {
    headerComponent.headerHeading = ['Test', 'Test'];
    const heading = headerFixture.debugElement.query(By.css('h1'));
    const subheading = headerFixture.debugElement.query(By.css('.subheading'));

    expect(heading.nativeElement.textContent).toEqual('');
    expect(subheading.nativeElement.textContent).toEqual('');

    headerFixture.detectChanges();

    expect(heading.nativeElement.textContent).toEqual('Test');
    expect(subheading.nativeElement.textContent).toEqual('Test');
  });

  it('should set the header button', () => {
    headerComponent.headerHeading = ['Test', 'Test'];
    headerComponent.headerButton = ['Test', 'Test'];

    expect(headerFixture.debugElement.query(By.css('.button'))).toBeNull();

    headerFixture.detectChanges();

    expect(headerFixture.debugElement.query(By.css('.button')).nativeElement.textContent).toEqual('Test');
  });
});
