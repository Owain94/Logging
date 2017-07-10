import mongoose = require('mongoose');

interface ICasesModel extends mongoose.Document {
  category: string;
}

export = ICasesModel;
