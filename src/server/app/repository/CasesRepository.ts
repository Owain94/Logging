import RepositoryBase = require('./BaseRepository');

import ICasesModel = require('../model/interfaces/ICasesModel');
import CasesSchema = require('../dataAccess/schemas/CasesSchema');

class CasesRepository extends RepositoryBase<ICasesModel> {
  constructor () {
    super(CasesSchema);
  }
}

Object.seal(CasesRepository);
export = CasesRepository;
