import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSidebar } from './agent-sidebar';

describe('AgentSidebar', () => {
  let component: AgentSidebar;
  let fixture: ComponentFixture<AgentSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
