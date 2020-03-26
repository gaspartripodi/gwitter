import { TestBed } from '@angular/core/testing';

import { ApitwitterService } from './apitwitter.service';

describe('ApitwitterService', () => {
  let service: ApitwitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApitwitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
