import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerAddressCreateDto, CustomerAddressListDto } from '../../../core/models/customer.model';
import { AddressService } from '../../../core/services/address';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './address.html',
  styleUrls: ['./address.scss']
})
export class CustomerAddressComponent implements OnInit {

  addressModel: CustomerAddressCreateDto = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  };

  existingAddress: CustomerAddressListDto | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  
  // NEW: Toggle edit mode
  isEditing = false;

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.loadMyAddress();
  }

  loadMyAddress(): void {
    this.isLoading = true;
    this.addressService.getMyAddresses().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.success && res.data && res.data.length > 0) {
          this.existingAddress = res.data[0];
          // Don't auto-fill form here anymore
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.status !== 404) {
          console.error('Failed to load address', err);
        }
      }
    });
  }

  // NEW: Start adding new address
  startAdd(): void {
    this.isEditing = true;
    this.resetForm();
    this.successMessage = '';
    this.errorMessage = '';
  }

  // NEW: Start editing existing address
  startEdit(): void {
    if (this.existingAddress) {
      this.fillForm(this.existingAddress);
      this.isEditing = true;
      this.successMessage = '';
      this.errorMessage = '';
    }
  }

  // NEW: Cancel editing
  cancelEdit(): void {
    this.isEditing = false;
    this.errorMessage = '';
    // If adding new and cancelled, reset form
    if (!this.existingAddress) {
      this.resetForm();
    }
  }

  fillForm(address: CustomerAddressListDto | null): void {
    if (!address) return;
    this.addressModel.addressLine1 = address.addressLine1 || '';
    this.addressModel.addressLine2 = address.addressLine2 || '';
    this.addressModel.city = address.city || '';
    this.addressModel.state = address.state || '';
    this.addressModel.pincode = address.pincode || '';
  }

  saveAddress(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.existingAddress) {
      // Update existing address
      this.addressService.updateMyAddress(this.addressModel).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            this.successMessage = 'Address updated successfully!';
            this.isEditing = false;          // Close form
            this.loadMyAddress();            // Refresh view
          } else {
            this.errorMessage = res.message || 'Failed to update address';
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Server error while updating address';
        }
      });
    } else {
      // Create new address
      this.addressService.createMyAddress(this.addressModel).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            this.successMessage = 'Address added successfully!';
            this.isEditing = false;          // Close form
            this.loadMyAddress();            // Refresh view
          } else {
            this.errorMessage = res.message || 'Failed to add address';
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Server error while adding address';
        }
      });
    }
  }

  deleteAddress(): void {
    if (!confirm('Are you sure you want to delete your address?')) {
      return;
    }

    this.isLoading = true;
    this.addressService.deleteMyAddress().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.success) {
          this.existingAddress = null;
          this.isEditing = false;
          this.resetForm();
          this.successMessage = 'Address deleted successfully!';
        } else {
          this.errorMessage = res.message || 'Failed to delete address';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Server error while deleting address';
      }
    });
  }

  resetForm(): void {
    this.addressModel = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: ''
    };
  }
}