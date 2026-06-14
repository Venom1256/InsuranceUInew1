import { TestBed } from '@angular/core/testing';

import { Adminnominee } from './adminnominee';

describe('Adminnominee', () => {
  let service: Adminnominee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminnominee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
