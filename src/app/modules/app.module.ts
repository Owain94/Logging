import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule } from '@angular/material';

import { StoreModule, ActionReducerMap, ActionReducer } from '@ngrx/store';
// import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RoutingModule } from './routing/routing.module';
import { TransferHttpModule } from './transfer-http/transfer-http.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { logger } from '../store/reducers/logging.reducer';
import { caseReducer } from '../store/reducers/case.reducer';
import { settingsReducer } from '../store/reducers/settings.reducer';
import { logReducer } from '../store/reducers/log.reducer';

import { CaseEffects } from '../store/effects/case.effects';
import { SettingsEffects } from '../store/effects/settings.effects';
import { LogEffects } from '../store/effects/log.effects';

import { CaseComponent } from '../components/cases/case/case.component';
import { MainComponent } from '../components/main/main.component';
import { HeaderComponent } from '../components/main/header/header.component';
import { MenuComponent } from '../components/main/menu/menu.component';
import { FooterComponent } from '../components/main/footer/footer.component';
import { HomeComponent } from '../components/home/home.component';
import { CasesComponent } from '../components/cases/cases.component';
import { CaseRowComponent } from '../components/cases/case-row/case.row.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { NotFoundComponent } from '../components/notfound/notfound.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { NotificationComponent } from '../components/notifications/notification/notification.component';
import { CaseDeleteDialogComponent } from '../components/cases/case-delete-dialog/case.delete.dialog.component';

import { CapitalizePipe } from '../pipes/capitalize.pipe';

import { NotificationsService } from '../services/notifications.service';
import { CaseService } from '../services/case.service';
import { SettingsService } from '../services/settings.service';
import { LogService } from '../services/log.service';

import * as Raven from 'raven-js';

// Raven
//   .config('https://03d884b718be42638de950df2a94a5d3@sentry.io/189340')
//   .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError);
  }
}

export function provideErrorHandler() {
  // if (process.env.NODE_ENV === 'production') {
  //   return new RavenErrorHandler();
  // } else {
    return new ErrorHandler();
  // }
}

const reducers: ActionReducerMap<any> = {
  cases: caseReducer,
  settings: settingsReducer,
  log: logReducer
};

const metaReducers: ActionReducer<any, any>[] = process.env.NODE_ENV === 'development' ?
  [logger] : [];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    CasesComponent,
    CaseRowComponent,
    CaseComponent,
    SettingsComponent,
    NotFoundComponent,
    CaseDeleteDialogComponent,
    NotificationComponent,
    NotificationsComponent,
    CapitalizePipe
  ],
  entryComponents: [
    CaseDeleteDialogComponent
  ],
  imports: [
    MdButtonModule,
    MdDialogModule,

    NgxDatatableModule,

    CommonModule,
    HttpModule,
    TransferHttpModule,
    ReactiveFormsModule,
    RoutingModule,

    StoreModule.forRoot(
      reducers, { metaReducers }
    ),
    // StoreRouterConnectingModule,
    EffectsModule.forRoot([
      CaseEffects,
      SettingsEffects,
      LogEffects
    ]),
    process.env.NODE_ENV === 'development' ?
      StoreDevtoolsModule.instrument({ maxAge: 50 }) :
      []
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: provideErrorHandler
    },
    CaseService,
    SettingsService,
    LogService,

    NotificationsService
  ],
  exports: [
    MainComponent
  ]
})
export class AppModule {}
