import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Case } from '../store/models/case.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CaseService {

  constructor(private httpClient: HttpClient) {}

  public loadCases(): Observable<Array<Case>> {
    return this.httpClient.get(`${url}/api/cases`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addCase(singleCase: Case): Observable<Case> {
    return this.httpClient.post(`${url}/api/cases`, singleCase)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editCase(singleCase: Case): Observable<Case> {
    return this.httpClient.put(`${url}/api/cases/${singleCase._id}`, singleCase)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public deleteCase(singleCase: Case): Observable<Case> {
    return this.httpClient.delete(`${url}/api/cases/${singleCase._id}`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}
