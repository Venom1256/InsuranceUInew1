import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimApproval } from './admin-claim-approval';

describe('AdminClaimApproval', () => {
  let component: AdminClaimApproval;
  let fixture: ComponentFixture<AdminClaimApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClaimApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClaimApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
