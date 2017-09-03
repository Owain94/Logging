import '../polyfills/polyfills.browser';

import { PlatformRef } from '@angular/core';
import {
  bootstrapWorkerUi,
  WORKER_UI_LOCATION_PROVIDERS,
  ServiceMessageBrokerFactory,
  SerializerTypes,
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

    BootstrapBroker.registerMethod('init', [ SerializerTypes.PRIMITIVE ], Ui.removeStyleTags, SerializerTypes.PRIMITIVE);

    UiBroker.registerMethod('scroll', [ SerializerTypes.PRIMITIVE ], Ui.scroll, SerializerTypes.PRIMITIVE);
    UiBroker.registerMethod('onScroll', [ SerializerTypes.PRIMITIVE ], Ui.onScroll, SerializerTypes.PRIMITIVE);
    UiBroker.registerMethod('disableScroll', [ SerializerTypes.PRIMITIVE ], Ui.disableScroll, SerializerTypes.PRIMITIVE);

    dataBroker.registerMethod('setText', [ SerializerTypes.PRIMITIVE ], Data.setHtmlText, SerializerTypes.PRIMITIVE);

    exportBroker.registerMethod('export', [ SerializerTypes.PRIMITIVE ], Export.export, SerializerTypes.PRIMITIVE);
  });
}

bootloader(bootstrap);
