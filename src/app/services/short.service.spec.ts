import { TestBed } from '@angular/core/testing';

import { ShortService } from './short.service';

describe('ClipService', () => {
  let service: ShortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
