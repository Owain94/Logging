import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { url } from '../../helpers/constants';

import { SettingsService } from './settings.service';

import { Settings } from '../store/models/settings.model';

describe('The settings service', () => {
  let settingsService: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SettingsService
      ]
    });

    settingsService = TestBed.get(SettingsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should instantiate',
    inject([SettingsService], (service: SettingsService) => {
      expect(service instanceof SettingsService).toBeTruthy();
    })
  );

  describe('loadSettings()', () => {
    it('should return an Observable<Settings>', (done: any) => {
      const mockResponse = [
        {
          '_id': '1',
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test'
        }
      ];

      settingsService.loadSettings().subscribe((settings) => {
        expect(settings[0]._id).toEqual('1');
        expect(settings[0].name).toEqual('test');
        expect(settings[0].case).toEqual('test');
        expect(settings[0].invpre).toEqual('test');
        expect(settings[0].location).toEqual('test');
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings`);
      settingsRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      settingsService.loadSettings().subscribe((settings) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings`);
      settingsRequest.error(new ErrorEvent('error'));
    });
  });

  describe('addSettings()', () => {
    it('should return an Observable<Settings>', (done: any) => {
      const payload: Settings = {
        'name': 'test',
        'case': 'test',
        'invpre': 'test',
        'location': 'test'
      };

      const mockResponse = {
        '_id': '1',
        'error': 'false'
      };

      settingsService.addSettings(payload).subscribe((settings) => {
        expect(settings._id).toEqual('1');
        expect(JSON.parse(settings.error)).toBeFalsy();
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings`);
      settingsRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Settings = {
        'name': 'test',
        'case': 'test',
        'invpre': 'test',
        'location': 'test',
      };

      settingsService.addSettings(payload).subscribe((settings) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings`);
      settingsRequest.error(new ErrorEvent('error'));
    });
  });

  describe('editSettings()', () => {
    it('should return an Observable<Settings>', (done: any) => {
      const payload: Settings = {
        '_id': '1',
        'name': 'test',
        'case': 'test',
        'invpre': 'test',
        'location': 'test'
      };

      const mockResponse = {
        '_id': '1',
        'error': 'false'
      };

      settingsService.editSettings(payload).subscribe((settings) => {
        expect(settings._id).toEqual('1');
        expect(JSON.parse(settings.error)).toBeFalsy();
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings/1`);
      settingsRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Settings = {
        '_id': '1',
        'name': 'test',
        'case': 'test',
        'invpre': 'test',
        'location': 'test'
      };

      settingsService.editSettings(payload).subscribe((settings) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const settingsRequest = httpMock.expectOne(`${url}/api/settings/1`);
      settingsRequest.error(new ErrorEvent('error'));
    });
  });
});
