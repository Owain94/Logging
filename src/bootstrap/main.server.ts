import '../polyfills/polyfills.server';

import * as express from 'express';

import { enableProdMode } from '@angular/core';
import { AppServerModule } from '../app/modules/app.server.module';
import { ngExpressEngine } from '../app/modules/ng-express-engine/express-engine';

import { Request, Response } from 'express';
import { ROUTES } from '../helpers/routes';
import { Routes } from '../server/config/routes/Routes';

const http = require('http');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

const app = express();

app.set('port', 8000);

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', 'dist');

app.get('/', (req: Request, res: Response) => {
  res.render('index', {req});
});

app.use(compression());
app.use('/', expressStaticGzip('dist', {
    indexFromEmptyFile: false,
    enableBrotli: true
  }
));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

ROUTES.forEach((route: string) => {
  app.get(route, (req: Request, res: Response) => {
    res.render('index', {
      req: req,
      res: res
    });
  });
});

app.use('/api', new Routes().routes);

const server = http.createServer(app);

server.listen(app.get('port'), function(){
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at: ${host}:${port}`);
});
