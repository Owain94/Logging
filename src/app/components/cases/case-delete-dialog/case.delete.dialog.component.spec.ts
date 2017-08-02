import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdDialogModule, MdDialogRef, MdDialog } from '@angular/material';

import { CaseDeleteDialogComponent } from './case.delete.dialog.component';

describe('CaseDeleteDialogComponent', () => {
  let caseDeleteDialogComponent: CaseDeleteDialogComponent;
  let caseDeleteDialog: MdDialogRef<CaseDeleteDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MdButtonModule,
        MdDialogModule
      ],
      declarations: [
        CaseDeleteDialogComponent
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          CaseDeleteDialogComponent
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    caseDeleteDialog = dialog.open(CaseDeleteDialogComponent, { data: 'test' });
    caseDeleteDialogComponent = caseDeleteDialog.componentInstance;
  });

  it('should create the case delete dialog', () => {
    expect(caseDeleteDialogComponent).toBeTruthy();
  });

  it('should display the provided case name', () => {
    expect(caseDeleteDialogComponent.caseName).toEqual('test');
  });
});
