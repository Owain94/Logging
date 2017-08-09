import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClientMessageBrokerFactory, ClientMessageBroker } from '@angular/platform-webworker';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

export class ClientMessageBrokerFactoryStub {
  createMessageBroker: (channel: string, runInZone?: boolean) => ClientMessageBroker;
}

@NgModule({
  imports: [
    NoopAnimationsModule,
    BrowserModule.withServerTransition({
        appId: 'logging'
    }),
    ServerModule,
    AppModule
  ],
  providers: [
    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactoryStub }
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppServerModule { }
