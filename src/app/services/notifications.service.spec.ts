import { TestBed, inject } from '@angular/core/testing';

import {NotificationsService} from '../services/notifications.service';
import {defaultIcons} from '../interfaces/notifications/icons';
import {NotificationEvent} from '../interfaces/notifications/notification-event.type';
import {Notification} from '../interfaces/notifications/notification.type';

describe('The notifications service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsService],
    });
  });

  const defaultNotification = {
    id: '0',
    title: 'Test title',
    type: 'success',
    icon: defaultIcons.success,
    content: 'Test Content',
    timeOut: 0,
    maxLength: 0,
    clickToClose: true,
    showProgressBar: true,
    pauseOnHover: true,
    theClass: 'initial',
    rtl: false,
    animate: 'fromRight',
    createdOn: new Date(),
    destroyedOn: new Date()
  };

  it('should instantiate',
    inject([NotificationsService], (service: NotificationsService) => {
      expect(service instanceof NotificationsService).toBeTruthy();
    })
  );

  describe('set()', () => {
    it('should generate random id\'s if override is not set',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;

        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        service.set(defaultNotification, true);

        expect(notificationEvent.command).toBe('set');
        expect(notificationEvent.notification.id !== '0').toBeTruthy();
      })
    );

    it('should override id if set is used',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null
        const override = {id: '1'};

        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        service.set(Object.assign(defaultNotification, {override: override}), true);

        expect(notificationEvent.notification.id).toBe('1');
      })
    );
  });

  describe('create()', () => {
    it('should create a notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.create('Title', 'Message', 'create');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('create');
        // expect(notification.icon).toBe('bare');

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('success()', () => {
    it('should show success notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.success('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('success');
        expect(notification.icon).toBe(defaultIcons.success);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show success notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.success('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('success');
        expect(notification.icon).toBe(defaultIcons.success);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('error()', () => {
    it('should show error notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.error('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('error');
        expect(notification.icon).toBe(defaultIcons.error);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show error notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.error('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('error');
        expect(notification.icon).toBe(defaultIcons.error);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('alert()', () => {
    it('should show alert notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.alert('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('alert');
        expect(notification.icon).toBe(defaultIcons.alert);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show alert notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.alert('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('alert');
        expect(notification.icon).toBe(defaultIcons.alert);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('info()', () => {
    it('should show info notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.info('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('info');
        expect(notification.icon).toBe(defaultIcons.info);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show info notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.info('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('info');
        expect(notification.icon).toBe(defaultIcons.info);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('warn()', () => {
    it('should show warn notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.warn('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('warn');
        expect(notification.icon).toBe(defaultIcons.warn);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show warn notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.warn('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('warn');
        expect(notification.icon).toBe(defaultIcons.warn);

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('bare()', () => {
    it('should show bare notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.bare('Title', 'Message');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('bare');
        expect(notification.icon).toBe('bare');

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('Message');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );

    it('should show bare notification without content',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.bare('Title');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('bare');
        expect(notification.icon).toBe('bare');

        expect(notification.title).toBe('Title');
        expect(notification.content).toBe('');
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBeUndefined();
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('html()', () => {
    it('should show html notification',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        const notification: Notification = service.html('<B>Title</B>', 'success');

        expect(notification.id !== undefined).toBeTruthy();
        expect(notification.type).toBe('success');
        expect(notification.icon).toBe('bare');

        expect(notification.title).toBeUndefined();
        expect(notification.content).toBeUndefined();
        expect(notification.override).toBeUndefined();
        expect(notification.html).toBe('<B>Title</B>');
        expect(notification.state).toBeUndefined();
        expect(notification.createdOn).toBeUndefined();
        expect(notification.destroyedOn).toBeUndefined();
      })
    );
  });

  describe('remove()', () => {
    it('should remove all notifications',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        service.remove();

        expect(notificationEvent.command).toBe('cleanAll');
      })
    );

    it('should remove given notifications',
      inject([NotificationsService], (service: NotificationsService) => {
        let notificationEvent: NotificationEvent = null;
        service.getChangeEmitter().subscribe(item => notificationEvent = item);

        service.remove('1');

        expect(notificationEvent.command).toBe('clean');
        expect(notificationEvent.id).toBe('1');
      })
    );
  });
});
