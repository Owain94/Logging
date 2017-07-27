import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdDialogModule } from '@angular/material';

import { StoreModule, ActionsSubject, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppActionsSubject } from '../../../store/app.action.subject';
import { AppActions } from '../../../store/app.actions';

import { NgxDatatableModule } from '@swimlane/ngx-datatable/release';

import { HeaderModule } from '../../main/header/header.module';
import { NotificationModule } from '../../notifications/notifications.module';
import { CapitalizePipeModule } from '../../../pipes/capitalize.pipe.module';

import { logger } from '../../../store/reducers/logging.reducer';
import { caseReducer } from '../../../store/reducers/case.reducer';
import { settingsReducer } from '../../../store/reducers/settings.reducer';
import { logReducer } from '../../../store/reducers/log.reducer';

import { CaseEffects } from '../../../store/effects/case.effects';
import { SettingsEffects } from '../../../store/effects/settings.effects';
import { LogEffects } from '../../../store/effects/log.effects';

import { CaseComponent } from './case.component';
import { LogDeleteDialogComponent } from './log-delete-dialog/log.delete.dialog.component';
import { LogEditDialogComponent } from './log-edit-dialog/log.edit.dialog.component';
import { LogExportComponent } from './log-export/log.export.component';
import { LogAddComponent } from './log-add/log.add.component';
import { LogDataComponent } from './log-data/log.data.component';
import { LogCategoriesComponent } from './log-categories/log.categories.component';

import { CaseService } from '../../../services/case.service';
import { SettingsService } from '../../../services/settings.service';
import { LogService } from '../../../services/log.service';
import { WebworkerService } from '../../../services/webworker.service';

const metaReducers: ActionReducer<any, any>[] = process.env.NODE_ENV === 'development' ?
  [logger] : [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: CaseComponent,
          pathMatch: 'full'
        }
      ]
    ),
    HttpModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdDialogModule,

    NgxDatatableModule,

    StoreModule.forFeature('logging',
      {
        cases: caseReducer,
        settings: settingsReducer,
        log: logReducer
      },
      {
        metaReducers
      }
    ),
    EffectsModule.forFeature([
      CaseEffects,
      SettingsEffects,
      LogEffects
    ]),

    HeaderModule,
    NotificationModule,
    CapitalizePipeModule
  ],
  declarations: [
    CaseComponent,
    LogDeleteDialogComponent,
    LogEditDialogComponent,
    LogExportComponent,
    LogAddComponent,
    LogDataComponent,
    LogCategoriesComponent,
  ],
  entryComponents: [
    LogDeleteDialogComponent,
    LogEditDialogComponent
  ],
  providers: [
    {
      provide: ActionsSubject,
      useClass: AppActionsSubject
    },
    AppActions,
    CaseService,
    SettingsService,
    LogService,

    WebworkerService
  ]
})
export class CaseModule {}
