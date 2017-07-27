import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderModule } from './../main/header/header.module';
import { NotificationModule } from './../notifications/notifications.module';

import { StoreModule, ActionsSubject, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppActionsSubject } from '../../store/app.action.subject';
import { AppActions } from '../../store/app.actions';

import { logger } from '../../store/reducers/logging.reducer';
import { caseReducer } from '../../store/reducers/case.reducer';
import { settingsReducer } from '../../store/reducers/settings.reducer';

import { CaseEffects } from '../../store/effects/case.effects';
import { SettingsEffects } from '../../store/effects/settings.effects';

import { SettingsComponent } from './settings.component';

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
          component: SettingsComponent,
          pathMatch: 'full'
        }
      ]
    ),
    HttpModule,
    ReactiveFormsModule,

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

    HeaderModule,
    NotificationModule
  ],
  declarations: [
    SettingsComponent
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
export class SettingsModule {}
