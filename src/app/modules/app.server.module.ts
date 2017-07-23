import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
        appId: 'logging'
    }),
    ServerModule,
    AppModule
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppServerModule { }
