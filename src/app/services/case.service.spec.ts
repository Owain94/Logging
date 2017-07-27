import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { url } from '../../helpers/constants';

import { CaseService } from './case.service';

import { Case } from '../store/models/case.model';

describe('The case service', () => {
  let caseService: CaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CaseService
      ]
    });

    caseService = TestBed.get(CaseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadCases()', () => {
    it('should return an Observable<Array<Case>>', (done: any) => {
      const mockResponse = [{
        '_id': '1',
        'name': 'test',
        'description': 'test'
      }, {
        '_id': '2',
        'name': 'test',
        'description': 'test'
      }];

      caseService.loadCases().subscribe((cases) => {
        expect(cases.length).toEqual(2);
        expect(cases[0]._id).toEqual('1');
        expect(cases[0].name).toEqual('test');
        expect(cases[0].description).toEqual('test');
        expect(cases[1]._id).toEqual('2');
        expect(cases[1].name).toEqual('test');
        expect(cases[1].description).toEqual('test');
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      caseService.loadCases().subscribe((cases) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases`);
      casesRequest.error(new ErrorEvent('error'));
    });
  });

  describe('addCase()', () => {
    it('should return an Observable<Case>', (done: any) => {
      const payload: Case = {
        'name': 'test',
        'description': 'test'
      };

      const mockResponse = {
        '_id': '1',
        'name': 'test',
        'description': 'test',
        'error': 'false'
      };

      caseService.addCase(payload).subscribe((singleCase) => {
        expect(singleCase._id).toEqual('1');
        expect(singleCase.name).toEqual('test');
        expect(singleCase.description).toEqual('test');
        expect(JSON.parse(singleCase.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Case = {
        'name': 'test',
        'description': 'test'
      };

      caseService.addCase(payload).subscribe((cases) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases`);
      casesRequest.error(new ErrorEvent('error'));
    });
  });

  describe('editCase()', () => {
    it('should return an Observable<Case>', (done: any) => {
      const payload: Case = {
        '_id': '1',
        'name': 'test',
        'description': 'test'
      };

      const mockResponse = {
        '_id': '1',
        'name': 'test',
        'description': 'test',
        'error': 'false'
      };

      caseService.editCase(payload).subscribe((singleCase) => {
        expect(singleCase._id).toEqual('1');
        expect(singleCase.name).toEqual('test');
        expect(singleCase.description).toEqual('test');
        expect(JSON.parse(singleCase.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases/1`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Case = {
        '_id': '1',
        'name': 'test',
        'description': 'test'
      };

      caseService.editCase(payload).subscribe((singleCase) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases/1`);
      casesRequest.error(new ErrorEvent('error'));
    });
  });

  describe('deleteCase()', () => {
    it('should return an Observable<Case>', (done: any) => {
      const payload: Case = {
        '_id': '1',
        'name': 'test',
        'description': 'test'
      };

      const mockResponse = {
        '_id': '1',
        'error': 'false'
      };

      caseService.deleteCase(payload).subscribe((singleCase) => {
        expect(singleCase._id).toEqual('1');
        expect(JSON.parse(singleCase.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases/1`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Case = {
        '_id': '1',
        'name': 'test',
        'description': 'test'
      };

      caseService.deleteCase(payload).subscribe((singleCase) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/cases/1`);
      casesRequest.error(new ErrorEvent('error'));
    });
  });
});
