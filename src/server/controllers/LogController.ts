import { Request, Response } from 'express';

import IBaseController = require('./BaseController');
import LogBusiness = require('../app/business/LogBusiness');
import SettingsBusiness = require('../app/business/SettingsBusiness');
import ILogModel = require('../app/model/interfaces/ILogModel');

class LogController implements IBaseController<LogBusiness> {
  create(req: Request, res: Response): void {
    try {
      const log: ILogModel = <ILogModel>req.body;
      const logBusiness = new LogBusiness();
      logBusiness.create(log, (error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            '_id': result._id,
            'who': req.body.who,
            'what': req.body.what,
            'where': req.body.where,
            'when': req.body.when,
            'why': req.body.why,
            'how': req.body.how,
            'with': req.body.with,
            'result': req.body.result ? req.body.result : '',
            'case': req.body.case
          });
        }
      });
    } catch (e)  {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  createCli(req: Request, res: Response): void {
    try {
      const log: ILogModel = <ILogModel>req.body;
      const settingsBusiness = new SettingsBusiness();
      const logBusiness = new LogBusiness();

      settingsBusiness.retrieve(
        (error, result) => {
          if (error) {
            res.send({'error': 'true'});
            return;
          } else {
            log.who = result[0].name;
            log.case = result[0].case;
            log.why = `[ ${result[0].invpre} ] PLACEHOLDER`;
            log.what = 'PLACEHOLDER';
            log.where = result[0].location;
            log.how = log.how.trim();
            log.when = new Date().getTime();

            logBusiness.create(log, (errorLog, resultLog) => {
              if (errorLog) {
                res.send({'error': 'true'});
              } else {
                res.send({
                  'error': 'false',
                  '_id': resultLog._id,
                  'who': log.who,
                  'what': log.what,
                  'where': log.where,
                  'when': log.when,
                  'why': log.why,
                  'how': log.how,
                  'with': log.with,
                  'case': log.case
                });
              }
            });
          }
        }
      );
    } catch (e)  {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  update(req: Request, res: Response): void {
    try {
      const log: ILogModel = <ILogModel>req.body;
      const _id: string = req.params._id;
      const logBusiness = new LogBusiness();

      logBusiness.update(_id, log, (error, result) => {
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            '_id': req.body._id,
            'who': req.body.who,
            'what': req.body.what,
            'where': req.body.where,
            'when': req.body.when,
            'why': req.body.why,
            'how': req.body.how,
            'with': req.body.with,
            'result': req.body.result ? req.body.result : '',
            'case': req.body.case
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
      const logBusiness = new LogBusiness();
      logBusiness.delete(_id, (error, result) => {
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
      const logBusiness = new LogBusiness();
      logBusiness.retrieve((error, result) => {
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
      const logBusiness = new LogBusiness();
      logBusiness.findById(_id, (error, result) => {
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

export = LogController;
