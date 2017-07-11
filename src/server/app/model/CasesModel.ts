import ICasesModel = require('./interfaces/ICasesModel');

class CasesModel {
  private casesModel: ICasesModel;

  constructor(casesModel: ICasesModel) {
    this.casesModel = casesModel;
  }
}

Object.seal(CasesModel);
export =  CasesModel;
