import express = require('express');

import CasesRoutes = require('./CasesRoutes');

const app = express();

export class Routes {
  get routes() {
    app.use('/cases', new CasesRoutes().routes);

    return app;
  }
}
