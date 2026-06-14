import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeClaim } from './life-claim';

describe('LifeClaim', () => {
  let component: LifeClaim;
  let fixture: ComponentFixture<LifeClaim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeClaim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeClaim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
