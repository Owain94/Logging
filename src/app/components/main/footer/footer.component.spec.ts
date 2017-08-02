import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let footerComponent: FooterComponent;
  let footerFixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
    });
  }));

  beforeEach(() => {
    footerFixture = TestBed.createComponent(FooterComponent);
    footerComponent = footerFixture.componentInstance;
  });

  it('should create the footer', () => {
    expect(footerFixture.debugElement.componentInstance).toBeTruthy();
  });
});
