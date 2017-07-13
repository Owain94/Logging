import RepositoryBase = require('./BaseRepository');

import ISettingsModel = require('../model/interfaces/ISettingsModel');
import SettingsSchema = require('../dataAccess/schemas/SettingsSchema');

class SettingsRepository extends RepositoryBase<ISettingsModel> {
  constructor () {
    super(SettingsSchema);
  }
}

Object.seal(SettingsRepository);
export = SettingsRepository;
