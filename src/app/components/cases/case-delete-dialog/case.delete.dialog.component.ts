import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Log } from '../../../decorators/log.decorator';

@Component({
  selector: 'app-case-delete-dialog',
  templateUrl: './case.delete.dialog.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseDeleteDialogComponent {
  constructor(public dialogRef: MdDialogRef<CaseDeleteDialogComponent>,
              @Inject(MD_DIALOG_DATA) public caseName: any) { }
}
