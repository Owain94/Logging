import { NgModule } from '@angular/core';
import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

@NgModule({
  imports: [
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
