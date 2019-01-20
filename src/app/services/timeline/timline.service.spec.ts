import { TestBed } from '@angular/core/testing';

import { TimlineService } from './timline.service';

describe('TimlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimlineService = TestBed.get(TimlineService);
    expect(service).toBeTruthy();
  });
});
