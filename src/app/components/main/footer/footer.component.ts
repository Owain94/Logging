import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../../decorators/log.decorator';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.pug',
  styleUrls: ['./footer.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class FooterComponent {}
