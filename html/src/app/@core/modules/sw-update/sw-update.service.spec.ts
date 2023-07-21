import { TestBed } from '@angular/core/testing';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SwUpdateService } from './sw-update.service';
import { EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('SwUpdateService', () => {
  let service: SwUpdateService;
  let consoleSpy;
  const emitter: EventEmitter<any> = new EventEmitter<any>();

  const swUpdateMock = {
    versionUpdates: emitter.asObservable()
  };


  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: SwUpdate, useValue: swUpdateMock}
      ]
    });
    service = TestBed.inject(SwUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show popup on new version detected', () => {
    const version: VersionReadyEvent = {
      type: 'VERSION_READY',
      currentVersion: {
        hash: '123',
        appData: undefined
      },
      latestVersion: {
        hash: '456',
        appData: undefined
      }
    };

    emitter.emit(version);
    expect(consoleSpy).toHaveBeenCalledWith('Current app version: 123');
    expect(consoleSpy).toHaveBeenCalledWith('New app version ready for use: 456');
  });
});
