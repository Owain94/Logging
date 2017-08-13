import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, APP_ID } from '@angular/core';
import { ClientMessageBrokerFactory, UiArguments, FnArg, PRIMITIVE, ClientMessageBroker } from '@angular/platform-webworker';
import { isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Log } from '../../decorators/log.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';

import { BrokerService } from '../../services/broker.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.pug',
  styleUrls: ['./main.component.styl']
})
@Log()
@AutoUnsubscribe()
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  private uiBroker: ClientMessageBroker;
  private exportBroker: ClientMessageBroker;
  private notificationBroker: ClientMessageBroker;

  private routerEventsSubscription: Subscription;

  constructor(private router: Router,
              private brokerService: BrokerService,
              private clientMessageBrokerFactory: ClientMessageBrokerFactory,
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {}

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe(path => {
      if (path instanceof NavigationEnd) {
        this.brokerService.scrollTo(0, 0, 'instant');
      }
    });

    if (!isPlatformServer(this.platformId)) {
      this.uiBroker = this.clientMessageBrokerFactory.createMessageBroker('UI_CHANNEL', false);
      this.exportBroker = this.clientMessageBrokerFactory.createMessageBroker('EXPORT_CHANNEL', false);
      this.notificationBroker = this.clientMessageBrokerFactory.createMessageBroker('NOTIFICATION_CHANNEL', false);

      this.brokerService.scroll.subscribe(
        (data) => this.scrollTo(data)
      );

      this.brokerService.exportData.subscribe(
        (data) => this.saveAsExcelFile(data)
      );

      this.brokerService.notification.subscribe(
        (data) => this.notification(data)
      );

      this.brokerService.confirm.subscribe(
        (data) => this.confirm(data)
      );
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformServer(this.platformId)) {
      this.afterBoootstrap();
    }
  }

  ngOnDestroy(): void {
    // pass
  }

  public afterBoootstrap(): void {
    const bootstrapBroker = this.clientMessageBrokerFactory.createMessageBroker('BOOTSTRAP_CHANNEL', false);

    const args = new UiArguments('init');
    args.method = 'init';
    const fnArg = new FnArg(this.appId, PRIMITIVE);
    fnArg.value = this.appId;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    bootstrapBroker.runOnService(args, PRIMITIVE);
  }

  public scrollTo(data: [number, number, ScrollBehavior]): void {
    const args = new UiArguments('scroll');
    args.method = 'scroll';
    const fnArg = new FnArg(data, PRIMITIVE);
    fnArg.value = data;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    this.uiBroker.runOnService(args, PRIMITIVE);
  }

  private saveAsExcelFile(data: [any, string]): void {
    const args = new UiArguments('export');
    args.method = 'export';
    const fnArg = new FnArg(data, PRIMITIVE);
    fnArg.value = data;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    this.exportBroker.runOnService(args, PRIMITIVE);
  }

  private notification(data: {type: string, title: string, content: string}): void {
    const args = new UiArguments('notification');
    args.method = 'notification';
    const fnArg = new FnArg(data, PRIMITIVE);
    fnArg.value = data;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    this.notificationBroker.runOnService(args, PRIMITIVE);
  }

  private confirm(data: {title: string, content: string}): void {
    const args = new UiArguments('confirm');
    args.method = 'confirm';
    const fnArg = new FnArg(data, PRIMITIVE);
    fnArg.value = data;
    fnArg.type = PRIMITIVE;
    args.args = [fnArg];

    this.notificationBroker.runOnService(args, PRIMITIVE).then(
      (res: boolean) => {
        this.brokerService.confirmReturnValue(res);
      }
    );
  }
}
