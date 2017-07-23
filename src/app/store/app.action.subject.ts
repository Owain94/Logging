import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';

import { AppActions } from './app.actions';

@Injectable()
export class AppActionsSubject extends ActionsSubject {
  constructor(private actions: AppActions) {
    super();
  }

  next(action: Action) {
    super.next(action);
    this.actions.nextAction(action);
  }
}
