import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentHealthClaimUpload } from './agent-health-claim-upload';

describe('AgentHealthClaimUpload', () => {
  let component: AgentHealthClaimUpload;
  let fixture: ComponentFixture<AgentHealthClaimUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentHealthClaimUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentHealthClaimUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
