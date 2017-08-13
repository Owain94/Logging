import { NgModule, APP_BOOTSTRAP_LISTENER, APP_ID } from '@angular/core';
import { ɵTRANSITION_ID } from '@angular/platform-browser';
import {
  WorkerAppModule,
  WORKER_APP_LOCATION_PROVIDERS,
  ClientMessageBrokerFactory,
  UiArguments,
  FnArg,
  PRIMITIVE
} from '@angular/platform-webworker';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

export function removeStyleTags(clientMessageBrokerFactory: ClientMessageBrokerFactory): Function {
  return () => {
    const uiBroker = clientMessageBrokerFactory.createMessageBroker('BOOTSTRAP_CHANNEL', false);

    const args = new UiArguments('init');
    args.method = 'init';
    const fnArg = new FnArg(true, PRIMITIVE);
    fnArg.value = true;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    uiBroker.runOnService(args, PRIMITIVE);
  };
}

@NgModule({
  imports: [
    WorkerAppModule,
    AppModule
  ],
  providers: [
    WORKER_APP_LOCATION_PROVIDERS,
    { provide: APP_ID, useValue: 'logging' },
    { provide: ɵTRANSITION_ID, useExisting: APP_ID },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: removeStyleTags,
      deps: [ ClientMessageBrokerFactory ],
      multi: true
    }
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppBrowserModule {}
