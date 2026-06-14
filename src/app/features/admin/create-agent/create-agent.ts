import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgentRegisterDto } from '../../../core/models/agent.model';
import { AgentService } from '../../../core/services/agent';

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-agent.html',
  styleUrls: ['./create-agent.scss']
})
export class CreateAgentComponent {

  model: AgentRegisterDto = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private agentService: AgentService,
    private router: Router
  ) { }

  createAgent(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.agentService.createAgent(this.model).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = `Agent created! Code: ${res.data?.agentCode}`;
          this.resetForm();
        } else {
          this.errorMessage = res.message || 'Failed to create agent';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Server error';
      }
    });
  }

  resetForm(): void {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
    };
  }
}