import LogRepository = require('../repository/LogRepository');
import ILogBusiness = require('./interfaces/ILogBusiness');
import ILogModel = require('../model/interfaces/ILogModel');

class LogBusiness implements ILogBusiness {
  private logRepository: LogRepository;

  constructor () {
    this.logRepository = new LogRepository();
  }

  create(item: ILogModel, callback: (error: any, result: any) => void) {
    this.logRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this.logRepository.retrieve(callback);
  }

  update(_id: string, item: ILogModel, callback: (error: any, result: any) => void) {
    this.logRepository.findById(_id, (err: any, res: any) => {
      if (err) {
        callback(err, res);
      } else {
        this.logRepository.update(res._id, item, callback);
      }
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this.logRepository.delete(_id , callback);
  }

  findById(_id: string, callback: (error: any, result: ILogModel) => void) {
    this.logRepository.findById(_id, callback);
  }
}

Object.seal(LogBusiness);
export = LogBusiness;
