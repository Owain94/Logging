import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule, MdDialogRef, MdDialog } from '@angular/material';

import { LogEditDialogComponent } from './log.edit.dialog.component';
import { LocaleDatePipe } from '../../../../pipes/locale.date.pipe';

const mockData = {
  '_id': '2',
  'what': 'test',
  'why': '[ test ] test',
  'how': 'test',
  'with': 'test',
  'who': 'test',
  'where': 'test',
  'when': 1,
  'case': '2',
  'result': 'test'
};

describe('CaseDeleteDialogComponent', () => {
  let logEditDialogComponent: LogEditDialogComponent;
  let logEditDialog: MdDialogRef<LogEditDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdDialogModule
      ],
      declarations: [
        LogEditDialogComponent,
        LocaleDatePipe
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          LogEditDialogComponent
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    logEditDialog = dialog.open(LogEditDialogComponent, { data: mockData});
    logEditDialogComponent = logEditDialog.componentInstance;
  });

  it('should create the case delete dialog', () => {
    expect(logEditDialogComponent).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(logEditDialogComponent.editLogForm).toBeUndefined();
    expect(logEditDialogComponent.prefix).toEqual('');
  });

  it('should have values after ngOnInit', () => {
    logEditDialogComponent.ngOnInit();

    expect(logEditDialogComponent.editLogForm).toBeTruthy();
    expect(logEditDialogComponent.prefix).toEqual('[ test ]');
    expect(logEditDialogComponent.editLogForm.get('what').value).toEqual('test');
    expect(logEditDialogComponent.editLogForm.get('where').value).toEqual('test');
    expect(logEditDialogComponent.editLogForm.get('why').value).toEqual('test');
    expect(logEditDialogComponent.editLogForm.get('how').value).toEqual('test');
    expect(logEditDialogComponent.editLogForm.get('with').value).toEqual('test');
    expect(logEditDialogComponent.editLogForm.get('result').value).toEqual('test');
  });

  it('should destroy on submit', () => {
    logEditDialog.afterClosed().subscribe((res) => {
      expect(res._id).toEqual('2');
      expect(res.who).toEqual('test');
      expect(res.when).toEqual(1);
      expect(res.case).toEqual('2');
      expect(res.why).toEqual('[ test ] test');
      expect(res.what).toEqual('test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.result).toEqual('test');

      expect(logEditDialogComponent).toBeFalsy();
    });
    logEditDialogComponent.ngOnInit();
    logEditDialogComponent.submitForm(mockData);
  });

  it('should destroy on submit (without results)', () => {
    logEditDialog.afterClosed().subscribe((res) => {
      expect(res._id).toEqual('2');
      expect(res.who).toEqual('test');
      expect(res.when).toEqual(1);
      expect(res.case).toEqual('2');
      expect(res.why).toEqual('[ test ] test');
      expect(res.what).toEqual('test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.result).toEqual('');

      expect(logEditDialogComponent).toBeFalsy();
    });

    delete logEditDialogComponent.logItem.result;

    logEditDialogComponent.ngOnInit();
    logEditDialogComponent.submitForm(mockData);
  });
});
