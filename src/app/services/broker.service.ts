import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BrokerService {
  public scroll = new Subject<[number, number, ScrollBehavior]>();
  public exportData = new Subject<[any, string]>();
  public notification = new Subject<{type: string, title: string, content: string}>();
  public confirm = new Subject<{title: string, content: string}>();
  public confirmReturn = new Subject<boolean>();

  public scrollTo(x: number, y: number, behavior: ScrollBehavior) {
    this.scroll.next([x, y, behavior]);
  }

  public publishData(data: [any, string]) {
    this.exportData.next(data);
  }

  public success(title: string, content: string) {
    return this.notification.next({type: 'success', title: title, content: content || ''});
  }

  public error(title: string, content: string) {
    return this.notification.next({type: 'error', title: title, content: content || ''});
  }

  public confirmPrompt(title: string, content: string) {
    return this.confirm.next({title: title, content: content || ''});
  }

  public confirmReturnValue(value: boolean) {
    return this.confirmReturn.next(value);
  }
}
