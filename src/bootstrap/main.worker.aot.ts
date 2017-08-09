import '../polyfills/polyfills';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

import { AppBrowserModuleNgFactory } from './ngfactory/app/modules/app.browser.module.ngfactory';

enableProdMode();
platformWorkerAppDynamic().bootstrapModuleFactory(AppBrowserModuleNgFactory);
