import '../polyfills/polyfills';
import 'zone.js/dist/zone';

import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

import { AppBrowserModule } from '../app/modules/app.browser.module';

platformWorkerAppDynamic().bootstrapModule(AppBrowserModule);
