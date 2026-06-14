import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerAddressListDto } from '../../../core/models/customer.model';
import { AddressAdminService } from '../../../core/services/address-admin';

@Component({
  selector: 'app-address-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address.html',
  styleUrls: ['./address.scss']
})
export class AddressAdminComponent implements OnInit {
  addresses: CustomerAddressListDto[] = [];
  filteredAddresses: CustomerAddressListDto[] = [];
  loading = false;
  message = '';
  isError = false;

  // Filters
  searchText = '';
  filterCustomerId = '';
  filterCity = '';
  filterState = '';
  filterPincode = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  // Sorting
  sortColumn = 'addressId';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Stats
  totalAddresses = 0;
  totalCustomers = 0;

  // Unique values for dropdowns
  uniqueCities: string[] = [];
  uniqueStates: string[] = [];
  uniquePincodes: string[] = [];

  constructor(private addressAdminService: AddressAdminService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  get paginatedAddresses(): CustomerAddressListDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredAddresses.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAddresses.length / this.pageSize) || 1;
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  private showMsg(msg: string, error = false): void {
    this.message = msg;
    this.isError = error;
    setTimeout(() => this.message = '', 4000);
  }

  loadAddresses(): void {
    this.loading = true;
    this.addressAdminService.getAllAddresses().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.addresses = res.data || [];
          this.calculateStats();
          this.buildDropdowns();
          this.applyFilters();
        }
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Failed to load addresses.', true);
      }
    });
  }

  calculateStats(): void {
    this.totalAddresses = this.addresses.length;
    const uniqueIds = new Set(this.addresses.map(a => a.customerId));
    this.totalCustomers = uniqueIds.size;
  }

  buildDropdowns(): void {
    this.uniqueCities = [...new Set(this.addresses.map(a => a.city).filter(c => c))].sort();
    this.uniqueStates = [...new Set(this.addresses.map(a => a.state).filter(s => s))].sort();
    this.uniquePincodes = [...new Set(this.addresses.map(a => a.pincode).filter(p => p))].sort();
  }

  applyFilters(): void {
    let result = [...this.addresses];

    // Search by address line
    if (this.searchText.trim()) {
      const search = this.searchText.trim().toLowerCase();
      result = result.filter(a => 
        a.addressLine1?.toLowerCase().includes(search) ||
        a.addressLine2?.toLowerCase().includes(search)
      );
    }

    // Customer ID filter
    if (this.filterCustomerId.trim()) {
      const cid = this.filterCustomerId.trim();
      result = result.filter(a => a.customerId.toString().includes(cid));
    }

    // City filter
    if (this.filterCity) {
      result = result.filter(a => a.city === this.filterCity);
    }

    // State filter
    if (this.filterState) {
      result = result.filter(a => a.state === this.filterState);
    }

    // Pincode filter
    if (this.filterPincode) {
      result = result.filter(a => a.pincode === this.filterPincode);
    }

    this.filteredAddresses = result;
    this.totalItems = result.length;
    this.currentPage = 1;
    this.sortData();
  }

  resetFilters(): void {
    this.searchText = '';
    this.filterCustomerId = '';
    this.filterCity = '';
    this.filterState = '';
    this.filterPincode = '';
    this.applyFilters();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  sortData(): void {
    this.filteredAddresses.sort((a, b) => {
      let valA = (a as any)[this.sortColumn] || '';
      let valB = (b as any)[this.sortColumn] || '';
      
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  viewAddress(address: CustomerAddressListDto): void {
    alert(
      `Address ID: ${address.addressId}\n` +
      `Customer ID: ${address.customerId}\n` +
      `Address Line 1: ${address.addressLine1}\n` +
      `Address Line 2: ${address.addressLine2 || 'N/A'}\n` +
      `City: ${address.city}\n` +
      `State: ${address.state}\n` +
      `Pincode: ${address.pincode}`
    );
  }
}