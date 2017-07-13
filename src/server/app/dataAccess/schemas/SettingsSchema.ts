import DataAccess = require('../DataAccess');
import ISettingsModel = require('../../model/interfaces/ISettingsModel');

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class SettingsSchema {
  static get schema() {
    return mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      case: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      invpre: {
        type: String,
        required: true
      }
    });
  }
}
const schema = mongooseConnection.model<ISettingsModel>('Settings', SettingsSchema.schema);
export = schema;
