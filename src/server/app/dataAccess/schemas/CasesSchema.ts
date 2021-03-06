import DataAccess = require('../DataAccess');
import ICasesModel = require('../../model/interfaces/ICasesModel');

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class CasesSchema {
  static get schema() {
    return mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    });
  }
}
const schema = mongooseConnection.model<ICasesModel>('Cases', CasesSchema.schema);
export = schema;
