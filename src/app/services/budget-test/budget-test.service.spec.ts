import { TestBed } from '@angular/core/testing';

import { BudgetTestService } from './budget-test.service';

describe('BudgetTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetTestService = TestBed.get(BudgetTestService);
    expect(service).toBeTruthy();
  });
});
