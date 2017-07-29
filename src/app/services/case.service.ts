import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Case } from '../store/models/case.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CaseService {
  private options: RequestOptions;

  constructor(private http: Http) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  public loadCases(): Observable<Array<Case>> {
    return this.http.get(`${url}/api/cases`)
      .map(res => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addCase(singleCase: Case): Observable<Case> {
    return this.http.post(`${url}/api/cases`, singleCase, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editCase(singleCase: Case): Observable<Case> {
    return this.http.put(`${url}/api/cases/${singleCase._id}`, singleCase, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public deleteCase(singleCase: Case): Observable<Case> {
    return this.http.delete(`${url}/api/cases/${singleCase._id}`, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}
