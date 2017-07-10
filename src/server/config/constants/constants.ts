class Constants {
  // tslint:disable-next-line:no-inferrable-types
  static DB_CONNECTION_STRING: string = 'mongodb://localhost:27017/logging';
}

Object.seal(Constants);
export = Constants;
