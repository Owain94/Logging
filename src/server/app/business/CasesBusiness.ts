import CasesRepository = require('../repository/CasesRepository');
import ICasesBusiness = require('./interfaces/ICasesBusiness');
import ICasesModel = require('../model/interfaces/ICasesModel');

class CasesBusiness implements ICasesBusiness {
  private casesRepository: CasesRepository;

  constructor () {
    this.casesRepository = new CasesRepository();
  }

  create(item: ICasesModel, callback: (error: any, result: any) => void) {
    this.casesRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this.casesRepository.retrieve(callback);
  }

  update(_id: string, item: ICasesModel, callback: (error: any, result: any) => void) {
    this.casesRepository.findById(_id, (err: any, res: any) => {
      if (err) {
        callback(err, res);
      } else {
        this.casesRepository.update(res._id, item, callback);
      }
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this.casesRepository.delete(_id , callback);
  }

  findById(_id: string, callback: (error: any, result: ICasesModel) => void) {
    this.casesRepository.findById(_id, callback);
  }
}

Object.seal(CasesBusiness);
export = CasesBusiness;
