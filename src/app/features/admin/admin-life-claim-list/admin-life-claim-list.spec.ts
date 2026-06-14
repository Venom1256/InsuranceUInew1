import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLifeClaimList } from './admin-life-claim-list';

describe('AdminLifeClaimList', () => {
  let component: AdminLifeClaimList;
  let fixture: ComponentFixture<AdminLifeClaimList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLifeClaimList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLifeClaimList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
