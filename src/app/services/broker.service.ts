import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BrokerService {
  public scroll = new Subject<[number, number, ScrollBehavior]>();
  public disableScroll = new Subject<boolean>();
  public setHtmlText = new Subject<{
    'i': number,
    'where': string,
    'what': string,
    'why': string,
    'how': string,
    'with': string,
    'result': string
  }>();
  public exportData = new Subject<[any, string]>();
  public notification = new Subject<{title: string, content: string}>();

  public scrollTo(x: number, y: number, behavior: ScrollBehavior) {
    this.scroll.next([x, y, behavior]);
  }

  public stopScroll(data: boolean) {
    this.disableScroll.next(data);
  }

  public setText(data: {
    'i': number,
    'where': string,
    'what': string,
    'why': string,
    'how': string,
    'with': string,
    'result': string
  }) {
    this.setHtmlText.next(data);
  }

  public publishData(data: [any, string]) {
    this.exportData.next(data);
  }

  public notificationText(title: string, content: string) {
    return this.notification.next({title: title, content: content});
  }
}
