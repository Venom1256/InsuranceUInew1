import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRegisterDto,
  CustomerKycUpdateDto,
  CustomerProfileUpdateDto,
  CustomerProfile } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class CustomerProfileComponent implements OnInit {
  profile?: CustomerProfile;
  loading = false;
  message = '';
  isError = false;
  isEditing = false;

  registerForm: FormGroup;
  kycForm: FormGroup;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    this.kycForm = this.fb.group({
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      aadhaarNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]]
    });

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      aadhaarNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  /** Case-insensitive check for Approved */
  get isKycApproved(): boolean {
    const status = this.profile?.kycStatus?.toString().trim();
    return status?.toLowerCase() === 'approved';
  }

  get isKycPending(): boolean {
    const status = this.profile?.kycStatus?.toString().trim();
    return status?.toLowerCase() === 'pending';
  }

  get isKycComplete(): boolean {
    if (!this.profile) return false;
    return !!this.profile.panNumber &&
           !!this.profile.aadhaarNumber &&
           !!this.profile.dateOfBirth &&
           !!this.profile.gender;
  }

  private showMsg(msg: string, error = false): void {
    this.message = msg;
    this.isError = error;
    setTimeout(() => this.message = '', 4000);
  }

  loadProfile(): void {
    this.customerService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.profile = res.data;
          console.log('Profile loaded:', this.profile);
          console.log('KYC Status:', this.profile.kycStatus);
          console.log('isKycApproved:', this.isKycApproved);
          this.patchForms(res.data);
        }
      },
      error: () => {
        // Not registered yet
      }
    });
  }

  patchForms(data: CustomerProfile): void {
    const dob = data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '';

    this.kycForm.patchValue({
      dateOfBirth: dob,
      gender: data.gender || '',
      panNumber: data.panNumber || '',
      aadhaarNumber: data.aadhaarNumber || ''
    });

    this.profileForm.patchValue({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      mobileNumber: data.mobileNumber || '',
      dateOfBirth: dob,
      gender: data.gender || '',
      panNumber: data.panNumber || '',
      aadhaarNumber: data.aadhaarNumber || ''
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    const dto: CustomerRegisterDto = this.registerForm.value;

    this.customerService.selfRegister(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.showMsg(res.message);
        this.loadProfile();
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Registration failed.', true);
      }
    });
  }

  onUpdateKyc(): void {
    if (this.kycForm.invalid) return;
    this.loading = true;
    const dto: CustomerKycUpdateDto = this.kycForm.value;

    this.customerService.updateMyKyc(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.profile = res.data;
        this.showMsg(res.message);
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'KYC update failed.', true);
      }
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;
    const dto: CustomerProfileUpdateDto = this.profileForm.value;

    this.customerService.updateMyProfile(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.profile = res.data;
        this.isEditing = false;
        this.showMsg(res.message);
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Profile update failed.', true);
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.profile) {
      this.patchForms(this.profile);
    }
  }

  // onDelete(): void {
  //   if (!confirm('Are you sure? Your account and all data will be permanently deleted.')) return;

  //   this.loading = true;
  //   this.customerService.deleteMyAccount().subscribe({
  //     next: (res) => {
  //       this.loading = false;
  //       this.profile = undefined;
  //       this.isEditing = false;
  //       this.registerForm.reset();
  //       this.showMsg(res.message);
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       this.showMsg(err.error?.message || 'Delete failed.', true);
  //     }
  //   });
  // }
}