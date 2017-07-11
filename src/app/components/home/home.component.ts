import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class HomeComponent {

  constructor() {}

}
