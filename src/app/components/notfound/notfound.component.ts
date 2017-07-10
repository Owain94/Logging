import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './notfound.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotFoundComponent {

  constructor() {}

}
