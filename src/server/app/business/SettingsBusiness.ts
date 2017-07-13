import SettingsRepository = require('../repository/SettingsRepository');
import ISettingsBusiness = require('./interfaces/ISettingsBusiness');
import ISettingsModel = require('../model/interfaces/ISettingsModel');

class SettingsBusiness implements ISettingsBusiness {
  private settingsRepository: SettingsRepository;

  constructor () {
    this.settingsRepository = new SettingsRepository();
  }

  create(item: ISettingsModel, callback: (error: any, result: any) => void) {
    this.settingsRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this.settingsRepository.retrieve(callback);
  }

  update(_id: string, item: ISettingsModel, callback: (error: any, result: any) => void) {
    this.settingsRepository.findById(_id, (err: any, res: any) => {
      if (err) {
        callback(err, res);
      } else {
        this.settingsRepository.update(res._id, item, callback);
      }
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this.settingsRepository.delete(_id , callback);
  }

  findById(_id: string, callback: (error: any, result: ISettingsModel) => void) {
    this.settingsRepository.findById(_id, callback);
  }
}

Object.seal(SettingsBusiness);
export = SettingsBusiness;
