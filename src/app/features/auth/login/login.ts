import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { TokenService } from '../../../core/services/token.service';

import { LoginDto } from '../../../core/models/login.model';
import { ApiResponse, LoginResponseDto } from '../../../core/models/login-response.model';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  model: LoginDto = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.model).subscribe({
      next: (res: ApiResponse<LoginResponseDto>) => {
        this.isLoading = false;

        if (res.success && res.data) {
          this.tokenService.saveToken(res.data.token);
          this.tokenService.saveRole(res.data.role);
          this.tokenService.saveEmail(res.data.email);

          this.navigateByRole(res.data.role);
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Invalid email or password';
      }
    });
  }

  private navigateByRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'Agent':
        this.router.navigate(['/agent/dashboard']);
        break;

      case 'Customer':
        this.router.navigate(['/customer/dashboard']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}