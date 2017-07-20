import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule } from '@angular/material';

import { compose } from '@ngrx/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RoutingModule } from './routing/routing.module';
import { TransferHttpModule } from './transfer-http/transfer-http.module';

import { logger } from '../store/reducers/logging.reducer';
import { caseReducer } from '../store/reducers/case.reducer';
import { settingsReducer } from '../store/reducers/settings.reducer';
import { logReducer } from '../store/reducers/log.reducer';

import { CaseActions } from '../store/actions/case.actions';
import { SettingsActions } from '../store/actions/settings.actions';
import { LogActions } from './../store/actions/log.actions';

import { CaseEffects } from '../store/effects/case.effects';
import { SettingsEffects } from '../store/effects/settings.effects';
import { LogEffects } from './../store/effects/log.effects';

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
import { LogService } from './../services/log.service';

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

const reducers = {
  router: routerReducer,
  cases: caseReducer,
  settings: settingsReducer,
  log: logReducer
};

const developmentReducer = compose(logger, combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (process.env.NODE_ENV === 'production') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

const modules = [
  MdButtonModule,
  MdDialogModule,

  CommonModule,
  HttpModule,
  TransferHttpModule,
  ReactiveFormsModule,
  RoutingModule,

  StoreModule.provideStore(
    reducer
  ),
  RouterStoreModule.connectRouter(),
  EffectsModule.run(CaseEffects),
  EffectsModule.run(SettingsEffects),
  EffectsModule.run(LogEffects)
];

if (process.env.NODE_ENV === 'development') {
  modules.push(
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  );
}

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
    ...modules
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: provideErrorHandler
    },
    CaseActions,
    SettingsActions,
    LogActions,
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
