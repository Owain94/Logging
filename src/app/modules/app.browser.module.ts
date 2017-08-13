import { NgModule, APP_ID } from '@angular/core';
import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

@NgModule({
  imports: [
    WorkerAppModule,
    AppModule
  ],
  providers: [
    WORKER_APP_LOCATION_PROVIDERS,
    { provide: APP_ID, useValue: 'logging' }
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppBrowserModule {}
