import { Subject } from 'rxjs/Subject';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Log } from '../../../../../store/models/log.model';

import { LogDataRowComponent } from './log.data.row.component';
import { LogDataRowEditDialogComponent } from './log-data-row-edit-dialog/log.data.row.edit.dialog.component';
import { LogDataRowDeleteDialogComponent } from './log-data-row-delete-dialog/log.data.row.delete.dialog.component';

import { LocaleDatePipe } from '../../../../../pipes/locale.date.pipe';
import { NewlinePipe } from '../../../../../pipes/newline.pipe';

import { BrokerService } from '../../../../../services/broker.service';

class MockBrokerService {
  public setText(obj: {
    'i': number,
    'where': string,
    'what': string,
    'why': string,
    'how': string,
    'with': string,
    'result': string
  }) {}
}

describe('LogDataRowComponent', () => {
  let logDataRowComponent: LogDataRowComponent;
  let logDataRowFixture: ComponentFixture<LogDataRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        LogDataRowComponent,
        LogDataRowEditDialogComponent,
        LogDataRowDeleteDialogComponent,
        LocaleDatePipe,
        NewlinePipe
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    logDataRowFixture = TestBed.createComponent(LogDataRowComponent);
    logDataRowComponent = logDataRowFixture.componentInstance;

    logDataRowComponent.logItem = {
      '_id': '1',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': null,
      'who': 'test',
      'where': 'testing',
      'when': 3,
      'case': '1',
      'result': undefined
    };
    logDataRowComponent.i = 1;
    logDataRowComponent.filterText = new Subject<string>();
  });

  it('should create the log data row component', () => {
    expect(logDataRowFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('ngOnInit should subscribe to the filter', () => {
    logDataRowComponent.ngOnInit();

    expect(logDataRowComponent.filter).toEqual('');
    logDataRowComponent.filterText.next('testing');
    expect(logDataRowComponent.filter).toEqual('testing');
  });

  it('ngOnInit should subscribe to the filter', () => {
    logDataRowComponent.logItem = {
      '_id': '1',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': null,
      'who': 'test',
      'where': 'testing',
      'when': 3,
      'case': '1',
      'result': null
    };

    logDataRowComponent.ngOnInit();

    expect(logDataRowComponent.filter).toEqual('');
    logDataRowComponent.filterText.next(null);
    expect(logDataRowComponent.filter).toEqual(null);
  });

  it('ngOnInit should subscribe to the filter', () => {
    logDataRowComponent.logItem = {
      '_id': '1',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': null,
      'who': 'test',
      'where': 'testing',
      'when': 3,
      'case': '1',
      'result': 'test\ntest'
    };

    logDataRowComponent.ngOnInit();

    expect(logDataRowComponent.filter).toEqual('');
    logDataRowComponent.filterText.next('');
    expect(logDataRowComponent.filter).toEqual('');
  });

  it('editModal show and hide', () => {
    expect(logDataRowComponent.editModal).toEqual(false);
    logDataRowComponent.editLog();
    expect(logDataRowComponent.editModal).toEqual(true);
    logDataRowComponent.editLogResult(false);
    expect(logDataRowComponent.editModal).toEqual(false);
  });

  it('deleteModal show and hide', () => {
    expect(logDataRowComponent.deleteModal).toEqual(false);
    logDataRowComponent.deleteLog();
    expect(logDataRowComponent.deleteModal).toEqual(true);
    logDataRowComponent.deleteLogResult(false);
    expect(logDataRowComponent.deleteModal).toEqual(false);
  });

  it('editLogResult should emit', (done: any) => {
    logDataRowComponent.editLogEvent.subscribe((res: Log) => {
      expect(logDataRowComponent.editModal).toEqual(false);
      expect(res._id).toEqual('1');
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('test');
      expect(res.how).toEqual('test');
      expect(res.with).toBeNull();
      expect(res.who).toEqual('test');
      expect(res.where).toEqual('testing');
      expect(res.when).toEqual(3);
      expect(res.case).toEqual('1');
      expect(res.result).toBeUndefined();
      done();
    });
    expect(logDataRowComponent.editModal).toEqual(false);
    logDataRowComponent.editLogResult(logDataRowComponent.logItem);
  });

  it('deleteLogResult should emit', (done: any) => {
    logDataRowComponent.deleteLogEvent.subscribe((res: boolean) => {
      expect(logDataRowComponent.deleteModal).toEqual(false);
      expect(res).toEqual('1');
      done();
    });
    expect(logDataRowComponent.deleteModal).toEqual(false);
    logDataRowComponent.deleteLogResult(true);
  });
});
