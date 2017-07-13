import ISettingsModel = require('./interfaces/ISettingsModel');

class SettingsModel {
  private settingsModel: ISettingsModel;

  constructor(settingsModel: ISettingsModel) {
    this.settingsModel = settingsModel;
  }
}

Object.seal(SettingsModel);
export =  SettingsModel;
