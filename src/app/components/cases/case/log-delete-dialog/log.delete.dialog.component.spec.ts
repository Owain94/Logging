import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdDialogModule, MdDialogRef, MdDialog } from '@angular/material';

import { LogDeleteDialogComponent } from './log.delete.dialog.component';

describe('LogDeleteDialogComponent', () => {
  let logDeleteDialogComponent: LogDeleteDialogComponent;
  let logDeleteDialog: MdDialogRef<LogDeleteDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MdButtonModule,
        MdDialogModule
      ],
      declarations: [
        LogDeleteDialogComponent
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          LogDeleteDialogComponent
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    logDeleteDialog = dialog.open(LogDeleteDialogComponent);
    logDeleteDialogComponent = logDeleteDialog.componentInstance;
  });

  it('should create the log delete dialog', () => {
    expect(logDeleteDialogComponent).toBeTruthy();
  });

  it('should destroy on close', () => {
    logDeleteDialog.afterClosed().subscribe((res) => {
      expect(res).toBeTruthy();

      expect(logDeleteDialogComponent).toBeFalsy();
    });

    logDeleteDialog.close(true)
  });
});
