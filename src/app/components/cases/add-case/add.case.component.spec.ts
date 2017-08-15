import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Case } from '../../../store/models/case.model';

import { AddCaseComponent } from './add.case.component';

describe('AddCaseComponent', () => {
  let addCaseComponent: AddCaseComponent;
  let addCaseFixture: ComponentFixture<AddCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AddCaseComponent
      ]
    });
  }));

  beforeEach(() => {
    addCaseFixture = TestBed.createComponent(AddCaseComponent);
    addCaseComponent = addCaseFixture.componentInstance;
  });

  it('should create the add case component', () => {
    expect(addCaseFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('ngOnInit should init the form', () => {
    addCaseComponent.ngOnInit();

    expect(addCaseComponent.addCaseForm.get('name').value).toBeNull();
    expect(addCaseComponent.addCaseForm.get('description').value).toBeNull();
  });

  it('should validate field', () => {
    addCaseComponent.ngOnInit();

    expect(addCaseComponent.isFieldValid('name')).toBeFalsy();
    expect(addCaseComponent.isFieldValid('description')).toBeFalsy();

    addCaseComponent['formSubmitAttempt'] = true;

    expect(addCaseComponent.isFieldValid('name')).toBeTruthy();
    expect(addCaseComponent.isFieldValid('description')).toBeTruthy();

    addCaseComponent.addCaseForm.controls['name'].setValue('test');
    addCaseComponent.addCaseForm.controls['description'].setValue('test');

    expect(addCaseComponent.isFieldValid('name')).toBeFalsy();
    expect(addCaseComponent.isFieldValid('description')).toBeFalsy();
  });

  it('component should emit on submit form', (done: any) => {
    addCaseComponent.ngOnInit();

    addCaseComponent.addCaseForm.controls['name'].setValue('test');
    addCaseComponent.addCaseForm.controls['description'].setValue('test');

    addCaseComponent.addCaseEvent.subscribe((res: Case) => {
      expect(res.name).toEqual('test');
      expect(res.description).toEqual('test');
      done();
    });

    addCaseComponent.submitForm(
      {
        'name': 'test',
        'description': 'test'
      }
    );
  });

  it('component shouldn\'t emit when the form is invalid', () => {
    addCaseComponent.ngOnInit();

    addCaseComponent.submitForm(
      {
        'name': 'test',
        'description': 'test'
      }
    );

    expect(addCaseComponent['formSubmitAttempt']).toBeTruthy();
  });
});
