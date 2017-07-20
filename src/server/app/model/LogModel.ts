import ILogModel = require('./interfaces/ILogModel');

class LogModel {
  private logModel: ILogModel;

  constructor(logModel: ILogModel) {
    this.logModel = logModel;
  }
}

Object.seal(LogModel);
export =  LogModel;
