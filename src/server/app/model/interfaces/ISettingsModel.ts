import mongoose = require('mongoose');

interface ISettingsModel extends mongoose.Document {
  name: string;
  case: string;
  location: string;
  invpre: string;
}

export = ISettingsModel;
