import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthClaim } from './health-claim';

describe('HealthClaim', () => {
  let component: HealthClaim;
  let fixture: ComponentFixture<HealthClaim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthClaim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthClaim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
