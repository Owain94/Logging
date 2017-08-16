import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification.dialog.component';

import { BrokerService } from '../../../services/broker.service';

class MockBrokerService {
  public stopScroll(bool: boolean) {}
}

describe('NotificationDialogComponent', () => {
  let notificationDialogComponent: NotificationDialogComponent;
  let notificationDialogFixture: ComponentFixture<NotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationDialogComponent
      ],
      providers: [
        { provide: BrokerService, useClass: MockBrokerService }
      ]
    });
  }));

  beforeEach(() => {
    notificationDialogFixture = TestBed.createComponent(NotificationDialogComponent);
    notificationDialogComponent = notificationDialogFixture.componentInstance;

    notificationDialogComponent.notification = {
      'title': 'test',
      'content': 'test'
    }
  });

  it('should create the notification component', () => {
    expect(notificationDialogFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('hideDialog should return true', (done: any) => {
    notificationDialogComponent.ngOnInit();

    notificationDialogComponent.result.subscribe((res: boolean) => {
      expect(notificationDialogComponent.hide).toBeTruthy();
      expect(res).toBeTruthy();
      expect(notificationDialogComponent.notification.title).toEqual('test');
      expect(notificationDialogComponent.notification.content).toEqual('test');
      done();
    });

    expect(notificationDialogComponent.hide).toBeFalsy();

    notificationDialogComponent.hideDialog();
  });
});
