import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, APP_ID, HostListener } from '@angular/core';
import { ClientMessageBrokerFactory, UiArguments, FnArg, PRIMITIVE, ClientMessageBroker } from '@angular/platform-webworker';
import { isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Log } from '../../decorators/log.decorator';
import { AutoUnsubscribe } from '../../decorators/auto.unsubscribe.decorator';
import { Debounce } from '../../decorators/debounce.decorator';

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

  // tslint:disable-next-line:no-inferrable-types
  public showScrollTop: boolean = false;

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

  private runOnUi(broker: ClientMessageBroker, func: string, data?: any): Promise<any> {
    const args = new UiArguments(func);
    args.method = func;
    if (data) {
      const fnArg = new FnArg(data, PRIMITIVE);
      fnArg.value = data;
      fnArg.type = PRIMITIVE;
      args.args = [fnArg];
    }

    return broker.runOnService(args, PRIMITIVE);
  }

  @HostListener('window:scroll', ['$event'])
  @Debounce()
  public onScroll(event: any) {
    this.runOnUi(this.uiBroker, 'onScroll').then(
      (res: boolean) => {
        this.showScrollTop = res;
      }
    );
  }

  private afterBoootstrap(): void {
    const bootstrapBroker = this.clientMessageBrokerFactory.createMessageBroker('BOOTSTRAP_CHANNEL', false);
    this.runOnUi(bootstrapBroker, 'init', this.appId);
  }

  public scrollTo(data: [number, number, ScrollBehavior]): void {
    this.runOnUi(this.uiBroker, 'scroll', data);
  }

  private saveAsExcelFile(data: [any, string]): void {
    this.runOnUi(this.exportBroker, 'export', data);
  }

  private notification(data: {type: string, title: string, content: string}): void {
    this.runOnUi(this.notificationBroker, 'notification', data);
  }

  private confirm(data: {title: string, content: string}): void {
    this.runOnUi(this.notificationBroker, 'confirm', data).then(
      (res: boolean) => {
        this.brokerService.confirmReturnValue(res);
      }
    );
  }
}
