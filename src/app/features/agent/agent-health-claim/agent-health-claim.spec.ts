import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentHealthClaim } from './agent-health-claim';

describe('AgentHealthClaim', () => {
  let component: AgentHealthClaim;
  let fixture: ComponentFixture<AgentHealthClaim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentHealthClaim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentHealthClaim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
