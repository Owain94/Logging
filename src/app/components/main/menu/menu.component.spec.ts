import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('NotFoundComponent', () => {
  let menuComponent: MenuComponent;
  let menuFixture: ComponentFixture<MenuComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
    });
  }));

  beforeEach(() => {
    menuFixture = TestBed.createComponent(MenuComponent);
    menuComponent = menuFixture.componentInstance;
  });

  it('should create the menu', () => {
    expect(menuFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should have the correct initial state', () => {
    expect(menuComponent.collapsed).toBeTruthy();
    expect(menuComponent.url).toBe('/');
  });

  it('should handle navbar click', () => {
    expect(menuComponent.collapsed).toBeTruthy();
    expect(menuComponent.url).toBe('/');

    menuComponent.navBarClick();

    expect(menuComponent.collapsed).toBeFalsy();
  });

  it('should handle forced navbar click', () => {
    expect(menuComponent.collapsed).toBeTruthy();
    expect(menuComponent.url).toBe('/');

    menuComponent.navBarClick(true);

    expect(menuComponent.collapsed).toBeTruthy();
  });
});
