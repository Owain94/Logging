import '../polyfills/polyfills';

import { enableProdMode } from '@angular/core';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

import { AppBrowserModuleNgFactory } from '../../ngfactory/src/app/modules/app.browser.module.ngfactory';

enableProdMode();
platformWorkerAppDynamic().bootstrapModuleFactory(AppBrowserModuleNgFactory);
