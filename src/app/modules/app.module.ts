import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';

import { StoreModule } from '@ngrx/store';
// import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MainModule } from './../components/main/main.module';

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

@NgModule({
  imports: [
    CommonModule,

    MainModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    process.env.NODE_ENV === 'development' ?
      StoreDevtoolsModule.instrument({ maxAge: 50 }) :
      []
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: provideErrorHandler
    }
  ]
})
export class AppModule {}
