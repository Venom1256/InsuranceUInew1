import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimSettlement } from './admin-claim-settlement';

describe('AdminClaimSettlement', () => {
  let component: AdminClaimSettlement;
  let fixture: ComponentFixture<AdminClaimSettlement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClaimSettlement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClaimSettlement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
