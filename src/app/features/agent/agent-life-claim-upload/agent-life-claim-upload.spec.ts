import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLifeClaimUpload } from './agent-life-claim-upload';

describe('AgentLifeClaimUpload', () => {
  let component: AgentLifeClaimUpload;
  let fixture: ComponentFixture<AgentLifeClaimUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLifeClaimUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLifeClaimUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
