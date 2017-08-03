import { StoreModule } from '@ngrx/store';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { settingsReducer } from '../../store/reducers/settings.reducer';

import { HeaderComponent } from '../main/header/header.component';
import { HomeComponent } from './home.component';

describe('FooterComponent', () => {
  let homeComponent: HomeComponent;
  let homeFixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(
          {
            settings: settingsReducer
          }
        )
      ],
      declarations: [
        HeaderComponent,
        HomeComponent
      ],
    });
  }));

  beforeEach(() => {
    homeFixture = TestBed.createComponent(HomeComponent);
    homeComponent = homeFixture.componentInstance;
  });

  it('should create the home component', () => {
    expect(homeFixture.debugElement.componentInstance).toBeTruthy();
  });
});
