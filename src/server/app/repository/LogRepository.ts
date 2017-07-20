import RepositoryBase = require('./BaseRepository');

import ILogModel = require('../model/interfaces/ILogModel');
import LogSchema = require('../dataAccess/schemas/LogSchema');

class LogRepository extends RepositoryBase<ILogModel> {
  constructor () {
    super(LogSchema);
  }
}

Object.seal(LogRepository);
export = LogRepository;
