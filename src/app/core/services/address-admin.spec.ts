import { TestBed } from '@angular/core/testing';

import { AddressAdmin } from './address-admin';

describe('AddressAdmin', () => {
  let service: AddressAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
