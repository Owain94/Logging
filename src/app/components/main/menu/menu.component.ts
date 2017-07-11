import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../../decorators/log.decorator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.pug',
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class MenuComponent {
  // tslint:disable-next-line:no-inferrable-types
  public collapsed: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  public url: string = '/';

  constructor() {}

  public navBarClick(force: boolean = false): void {
    if (force) {
      this.collapsed = true;
    } else {
      this.collapsed = !this.collapsed;
    }
  }
}
