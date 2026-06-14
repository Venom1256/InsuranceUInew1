import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerListDto } from '../../../core/models/customer.model';
import { CustomerAdminService } from '../../../core/services/customer-admin';

@Component({
  selector: 'app-customer-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.scss']
})
export class CustomerAdminComponent implements OnInit {
  customers: CustomerListDto[] = [];
  filteredCustomers: CustomerListDto[] = [];
  loading = false;
  message = '';
  isError = false;

  // Filters
  searchText = '';
  statusFilter = 'all'; // all, active, inactive

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPagesFromApi = 0;

  // Sorting
  sortColumn = 'customerId';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Stats
  totalCustomers = 0;
  activeCustomers = 0;
  inactiveCustomers = 0;

  constructor(private customerAdminService: CustomerAdminService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  get paginatedCustomers(): CustomerListDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCustomers.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.pageSize) || 1;
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

  loadCustomers(): void {
    this.loading = true;
    this.customerAdminService.getAllCustomers(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.customers = res.data.items || [];
          this.totalItems = res.data.totalCount;
          this.totalPagesFromApi = Math.ceil(res.data.totalCount / this.pageSize);
          this.calculateStats();
          this.applyFilters();
        }
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Failed to load customers.', true);
      }
    });
  }

  calculateStats(): void {
    this.totalCustomers = this.customers.length;
    this.activeCustomers = this.customers.filter(c => c.isActive).length;
    this.inactiveCustomers = this.customers.filter(c => !c.isActive).length;
  }

  applyFilters(): void {
    let result = [...this.customers];

    // Search by name, email, code
    if (this.searchText.trim()) {
      const search = this.searchText.trim().toLowerCase();
      result = result.filter(c => 
        c.firstName?.toLowerCase().includes(search) ||
        c.lastName?.toLowerCase().includes(search) ||
        c.email?.toLowerCase().includes(search) ||
        c.customerCode?.toLowerCase().includes(search) ||
        c.mobileNumber?.includes(search)
      );
    }

    // Status filter
    if (this.statusFilter === 'active') {
      result = result.filter(c => c.isActive);
    } else if (this.statusFilter === 'inactive') {
      result = result.filter(c => !c.isActive);
    }

    this.filteredCustomers = result;
    this.currentPage = 1;
    this.sortData();
  }

  resetFilters(): void {
    this.searchText = '';
    this.statusFilter = 'all';
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
    this.filteredCustomers.sort((a, b) => {
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
      // If we need more data from API for large datasets
      if (page > this.totalPagesFromApi && this.filteredCustomers.length === this.customers.length) {
        this.loadCustomers();
      }
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadCustomers();
  }

  onSoftDelete(customerId: number): void {
    if (!confirm('Are you sure you want to delete this customer? This will deactivate the account.')) return;

    this.loading = true;
    this.customerAdminService.softDeleteCustomer(customerId).subscribe({
      next: (res) => {
        this.loading = false;
        this.showMsg(res.message);
        // Update local data
        const customer = this.customers.find(c => c.customerId === customerId);
        if (customer) {
          customer.isActive = false;
          this.calculateStats();
          this.applyFilters();
        }
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Delete failed.', true);
      }
    });
  }

  viewCustomer(customer: CustomerListDto): void {
    alert(
      `Customer Code: ${customer.customerCode}\n` +
      `Name: ${customer.firstName} ${customer.lastName}\n` +
      `Email: ${customer.email}\n` +
      `Mobile: ${customer.mobileNumber}\n` +
      `KYC Status: ${customer.kycStatus}\n` +
      `Status: ${customer.isActive ? 'Active' : 'Inactive'}\n` +
      `PAN: ${customer.panNumber || 'N/A'}\n` +
      `Aadhaar: ${customer.aadhaarNumber || 'N/A'}`
    );
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive ? 'badge-active' : 'badge-inactive';
  }

  getKycBadgeClass(kycStatus: string): string {
    switch (kycStatus?.toLowerCase()) {
      case 'approved': return 'kyc-approved';
      case 'pending': return 'kyc-pending';
      case 'rejected': return 'kyc-rejected';
      default: return 'kyc-pending';
    }
  }
}