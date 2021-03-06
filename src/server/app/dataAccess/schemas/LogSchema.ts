import DataAccess = require('../DataAccess');
import ILogModel = require('../../model/interfaces/ILogModel');

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class LogSchema {
  static get schema() {
    return mongoose.Schema({
      who: {
        type: String,
        required: true
      },
      what: {
        type: String,
        required: false
      },
      where: {
        type: String,
        required: true
      },
      when: {
        type: Number,
        required: true
      },
      why: {
        type: String,
        required: true
      },
      how: {
        type: String,
        required: true
      },
      with: {
        type: String,
        required: true
      },
      result: {
        type: String,
        required: false
      },
      case: {
        type: String,
        required: true
      }
    });
  }
}
const schema = mongooseConnection.model<ILogModel>('Log', LogSchema.schema);
export = schema;
