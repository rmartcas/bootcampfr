import { TestBed } from '@angular/core/testing';

import { LibroDataService } from './libro.data.service';

describe('LibroDataService', () => {
  let service: LibroDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
