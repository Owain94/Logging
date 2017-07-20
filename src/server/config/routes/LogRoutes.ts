import express = require('express');
import LogController = require('../../controllers/LogController');

const router = express.Router();

class LogRoutes {
  private logController: LogController;

  constructor () {
    this.logController = new LogController();
  }

  get routes () {
    const logController = this.logController;

    router.get('/', logController.retrieve);
    router.post('/', logController.create);
    router.put('/:_id', logController.update);
    router.delete('/:_id', logController.delete);

    return router;
  }
}

Object.seal(LogRoutes);
export = LogRoutes;
