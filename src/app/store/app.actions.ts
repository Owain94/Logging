import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';

@Injectable()
export class AppActions {
  public actions = new Subject<Action>();

  ofType(type: string) {
    return this.actions.filter((action: Action ) => action.type === type);
  }

  nextAction(action: Action) {
    this.actions.next(action);
  }
}
