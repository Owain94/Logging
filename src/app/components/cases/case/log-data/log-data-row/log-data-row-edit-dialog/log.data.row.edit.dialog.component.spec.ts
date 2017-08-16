import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Log as LogItem } from '../../../../../../store/models/log.model';

import { LogDataRowEditDialogComponent } from './log.data.row.edit.dialog.component';
import { LocaleDatePipe } from '../../../../../../pipes/locale.date.pipe';

import { BrokerService } from '../../../../../../services/broker.service';

class MockBrokerService {
  public stopScroll(bool: boolean) {}
}

describe('CaseRowEditDialogComponent', () => {
  let logDataRowEditDialogComponent: LogDataRowEditDialogComponent;
  let logDataRowEditDialogFixture: ComponentFixture<LogDataRowEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        LogDataRowEditDialogComponent,
        LocaleDatePipe
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    logDataRowEditDialogFixture = TestBed.createComponent(LogDataRowEditDialogComponent);
    logDataRowEditDialogComponent = logDataRowEditDialogFixture.componentInstance;

    logDataRowEditDialogComponent.logItem = {
      '_id': '1',
      'what': 'test',
      'why': '[ test ] test',
      'how': 'test',
      'with': 'test',
      'who': 'test',
      'where': 'test',
      'when': 1,
      'case': '1',
      'result': ''
    };
  });

  it('should create the case row edit dialog component', () => {
    expect(logDataRowEditDialogFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('ngOnInit should create the form', () => {
    logDataRowEditDialogComponent.ngOnInit();

    expect(logDataRowEditDialogComponent.editLogForm.get('what').value).toEqual('test');
    expect(logDataRowEditDialogComponent.editLogForm.get('where').value).toEqual('test');
    expect(logDataRowEditDialogComponent.editLogForm.get('why').value).toEqual('test');
    expect(logDataRowEditDialogComponent.editLogForm.get('how').value).toEqual('test');
    expect(logDataRowEditDialogComponent.editLogForm.get('with').value).toEqual('test');
  });

  it('should validate field', () => {
    logDataRowEditDialogComponent.ngOnInit();

    expect(logDataRowEditDialogComponent.isFieldValid('what')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('where')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('why')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('how')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('with')).toBeFalsy();

    logDataRowEditDialogComponent.editLogForm.controls['what'].setValue(null);
    logDataRowEditDialogComponent.editLogForm.controls['where'].setValue(null);
    logDataRowEditDialogComponent.editLogForm.controls['why'].setValue(null);
    logDataRowEditDialogComponent.editLogForm.controls['how'].setValue(null);
    logDataRowEditDialogComponent.editLogForm.controls['with'].setValue(null);

    expect(logDataRowEditDialogComponent.isFieldValid('what')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('where')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('why')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('how')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('with')).toBeFalsy();

    logDataRowEditDialogComponent['formSubmitAttempt'] = true;

    expect(logDataRowEditDialogComponent.isFieldValid('what')).toBeTruthy();
    expect(logDataRowEditDialogComponent.isFieldValid('where')).toBeTruthy();
    expect(logDataRowEditDialogComponent.isFieldValid('why')).toBeTruthy();
    expect(logDataRowEditDialogComponent.isFieldValid('how')).toBeTruthy();
    expect(logDataRowEditDialogComponent.isFieldValid('with')).toBeTruthy();

    logDataRowEditDialogComponent.editLogForm.controls['what'].setValue('test');
    logDataRowEditDialogComponent.editLogForm.controls['where'].setValue('test');
    logDataRowEditDialogComponent.editLogForm.controls['why'].setValue('test');
    logDataRowEditDialogComponent.editLogForm.controls['how'].setValue('test');
    logDataRowEditDialogComponent.editLogForm.controls['with'].setValue('test');

    expect(logDataRowEditDialogComponent.isFieldValid('what')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('where')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('why')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('how')).toBeFalsy();
    expect(logDataRowEditDialogComponent.isFieldValid('with')).toBeFalsy();
  });

  it('returnValue should return true', (done: any) => {
    logDataRowEditDialogComponent.ngOnInit();

    logDataRowEditDialogComponent.result.subscribe((res: boolean) => {
      expect(logDataRowEditDialogComponent.hide).toBeTruthy();
      expect(res).toBeTruthy();
      done();
    });

    expect(logDataRowEditDialogComponent.hide).toBeFalsy();

    logDataRowEditDialogComponent.returnValue(true);
  });

  it('returnValue should return false', (done: any) => {
    logDataRowEditDialogComponent.ngOnInit();

    logDataRowEditDialogComponent.result.subscribe((res: boolean) => {
      expect(logDataRowEditDialogComponent.hide).toBeTruthy();
      expect(res).toBeFalsy();
      done();
    });

    expect(logDataRowEditDialogComponent.hide).toBeFalsy();

    logDataRowEditDialogComponent.returnValue(false);
  });

  it('submitForm shouldn\'t emit when form isn\'t valid', () => {
    logDataRowEditDialogComponent.ngOnInit();

    expect(logDataRowEditDialogComponent.hide).toBeFalsy();
    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeUndefined();

    logDataRowEditDialogComponent.editLogForm.controls['how'].setValue(null);
    logDataRowEditDialogComponent.submitForm({
      '_id': '1',
      'what': 'test',
      'why': '[ test ] test',
      'how': 'test',
      'with': 'test',
      'who': 'test',
      'where': 'test',
      'when': 1,
      'case': '1',
      'result': ''
    });

    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeTruthy();
    expect(logDataRowEditDialogComponent.hide).toBeFalsy();
  });

  it('submitForm should emit when form is valid', (done: any) => {
    logDataRowEditDialogComponent.ngOnInit();

    logDataRowEditDialogComponent.result.subscribe((res: LogItem) => {
      expect(logDataRowEditDialogComponent.hide).toBeTruthy();
      expect(res._id).toEqual('1');
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('[ test ] test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.who).toEqual('test');
      expect(res.where).toEqual('test');
      expect(res.when).toEqual(1);
      expect(res.case).toEqual('1');
      expect(res.result).toEqual('test');
      done();
    });

    expect(logDataRowEditDialogComponent.hide).toBeFalsy();
    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeUndefined();

    logDataRowEditDialogComponent.submitForm({
      '_id': '1',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': 'test',
      'who': 'test',
      'where': 'test',
      'when': 1,
      'case': '1',
      'result': 'test'
    });

    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeTruthy();
    expect(logDataRowEditDialogComponent.hide).toBeTruthy();
  });

  it('submitForm should emit when form is valid (without result)', (done: any) => {
    logDataRowEditDialogComponent.ngOnInit();

    logDataRowEditDialogComponent.result.subscribe((res: LogItem) => {
      expect(logDataRowEditDialogComponent.hide).toBeTruthy();
      expect(res._id).toEqual('1');
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('[ test ] test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.who).toEqual('test');
      expect(res.where).toEqual('test');
      expect(res.when).toEqual(1);
      expect(res.case).toEqual('1');
      expect(res.result).toBeUndefined();
      done();
    });

    expect(logDataRowEditDialogComponent.hide).toBeFalsy();
    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeUndefined();

    logDataRowEditDialogComponent.submitForm({
      '_id': '1',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': 'test',
      'who': 'test',
      'where': 'test',
      'when': 1,
      'case': '1'
    });

    expect(logDataRowEditDialogComponent['formSubmitAttempt']).toBeTruthy();
    expect(logDataRowEditDialogComponent.hide).toBeTruthy();
  });
});
