import { CasesComponent } from './../components/cases/cases.component';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing/routing.module';
import { TransferHttpModule } from './transfer-http/transfer-http.module';

import { MainComponent } from '../components/main/main.component';
import { HeaderComponent } from './../components/main/header/header.component';
import { MenuComponent } from './../components/main/menu/menu.component';
import { FooterComponent } from './../components/main/footer/footer.component';
import { HomeComponent } from './../components/home/home.component';
import { NotFoundComponent } from './../components/notfound/notfound.component';

import * as Raven from 'raven-js';

Raven
  .config('https://03d884b718be42638de950df2a94a5d3@sentry.io/189340')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError);
  }
}

export function provideErrorHandler() {
  if (process.env.NODE_ENV === 'production') {
    return new RavenErrorHandler();
  } else {
    return new ErrorHandler();
  }
}

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    CasesComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    RoutingModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: provideErrorHandler
    }
  ],
  exports: [
    MainComponent
  ]
})
export class AppModule {}
