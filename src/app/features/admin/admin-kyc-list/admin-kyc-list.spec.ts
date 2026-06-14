import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycList } from './admin-kyc-list';

describe('AdminKycList', () => {
  let component: AdminKycList;
  let fixture: ComponentFixture<AdminKycList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKycList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKycList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
