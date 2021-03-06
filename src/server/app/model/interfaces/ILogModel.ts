import mongoose = require('mongoose');

interface ILogModel extends mongoose.Document {
  who: string;
  what?: string;
  where: string;
  when: number;
  why: string;
  how: string;
  with: string;
  result?: string;
  case: string;
}

export = ILogModel;
