import '../polyfills/polyfills.browser';

import { PlatformRef } from '@angular/core';
import {
  bootstrapWorkerUi,
  WORKER_UI_LOCATION_PROVIDERS,
  ServiceMessageBrokerFactory,
  PRIMITIVE
} from '@angular/platform-webworker';

import { bootloader } from '../helpers/bootloader';
import { Ui } from '../helpers/ui';
import { Export } from '../helpers/export';
import { Notifications } from '../helpers/notification';

Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');

const bootstrap = () => {
  return bootstrapWorkerUi('webworker.bundle.js', WORKER_UI_LOCATION_PROVIDERS).then((platformRef: PlatformRef) => {
    const brokerFactory: ServiceMessageBrokerFactory = platformRef.injector.get(ServiceMessageBrokerFactory);
    const BootstrapBroker = brokerFactory.createMessageBroker('BOOTSTRAP_CHANNEL', false);
    const UiBroker = brokerFactory.createMessageBroker('UI_CHANNEL', false);
    const exportBroker = brokerFactory.createMessageBroker('EXPORT_CHANNEL', false);
    const notificationBroker = brokerFactory.createMessageBroker('NOTIFICATION_CHANNEL', false);

    BootstrapBroker.registerMethod('init', [ PRIMITIVE ], Ui.removeStyleTags, PRIMITIVE);
    UiBroker.registerMethod('scroll', [ PRIMITIVE ], Ui.scroll, PRIMITIVE);

    exportBroker.registerMethod('export', [ PRIMITIVE ], Export.export, PRIMITIVE);

    notificationBroker.registerMethod('notification', [ PRIMITIVE ], Notifications.notification, PRIMITIVE);
    notificationBroker.registerMethod('confirm', [ PRIMITIVE ], Notifications.confirm, PRIMITIVE);
  });
}

bootloader(bootstrap);
