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

  constructor(private http: HttpClient) {}

  loadCases(): Observable<Array<Case>> {
    return this.http.get(`${url}/api/cases`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  addCase(singleCase: Case): Observable<Object> {
    return this.http.post(`${url}/api/cases`, singleCase)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  editCase(singleCase: Case): Observable<Object> {
    return this.http.put(`${url}/api/cases/${singleCase._id}`, singleCase)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  deleteCase(singleCase: Case): Observable<Object> {
    return this.http.delete(`${url}/api/cases/${singleCase._id}`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}
