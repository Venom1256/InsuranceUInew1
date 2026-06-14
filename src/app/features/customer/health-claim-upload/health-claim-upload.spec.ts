import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthClaimUpload } from './health-claim-upload';

describe('HealthClaimUpload', () => {
  let component: HealthClaimUpload;
  let fixture: ComponentFixture<HealthClaimUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthClaimUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthClaimUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
