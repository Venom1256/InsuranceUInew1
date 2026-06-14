import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimInvestigation } from './admin-claim-investigation';

describe('AdminClaimInvestigation', () => {
  let component: AdminClaimInvestigation;
  let fixture: ComponentFixture<AdminClaimInvestigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClaimInvestigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClaimInvestigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
