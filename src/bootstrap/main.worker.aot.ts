import '../polyfills/polyfills';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformWorkerApp } from '@angular/platform-webworker';

import { AppBrowserModuleNgFactory } from '../../ngfactory/src/app/modules/app.browser.module.ngfactory';

enableProdMode();
platformWorkerApp().bootstrapModuleFactory(AppBrowserModuleNgFactory);
