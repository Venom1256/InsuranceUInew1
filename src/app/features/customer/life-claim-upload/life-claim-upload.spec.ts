import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeClaimUpload } from './life-claim-upload';

describe('LifeClaimUpload', () => {
  let component: LifeClaimUpload;
  let fixture: ComponentFixture<LifeClaimUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeClaimUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeClaimUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
