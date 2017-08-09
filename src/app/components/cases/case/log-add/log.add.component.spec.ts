import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Settings } from '../../../../store/models/settings.model';
import { Log } from '../../../../store/models/log.model';

import { settingsReducer } from '../../../../store/reducers/settings.reducer';
import { SettingsEffects } from '../../../../store/effects/settings.effects';

import { LogAddComponent } from './log.add.component';

import { LocaleDatePipe } from '../../../../pipes/locale.date.pipe';

import { SettingsService } from '../../../../services/settings.service';

import { Observable } from 'rxjs/Observable';

class MockSettingsService {
  public loadSettings(): Observable<Array<Settings>> {
    return Observable.of(
      [
        {
          '_id': '1',
          'name': 'test',
          'case': '1',
          'invpre': 'test',
          'location': 'test',
        }
      ]
    );
  }
}

describe('LogAddComponent', () => {
  let logAddComponent: LogAddComponent;
  let logAddFixture: ComponentFixture<LogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(
          {
            settings: settingsReducer
          }
        ),
        // StoreRouterConnectingModule,
        EffectsModule.forRoot([
          SettingsEffects
        ]),
      ],
      declarations: [
        LogAddComponent,
        LocaleDatePipe
      ],
      providers: [
        { provide: SettingsService, useClass: MockSettingsService }
      ]
    });
  }));

  beforeEach(() => {
    logAddFixture = TestBed.createComponent(LogAddComponent);
    logAddComponent = logAddFixture.componentInstance;
  });

  it('should create the log add component', () => {
    expect(logAddFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('ngOnInit should init the form', () => {
    logAddComponent.ngOnInit();

    expect(logAddComponent.addLogForm.get('what').value).toBeNull();
    expect(logAddComponent.addLogForm.get('why').value).toBeNull();
    expect(logAddComponent.addLogForm.get('how').value).toBeNull();
    expect(logAddComponent.addLogForm.get('with').value).toBeNull();
    expect(logAddComponent.addLogForm.get('result').value).toBeNull();
  });

  it('component should emit on submit form', (done: any) => {
    logAddComponent.addLog.subscribe((res: Log) => {
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('[ test ] test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.result).toEqual('test');
      expect(res.who).toEqual('test');
      expect(res.where).toEqual('test');
      done();
    });

    logAddComponent.submitForm(
      {
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'result': 'test',

        'who': '',
        'where': '',
        'when': 1,
        'case': ''
      }
    );
  });

  it('component should emit on submit form (without result)', (done: any) => {
    logAddComponent.addLog.subscribe((res: Log) => {
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('[ test ] test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.who).toEqual('test');
      expect(res.where).toEqual('test');
      expect(res.result).toBeUndefined();
      done();
    });

    logAddComponent.submitForm(
      {
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',

        'who': '',
        'where': '',
        'when': 1,
        'case': ''
      }
    );
  });
});
