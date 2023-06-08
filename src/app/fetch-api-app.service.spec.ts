import { TestBed } from '@angular/core/testing';

import { FetchApiAppService } from './fetch-api-app.service';

describe('FetchApiAppService', () => {
  let service: FetchApiAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
