import ICasesModel = require('./interfaces/ICasesModel');

class CasesModel {
  private categoriesModel: ICasesModel;

  constructor(casesModel: ICasesModel) {
    this.categoriesModel = casesModel;
  }
}

Object.seal(CasesModel);
export =  CasesModel;
