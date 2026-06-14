import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerRegisterDto } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-agent-create-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss']
})
export class AgentCreateCustomerComponent {

  model: CustomerRegisterDto = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  createCustomer(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.customerService.createCustomerByAgent(this.model).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = `Customer created! Code: ${res.data?.customerCode}, Email: ${res.data?.email}`;
          this.resetForm();
        } else {
          this.errorMessage = res.message || 'Failed to create customer';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Email already registered or server error';
      }
    });
  }

  resetForm(): void {
    this.model = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      mobileNumber: ''
    };
  }
}

