import { TestBed } from '@angular/core/testing';

import { CustomerAdmin } from './customer-admin';

describe('CustomerAdmin', () => {
  let service: CustomerAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
