import { NgModule } from '@angular/core';
import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    WorkerAppModule,
    AppModule
  ],
  providers: [
    WORKER_APP_LOCATION_PROVIDERS
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppBrowserModule {}
