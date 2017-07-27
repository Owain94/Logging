import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdDialogModule } from '@angular/material';

import { StoreModule, ActionsSubject, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppActionsSubject } from '../../store/app.action.subject';
import { AppActions } from '../../store/app.actions';

import { HeaderModule } from './../main/header/header.module';
import { NotificationModule } from './../notifications/notifications.module';
import { CapitalizePipeModule } from './../../pipes/capitalize.pipe.module';

import { logger } from '../../store/reducers/logging.reducer';
import { caseReducer } from '../../store/reducers/case.reducer';

import { CaseEffects } from '../../store/effects/case.effects';

import { CasesComponent } from './cases.component';
import { CaseRowComponent } from './case-row/case.row.component';
import { CaseDeleteDialogComponent } from './case-delete-dialog/case.delete.dialog.component';

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
          component: CasesComponent,
          pathMatch: 'full'
        },
        {
          path: 'case/:id',
          loadChildren: './case/case.module#CaseModule'
        }
      ]
    ),
    HttpModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdDialogModule,

    StoreModule.forFeature('logging',
      {
        cases: caseReducer
      },
      {
        metaReducers
      }
    ),
    EffectsModule.forFeature([
      CaseEffects
    ]),

    HeaderModule,
    NotificationModule,
    CapitalizePipeModule
  ],
  declarations: [
    CasesComponent,
    CaseRowComponent,
    CaseDeleteDialogComponent,
  ],
  entryComponents: [
    CaseDeleteDialogComponent
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
export class CasesModule {}
