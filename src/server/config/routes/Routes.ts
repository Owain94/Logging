import express = require('express');

import CasesRoutes = require('./CasesRoutes');
import SettingsRoutes = require('./SettingsRoutes');
import LogRoutes = require('./LogRoutes');

const app = express();

export class Routes {
  get routes() {
    app.use('/cases', new CasesRoutes().routes);
    app.use('/settings', new SettingsRoutes().routes);
    app.use('/log', new LogRoutes().routes);

    return app;
  }
}
