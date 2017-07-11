import mongoose = require('mongoose');

interface ICasesModel extends mongoose.Document {
  name: string;
  description: string;
}

export = ICasesModel;
