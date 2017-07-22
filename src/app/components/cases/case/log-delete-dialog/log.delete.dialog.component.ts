import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Log } from '../../../../decorators/log.decorator';

@Component({
  selector: 'app-log-delete-dialog',
  templateUrl: './log.delete.dialog.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class LogDeleteDialogComponent {

  constructor(public dialogRef: MdDialogRef<LogDeleteDialogComponent>) { }

}
