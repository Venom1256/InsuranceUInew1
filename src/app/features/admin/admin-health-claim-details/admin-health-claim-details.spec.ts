import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthClaimDetails } from './admin-health-claim-details';

describe('AdminHealthClaimDetails', () => {
  let component: AdminHealthClaimDetails;
  let fixture: ComponentFixture<AdminHealthClaimDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHealthClaimDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHealthClaimDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
