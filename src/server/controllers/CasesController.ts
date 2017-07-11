import { Request, Response } from 'express';

import IBaseController = require('./BaseController');
import CasesBusiness = require('../app/business/CasesBusiness');
import ICasesModel = require('../app/model/interfaces/ICasesModel');

class CasesController implements IBaseController<CasesBusiness> {
  create(req: Request, res: Response): void {
    try {
      const cases: ICasesModel = <ICasesModel>req.body;
      const casesBusiness = new CasesBusiness();
      casesBusiness.create(cases, (error, result) => {
        console.log(error);
        console.log(result);
        if (error) {
          res.send({'error': 'true'});
        } else {
          res.send({
            'error': 'false',
            '_id': result._id,
            'name': result.name,
            'description': result.description
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
      const cases: ICasesModel = <ICasesModel>req.body;
      const _id: string = req.params._id;
      const casesBusiness = new CasesBusiness();
      casesBusiness.update(_id, cases, (error, result) => {
        res.send({'error': error ? 'true' : 'false'});
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'error in your request'});
    }
  }

  delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params._id;
      const casesBusiness = new CasesBusiness();
      casesBusiness.delete(_id, (error, result) => {
        res.send({'error': error ? 'true' : 'false'});
      });
    } catch (e) {
      console.log(e);
      res.send({'error': 'true'});
    }
  }

  retrieve(req: Request, res: Response): void {
    try {
      const casesBusiness = new CasesBusiness();
      casesBusiness.retrieve((error, result) => {
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
      const casesBusiness = new CasesBusiness();
      casesBusiness.findById(_id, (error, result) => {
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

export = CasesController;
