import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Case } from '../../../../store/models/case.model';

import { CaseRowEditDialogComponent } from './case.row.edit.dialog.component';

import { BrokerService } from '../../../../services/broker.service';

class MockBrokerService {
  public stopScroll(bool: boolean) {}
}

describe('CaseRowEditDialogComponent', () => {
  let caseRowEditDialogComponent: CaseRowEditDialogComponent;
  let caseRowEditDialogFixture: ComponentFixture<CaseRowEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CaseRowEditDialogComponent
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    caseRowEditDialogFixture = TestBed.createComponent(CaseRowEditDialogComponent);
    caseRowEditDialogComponent = caseRowEditDialogFixture.componentInstance;

    caseRowEditDialogComponent.singleCase = {
      '_id': '1',
      'name': 'test',
      'description': 'test'
    };
  });

  it('should create the case row edit dialog component', () => {
    expect(caseRowEditDialogFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('ngOnInit should create the form', () => {
    caseRowEditDialogComponent.ngOnInit();

    expect(caseRowEditDialogComponent.editCaseForm.get('name').value).toEqual('test');
    expect(caseRowEditDialogComponent.editCaseForm.get('description').value).toEqual('test');
  });

  it('should validate field', () => {
    caseRowEditDialogComponent.ngOnInit();

    expect(caseRowEditDialogComponent.isFieldValid('name')).toBeFalsy();
    expect(caseRowEditDialogComponent.isFieldValid('description')).toBeFalsy();

    caseRowEditDialogComponent.editCaseForm.controls['name'].setValue(null);
    caseRowEditDialogComponent.editCaseForm.controls['description'].setValue(null);

    expect(caseRowEditDialogComponent.isFieldValid('name')).toBeFalsy();
    expect(caseRowEditDialogComponent.isFieldValid('description')).toBeFalsy();

    caseRowEditDialogComponent['formSubmitAttempt'] = true;

    expect(caseRowEditDialogComponent.isFieldValid('name')).toBeTruthy();
    expect(caseRowEditDialogComponent.isFieldValid('description')).toBeTruthy();

    caseRowEditDialogComponent.editCaseForm.controls['name'].setValue('test');
    caseRowEditDialogComponent.editCaseForm.controls['description'].setValue('test');

    expect(caseRowEditDialogComponent.isFieldValid('name')).toBeFalsy();
    expect(caseRowEditDialogComponent.isFieldValid('description')).toBeFalsy();
  });

  it('returnValue should return true', (done: any) => {
    caseRowEditDialogComponent.ngOnInit();

    caseRowEditDialogComponent.result.subscribe((res: boolean) => {
      expect(caseRowEditDialogComponent.hide).toBeTruthy();
      expect(res).toBeTruthy();
      done();
    });

    expect(caseRowEditDialogComponent.hide).toBeFalsy();

    caseRowEditDialogComponent.returnValue(true);
  });

  it('returnValue should return false', (done: any) => {
    caseRowEditDialogComponent.ngOnInit();

    caseRowEditDialogComponent.result.subscribe((res: boolean) => {
      expect(caseRowEditDialogComponent.hide).toBeTruthy();
      expect(res).toBeFalsy();
      done();
    });

    expect(caseRowEditDialogComponent.hide).toBeFalsy();

    caseRowEditDialogComponent.returnValue(false);
  });

  it('submitForm shouldn\'t emit when form isn\'t valid', () => {
    caseRowEditDialogComponent.ngOnInit();

    expect(caseRowEditDialogComponent.hide).toBeFalsy();
    expect(caseRowEditDialogComponent['formSubmitAttempt']).toBeUndefined();

    caseRowEditDialogComponent.editCaseForm.controls['name'].setValue(null);
    caseRowEditDialogComponent.submitForm({
      '_id': '1',
      'name': null,
      'description': 'test'
    });

    expect(caseRowEditDialogComponent['formSubmitAttempt']).toBeTruthy();
    expect(caseRowEditDialogComponent.hide).toBeFalsy();
  });

  it('submitForm should emit when form is valid', (done: any) => {
    caseRowEditDialogComponent.ngOnInit();

    caseRowEditDialogComponent.result.subscribe((res: Case) => {
      expect(caseRowEditDialogComponent.hide).toBeTruthy();
      expect(res._id).toEqual('1');
      expect(res.name).toEqual('test');
      expect(res.description).toEqual('test');
      done();
    });

    expect(caseRowEditDialogComponent.hide).toBeFalsy();
    expect(caseRowEditDialogComponent['formSubmitAttempt']).toBeUndefined();

    caseRowEditDialogComponent.submitForm({
      '_id': '1',
      'name': 'test',
      'description': 'test'
    });

    expect(caseRowEditDialogComponent['formSubmitAttempt']).toBeTruthy();
    expect(caseRowEditDialogComponent.hide).toBeTruthy();
  });
});
