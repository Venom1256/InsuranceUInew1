import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLifeClaimDetails } from './admin-life-claim-details';

describe('AdminLifeClaimDetails', () => {
  let component: AdminLifeClaimDetails;
  let fixture: ComponentFixture<AdminLifeClaimDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLifeClaimDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLifeClaimDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
