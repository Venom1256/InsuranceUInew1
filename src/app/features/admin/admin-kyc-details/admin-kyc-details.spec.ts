import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycDetails } from './admin-kyc-details';

describe('AdminKycDetails', () => {
  let component: AdminKycDetails;
  let fixture: ComponentFixture<AdminKycDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKycDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKycDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
