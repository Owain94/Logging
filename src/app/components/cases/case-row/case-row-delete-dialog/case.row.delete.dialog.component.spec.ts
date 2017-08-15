import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { CaseRowDeleteDialogComponent } from './case.row.delete.dialog.component';

import { BrokerService } from '../../../../services/broker.service';

class MockBrokerService {
  public stopScroll(bool: boolean) {}
}

describe('CaseRowDeleteDialogComponent', () => {
  let caseRowDeleteDialogComponent: CaseRowDeleteDialogComponent;
  let caseRowDeleteDialogFixture: ComponentFixture<CaseRowDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseRowDeleteDialogComponent
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    caseRowDeleteDialogFixture = TestBed.createComponent(CaseRowDeleteDialogComponent);
    caseRowDeleteDialogComponent = caseRowDeleteDialogFixture.componentInstance;
  });

  it('should create the case row delete dialog component', () => {
    expect(caseRowDeleteDialogFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('returnValue should return true', (done: any) => {
    caseRowDeleteDialogComponent.ngOnInit();

    caseRowDeleteDialogComponent.result.subscribe((res: boolean) => {
      expect(caseRowDeleteDialogComponent.hide).toBeTruthy();
      expect(res).toBeTruthy();
      done();
    });

    expect(caseRowDeleteDialogComponent.hide).toBeFalsy();

    caseRowDeleteDialogComponent.returnValue(true);
  });

  it('returnValue should return false', (done: any) => {
    caseRowDeleteDialogComponent.ngOnInit();

    caseRowDeleteDialogComponent.result.subscribe((res: boolean) => {
      expect(caseRowDeleteDialogComponent.hide).toBeTruthy();
      expect(res).toBeFalsy();
      done();
    });

    expect(caseRowDeleteDialogComponent.hide).toBeFalsy();

    caseRowDeleteDialogComponent.returnValue(false);
  });
});
