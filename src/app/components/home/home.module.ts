import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule, ActionsSubject, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppActionsSubject } from '../../store/app.action.subject';
import { AppActions } from '../../store/app.actions';

import { HeaderModule } from '../main/header/header.module';

import { logger } from '../../store/reducers/logging.reducer';
import { caseReducer } from '../../store/reducers/case.reducer';
import { settingsReducer } from '../../store/reducers/settings.reducer';

import { CaseEffects } from '../../store/effects/case.effects';
import { SettingsEffects } from '../../store/effects/settings.effects';

import { HomeComponent } from './home.component';

import { CaseService } from '../../services/case.service';
import { SettingsService } from '../../services/settings.service';

const metaReducers: ActionReducer<any, any>[] = process.env.NODE_ENV === 'development' ?
  [logger] : [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: HomeComponent,
          pathMatch: 'full'
        }
      ]
    ),
    HttpClientModule,

    StoreModule.forFeature('logging',
      {
        cases: caseReducer,
        settings: settingsReducer
      },
      {
        metaReducers
      }
    ),
    EffectsModule.forFeature([
      CaseEffects,
      SettingsEffects
    ]),

    HeaderModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    {
      provide: ActionsSubject,
      useClass: AppActionsSubject
    },
    AppActions,
    CaseService,
    SettingsService
  ]
})
export class HomeModule {}
