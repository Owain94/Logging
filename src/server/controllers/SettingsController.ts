import { Request, Response } from 'express';

import IBaseController = require('./BaseController');
import SettingsBusiness = require('../app/business/SettingsBusiness');
import ISettingsModel = require('../app/model/interfaces/ISettingsModel');

class SettingsController implements IBaseController<SettingsBusiness> {
  create(req: Request, res: Response): void {
    try {
      const settings: ISettingsModel = <ISettingsModel>req.body;
      const settingsBusiness = new SettingsBusiness();
      settingsBusiness.create(settings, (error, result) => {
        if (error) {
          console.log(error);
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            '_id': result._id,
            'name': req.body.name,
            'case': req.body.case,
            'invpre': req.body.invpre,
            'location': req.body.location
          });
        }
      });
    } catch (e)  {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  update(req: Request, res: Response): void {
    try {
      const settings: ISettingsModel = <ISettingsModel>req.body;
      const _id: string = req.params._id;
      const settingsBusiness = new SettingsBusiness();

      settingsBusiness.update(_id, settings, (error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            'name': req.body.name,
            'case': req.body.case,
            'invpre': req.body.invpre,
            'location': req.body.location
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'error in your request'});
    }
  }

  delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params._id;
      const settingsBusiness = new SettingsBusiness();
      settingsBusiness.delete(_id, (error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            '_id': req.params._id
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  retrieve(req: Request, res: Response): void {
    try {
      const settingsBusiness = new SettingsBusiness();
      settingsBusiness.retrieve((error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  findById(req: Request, res: Response): void {
    try {
      const _id: string = req.params._id;
      const settingsBusiness = new SettingsBusiness();
      settingsBusiness.findById(_id, (error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'true'});
    }
  }
}

export = SettingsController;
