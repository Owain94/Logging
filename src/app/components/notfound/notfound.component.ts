import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-not-found',
  templateUrl: './notfound.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class NotFoundComponent {

  constructor() {}

}
