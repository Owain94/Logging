import express = require('express');
import CasesController = require('../../controllers/CasesController');

const router = express.Router();

class CasesRoutes {
  private casesController: CasesController;

  constructor () {
    this.casesController = new CasesController();
  }

  get routes () {
    const casesController = this.casesController;

    router.get('/', casesController.retrieve);
    router.post('/', casesController.create);
    router.put('/:_id', casesController.update);
    router.delete('/:_id', casesController.delete);

    return router;
  }
}

Object.seal(CasesRoutes);
export = CasesRoutes;
