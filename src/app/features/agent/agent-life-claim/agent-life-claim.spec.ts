import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLifeClaim } from './agent-life-claim';

describe('AgentLifeClaim', () => {
  let component: AgentLifeClaim;
  let fixture: ComponentFixture<AgentLifeClaim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLifeClaim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLifeClaim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
