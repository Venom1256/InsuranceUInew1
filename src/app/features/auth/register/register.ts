import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomerRegisterDto } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-self-register',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class SelfRegisterComponent {

  model: CustomerRegisterDto = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: ''
  };

  confirmPassword = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  selfRegister(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.model.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.model.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.isLoading = true;

    this.customerService.selfRegister(this.model).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = `Registration successful! Your Customer Code: ${res.data?.customerCode}. Please login.`;
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = res.message || 'Registration failed';
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
    this.confirmPassword = '';
  }
}

