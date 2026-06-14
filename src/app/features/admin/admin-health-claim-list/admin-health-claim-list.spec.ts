import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthClaimList } from './admin-health-claim-list';

describe('AdminHealthClaimList', () => {
  let component: AdminHealthClaimList;
  let fixture: ComponentFixture<AdminHealthClaimList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHealthClaimList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHealthClaimList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
