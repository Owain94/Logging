import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-case-delete-dialog',
  templateUrl: './case.delete.dialog.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseDeleteDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<CaseDeleteDialogComponent>,
              @Inject(MD_DIALOG_DATA) public caseName: any) { }
}
