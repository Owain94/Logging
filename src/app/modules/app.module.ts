import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule, ActionReducerMap, ActionReducer, ActionsSubject } from '@ngrx/store';
// import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RoutingModule } from './routing/routing.module';

import { AppActionsSubject } from '../store/app.action.subject';
import { AppActions } from '../store/app.actions';

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
import { AddCaseComponent } from '../components/cases/add-case/add.case.component';
import { CaseRowComponent } from '../components/cases/case-row/case.row.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { NotFoundComponent } from '../components/notfound/notfound.component';
import { LogExportComponent } from '../components/cases/case/log-export/log.export.component';
import { LogAddComponent } from '../components/cases/case/log-add/log.add.component';
import { LogDataComponent } from '../components/cases/case/log-data/log.data.component';
import { LogDataRowComponent } from '../components/cases/case/log-data/log-data-row/log.data.row.component';
import { LogCategoriesComponent } from '../components/cases/case/log-categories/log.categories.component';

import { NewlinePipe } from '../pipes/newline.pipe';
import { LocaleDatePipe } from '../pipes/locale.date.pipe';
import { HighlightPipe } from '../pipes/highlight.pipe';

import { CountoDirective } from './../directives/counto.directive';

import { CaseService } from '../services/case.service';
import { SettingsService } from '../services/settings.service';
import { LogService } from '../services/log.service';
import { BrokerService } from '../services/broker.service';

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
    AddCaseComponent,
    CaseRowComponent,
    CaseComponent,
    SettingsComponent,
    NotFoundComponent,
    LogExportComponent,
    LogAddComponent,
    LogDataComponent,
    LogDataRowComponent,
    LogCategoriesComponent,
    NewlinePipe,
    LocaleDatePipe,
    HighlightPipe,
    CountoDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: ActionsSubject,
      useClass: AppActionsSubject
    },
    AppActions,
    CaseService,
    SettingsService,
    LogService,
    BrokerService
  ],
  exports: [
    MainComponent
  ]
})
export class AppModule {}
