import { TestBed } from '@angular/core/testing';

import { RiskProfile } from './risk-profile';

describe('RiskProfile', () => {
  let service: RiskProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
