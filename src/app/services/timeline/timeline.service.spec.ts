import { TestBed } from '@angular/core/testing';

import { TimelineService } from './timline.service';

describe('TimlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimelineService = TestBed.get(TimelineService);
    expect(service).toBeTruthy();
  });
});
