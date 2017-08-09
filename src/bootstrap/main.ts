import '../polyfills/polyfills.browser';

import { PlatformRef } from '@angular/core';
import {
  bootstrapWorkerUi,
  WORKER_UI_LOCATION_PROVIDERS,
  ServiceMessageBrokerFactory,
  PRIMITIVE
} from '@angular/platform-webworker';

import * as swal from 'sweetalert';

import * as FileSaver from 'file-saver';

Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');

bootstrapWorkerUi('webworker.bundle.js', WORKER_UI_LOCATION_PROVIDERS).then((platformRef: PlatformRef) => {
  const brokerFactory: ServiceMessageBrokerFactory = platformRef.injector.get(ServiceMessageBrokerFactory);
  const UiBroker = brokerFactory.createMessageBroker('UI_CHANNEL', false);
  const exportBroker = brokerFactory.createMessageBroker('EXPORT_CHANNEL', false);
  const notificationBroker = brokerFactory.createMessageBroker('NOTIFICATION_CHANNEL', false);

  UiBroker.registerMethod('scroll', [ PRIMITIVE ], (data: [number, number, ScrollBehavior]) => {
    window.scroll({top: data[0], left: data[1], behavior: data[2]});
    return Promise.resolve();
  }, PRIMITIVE);

  exportBroker.registerMethod('export', [ PRIMITIVE ], (data: [any, string]) => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const blob: Blob = new Blob([data[0]], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(blob,
      `${data[1]}_logs_export_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.xlsx`
    );

    return Promise.resolve();
  }, PRIMITIVE);

  notificationBroker.registerMethod('notification', [ PRIMITIVE ], async(data: {
    type: 'success' | 'error',
    title: string,
    content: string
  }) => {
    return Promise.resolve(
      await new Promise((resolve, reject) => {
        swal({
          title: data.title,
          text: data.content,
          type: data.type,
          confirmButtonColor: '#900'
        }, () => {
          resolve();
        });
      })
    );
  }, PRIMITIVE);

  notificationBroker.registerMethod('confirm', [ PRIMITIVE ], async(data: {
    title: string,
    content: string
  }) => {
    return Promise.resolve(
      await new Promise((resolve, reject) => {
        swal({
          title: data.title,
          text: data.content,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#900'
        }, (isConfirm) => {
          resolve(isConfirm);
        });
      })
    );
  }, PRIMITIVE);
});
