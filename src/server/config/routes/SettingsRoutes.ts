import express = require('express');
import SettingsController = require('../../controllers/SettingsController');

const router = express.Router();

class SettingsRoutes {
  private settingsController: SettingsController;

  constructor () {
    this.settingsController = new SettingsController();
  }

  get routes () {
    const settingsController = this.settingsController;

    router.get('/', settingsController.retrieve);
    router.post('/', settingsController.create);
    router.put('/:_id', settingsController.update);
    router.delete('/:_id', settingsController.delete);

    return router;
  }
}

Object.seal(SettingsRoutes);
export = SettingsRoutes;
