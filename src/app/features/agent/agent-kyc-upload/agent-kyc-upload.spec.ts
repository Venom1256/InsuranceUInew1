import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentKycUpload } from './agent-kyc-upload';

describe('AgentKycUpload', () => {
  let component: AgentKycUpload;
  let fixture: ComponentFixture<AgentKycUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentKycUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentKycUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
