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
import { Data } from '../helpers/data';
import { Export } from '../helpers/export';

Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');

const bootstrap = () => {
  return bootstrapWorkerUi('webworker.bundle.js', WORKER_UI_LOCATION_PROVIDERS).then((platformRef: PlatformRef) => {
    const brokerFactory: ServiceMessageBrokerFactory = platformRef.injector.get(ServiceMessageBrokerFactory);
    const BootstrapBroker = brokerFactory.createMessageBroker('BOOTSTRAP_CHANNEL', false);
    const UiBroker = brokerFactory.createMessageBroker('UI_CHANNEL', false);
    const dataBroker = brokerFactory.createMessageBroker('DATA_CHANNEL', false);
    const exportBroker = brokerFactory.createMessageBroker('EXPORT_CHANNEL', false);

    BootstrapBroker.registerMethod('init', [ PRIMITIVE ], Ui.removeStyleTags, PRIMITIVE);

    UiBroker.registerMethod('scroll', [ PRIMITIVE ], Ui.scroll, PRIMITIVE);
    UiBroker.registerMethod('onScroll', [ PRIMITIVE ], Ui.onScroll, PRIMITIVE);
    UiBroker.registerMethod('disableScroll', [ PRIMITIVE ], Ui.disableScroll, PRIMITIVE);

    dataBroker.registerMethod('setText', [ PRIMITIVE ], Data.setHtmlText, PRIMITIVE);

    exportBroker.registerMethod('export', [ PRIMITIVE ], Export.export, PRIMITIVE);
  });
}

bootloader(bootstrap);
