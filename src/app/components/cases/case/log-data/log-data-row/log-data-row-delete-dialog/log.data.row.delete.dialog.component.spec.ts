import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { LogDataRowDeleteDialogComponent } from './log.data.row.delete.dialog.component';

import { BrokerService } from '../../../../../../services/broker.service';

class MockBrokerService {
  public stopScroll(bool: boolean) {}
}

describe('LogDataRowDeleteDialogComponent', () => {
  let logDataRowDeleteDialogComponent: LogDataRowDeleteDialogComponent;
  let logDataRowDeleteDialogFixture: ComponentFixture<LogDataRowDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogDataRowDeleteDialogComponent
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    logDataRowDeleteDialogFixture = TestBed.createComponent(LogDataRowDeleteDialogComponent);
    logDataRowDeleteDialogComponent = logDataRowDeleteDialogFixture.componentInstance;
  });

  it('should create the log data row delete dialog component', () => {
    expect(logDataRowDeleteDialogFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('returnValue should return true', (done: any) => {
    logDataRowDeleteDialogComponent.ngOnInit();

    logDataRowDeleteDialogComponent.result.subscribe((res: boolean) => {
      expect(logDataRowDeleteDialogComponent.hide).toBeTruthy();
      expect(res).toBeTruthy();
      done();
    });

    expect(logDataRowDeleteDialogComponent.hide).toBeFalsy();

    logDataRowDeleteDialogComponent.returnValue(true);
  });

  it('returnValue should return false', (done: any) => {
    logDataRowDeleteDialogComponent.ngOnInit();

    logDataRowDeleteDialogComponent.result.subscribe((res: boolean) => {
      expect(logDataRowDeleteDialogComponent.hide).toBeTruthy();
      expect(res).toBeFalsy();
      done();
    });

    expect(logDataRowDeleteDialogComponent.hide).toBeFalsy();

    logDataRowDeleteDialogComponent.returnValue(false);
  });
});
