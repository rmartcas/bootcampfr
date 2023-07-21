import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FileDownloadService } from './file-download.service';

describe('FileDownloadService', () => {
  let service: FileDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should downloadFile to disk', () => {
    const spyObj = jasmine.createSpyObj('a', ['click', 'dispatchEvent', 'remove']);
    spyOn(document, 'createElement').and.returnValue(spyObj);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Disposition', 'attachment; filename=export.xlsx');
    const body = new Blob(['Lorem ipsum'], {type : 'application/json'});
    const response = new HttpResponse({ body, headers, status: 200});

    service.downloadFile(response);

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(spyObj.download).toBe('export.xlsx');
  });
});
