import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './../main/header/header.component';
import { NotFoundComponent } from './notfound.component';

describe('NotFoundComponent', () => {
  let notFoundComponent: NotFoundComponent;
  let notFoundFixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent,
        NotFoundComponent
      ],
    });
  }));

  beforeEach(() => {
    notFoundFixture = TestBed.createComponent(NotFoundComponent);
    notFoundComponent = notFoundFixture.componentInstance;
  });

  it('should create the 404 component', () => {
    expect(notFoundFixture.debugElement.componentInstance).toBeTruthy();
  });
});
